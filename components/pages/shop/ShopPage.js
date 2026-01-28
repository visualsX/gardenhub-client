'use client';

import { useEffect, useState, useRef } from 'react';
import { useInfiniteShopProducts } from '@/hooks/useInfiniteShopProducts';
import ProductCard from '@/components/shared/ProductCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';
import FilterSidebar from '@/components/shared/filter-sidebar/FilterSidebar';
import ProductToolbar from '@/components/shared/filter-sidebar/ProductToolbar';
import MobileFilterModal from '@/components/shared/filter-sidebar/MobileFilterModal';
import { useShopFilters } from '@/hooks/useShopFilters';
import InputSearch from '@/components/ui/input-search';

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

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="max-layout">
        {/* Title and Search Section */}
        <section className="mb-12 flex flex-col items-center gap-y-6">
          <h1 className="text-center text-4xl font-bold text-gray-900">Shop All Products</h1>
          <div className="w-full max-w-lg">
            <InputSearch
              placeholder="Search products..."
              onSearchChange={(value) => setFilter((prev) => ({ ...prev, searchQuery: value }))}
              defaultValue={filter.searchQuery}
              allowClear
              className="custom-search h-12 w-full rounded-2xl! shadow-sm transition-shadow hover:shadow-md"
            />
          </div>
        </section>

        <div className="flex gap-12">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            filter={filter}
            onFilterChange={(newFilter) => setFilter((prev) => ({ ...prev, ...newFilter }))}
          />

          {/* Product Grid Column */}
          <div className="flex-1">
            <ProductToolbar
              activeFilters={filter}
              availableFilters={filters}
              sortBy={filter.sortBy}
              onSortChange={(value) => setFilter((prev) => ({ ...prev, sortBy: value }))}
              onRemoveFilter={(slug) => {
                setFilter((prev) => ({
                  ...prev,
                  filterSlugs: prev.filterSlugs.filter((s) => s !== slug),
                }));
              }}
              onClearAll={() => setFilter((prev) => ({ ...prev, filterSlugs: [] }))}
            />

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

      {/* Mobile Floating Filter Button */}
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 rounded-full bg-green-900 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filter and sort
        </button>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        filter={filter}
        onFilterChange={(newFilter) => setFilter((prev) => ({ ...prev, ...newFilter }))}
      />
    </div>
  );
}
