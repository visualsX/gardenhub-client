'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteShopProducts } from '@/hooks/useInfiniteShopProducts';
import ProductCard from '@/components/shared/ProductCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';

export default function ShopPage({ initialProducts }) {
    const loadMoreRef = useRef(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteShopProducts({
        pageSize: 12,
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
    const products = data?.pages.flatMap((page) =>
        page.edges.map((edge) => edge.node)
    ) || [];

    // Use initial products if no data yet
    const displayProducts = products.length > 0 ? products : initialProducts;

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-layout">
                <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
                    Shop All Products
                </h1>

                {/* Product Grid */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[...Array(12)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="mb-4 text-lg font-medium text-gray-900">
                                Failed to load products
                            </p>
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
                                No products found.
                            </p>
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
    );
}
