'use client';

import { useEffect, useState, useRef } from 'react';
import { useInfiniteShopProducts } from '@/hooks/useInfiniteShopProducts';
import ProductCard from '@/components/shared/ProductCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';
import FilterSidebar from '@/components/shared/filter-sidebar/FilterSidebar';
import ProductToolbar from '@/components/shared/filter-sidebar/ProductToolbar';
import { useShopFilters } from '@/hooks/useShopFilters';

export default function ShopPage({ initialProducts, initialFilters, initialTotalCount }) {
  const loadMoreRef = useRef(null);
  const [filter, setFilter] = useState({
    inStockOnly: true,
    featuredOnly: false,
    onSaleOnly: false,
    minPrice: 0,
    maxPrice: 5000,
    filterSlugs: [],
    sortBy: 'newest',
    searchQuery: '',
  });

  const { data: filters = [] } = useShopFilters(null, initialFilters);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteShopProducts({
      pageSize: 12,
      filter: filter,
    });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);



  // Flatten all pages into single products array
  const products = data?.pages.flatMap((page) => page.edges.map((edge) => edge.node)) || [];

  // Use initial products if no client data has loaded yet
  const displayProducts = data ? products : initialProducts;
  const displayTotalCount = data?.pages?.[0]?.totalCount ?? initialTotalCount;
  console.log('displayProducts', displayProducts);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-layout">
        <ProductToolbar
          totalCount={displayTotalCount}
          sortBy={filter.sortBy}
          searchQuery={filter.searchQuery}
          onSortChange={(value) => setFilter((prev) => ({ ...prev, sortBy: value }))}
          onSearch={(value) => setFilter((prev) => ({ ...prev, searchQuery: value }))}
        />

        <div className="flex gap-12">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            filter={filter}
            onFilterChange={(newFilter) => setFilter((prev) => ({ ...prev, ...newFilter }))}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-gray-500">No products found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Loading indicator for next page */}
                {hasNextPage && (
                  <div ref={loadMoreRef} className="mt-8 flex justify-center">
                    {isFetchingNextPage && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
                        <span>Loading more products...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* End of products message */}
                {!hasNextPage && displayProducts.length > 0 && (
                  <div className="mt-8 text-center text-gray-500">
                    You've reached the end of our products
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
