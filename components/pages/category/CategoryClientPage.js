'use client';

import { useState } from 'react';
import FilterSidebar from '@/components/shared/filter-sidebar/FilterSidebar';
import ProductCard from '@/components/shared/ProductCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';
import ProductToolbar from '@/components/shared/filter-sidebar/ProductToolbar';
import { useInfiniteShopProducts } from '@/hooks/useInfiniteShopProducts';
import { useShopFilters } from '@/hooks/useShopFilters';
import InputSearch from '@/components/ui/input-search';
import MobileFilterModal from '@/components/shared/filter-sidebar/MobileFilterModal';

export default function CategoryClientPage({
  currentSlug,
  initialFilters,
  initialProducts,
  initialTotalCount,
}) {
  // Format slug for title (e.g., "indoor-plants" -> "Indoor Plants")
  const title = currentSlug
    ? currentSlug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  const [filter, setFilter] = useState({
    categorySlug: currentSlug,
    inStockOnly: true,
    featuredOnly: false,
    onSaleOnly: false,
    minPrice: 0,
    maxPrice: 5000,
    filterSlugs: [],
    sortBy: 'newest',
    searchQuery: '',
  });

  const {
    data: productData,
    isLoading: loading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteShopProducts({
    pageSize: 12,
    filter: filter,
  });

  const products = productData?.pages.flatMap((page) => page.edges.map((edge) => edge.node)) || [];

  // Use initial products if no client data has loaded yet
  const displayProducts = productData ? products : initialProducts || [];
  const displayTotalCount = productData?.pages?.[0]?.totalCount ?? initialTotalCount;

  const { data: filters = [] } = useShopFilters(currentSlug, initialFilters);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="max-layout">
        {/* Title and Search Section */}
        <section className="mb-12 flex flex-col items-center gap-y-6">
          <h1 className="text-center text-4xl font-bold text-gray-900">{title}</h1>
          <div className="w-full max-w-lg">
            <InputSearch
              placeholder={`Search in ${title}...`}
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

            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-gray-500">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {hasNextPage && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="rounded-full border border-green-600 px-6 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50"
                    >
                      {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </button>
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
        sortBy={filter.sortBy}
        onSortChange={(value) => setFilter((prev) => ({ ...prev, sortBy: value }))}
      />
    </div>
  );
}
