'use client';

import { useState } from 'react';
import FilterSidebar from '@/components/shared/filter-sidebar/FilterSidebar';
import ProductCard from '@/components/shared/ProductCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';
import ProductToolbar from '@/components/shared/filter-sidebar/ProductToolbar';
import { useInfiniteShopProducts } from '@/hooks/useInfiniteShopProducts';
import { useShopFilters } from '@/hooks/useShopFilters';

export default function CategoryClientPage({ currentSlug, initialFilters, initialProducts, initialTotalCount }) {
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

    const { data: productData, isLoading: loading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteShopProducts({
            pageSize: 12,
            filter: filter,
        });

    const products = productData?.pages.flatMap((page) => page.edges.map((edge) => edge.node)) || [];

    // Use initial products if no client data has loaded yet
    const displayProducts = productData ? products : (initialProducts || []);
    const displayTotalCount = productData?.pages?.[0]?.totalCount ?? initialTotalCount;

    const { data: filters = [] } = useShopFilters(currentSlug, initialFilters);

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-layout">
                <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">{title}</h1>

                <ProductToolbar
                    totalCount={displayTotalCount}
                    sortBy={filter.sortBy}
                    onSortChange={(value) => setFilter(prev => ({ ...prev, sortBy: value }))}
                    onSearch={(value) => setFilter(prev => ({ ...prev, searchQuery: value }))}
                    searchPlaceholder={`Search in ${title}...`}
                />

                <div className="flex gap-12">
                    {/* Sidebar */}
                    <FilterSidebar
                        filters={filters}
                        filter={filter}
                        onFilterChange={(newFilter) => setFilter(prev => ({ ...prev, ...newFilter }))}
                    />

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {[...Array(6)].map((_, i) => (
                                    <ProductCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : isError ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <p className="mb-4 text-lg font-medium text-gray-900">Failed to load products</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : displayProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <p className="text-lg font-medium text-gray-500">
                                    No products found in this category.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
    );
}
