'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteBundles } from '@/hooks/bundles/useInfiniteBundles';
import BundleCard from '@/components/shared/BundleCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';
import FilterSidebar from '@/components/shared/filter-sidebar/FilterSidebar';
import ProductToolbar from '@/components/shared/filter-sidebar/ProductToolbar';

export default function BundlesPage({ initialBundles, initialTotalCount }) {
  const loadMoreRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteBundles({
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

  // Flatten all pages into single bundles array
  const bundles = data?.pages.flatMap((page) => page.edges.map((edge) => edge.node)) || [];

  // Use initial bundles if no client data has loaded yet
  const displayBundles = data ? bundles : initialBundles;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-layout">
        {/* Title and Search Section */}
        <section className="mb-12 flex flex-col items-center gap-y-6">
          <h1 className="text-center text-4xl font-bold text-gray-900">Shop All Bundles</h1>
        </section>
        <div className="flex gap-12">
          {/* Bundle Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : displayBundles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-gray-500">No bundles found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayBundles.map((bundle) => (
                    <BundleCard key={bundle.id} bundle={bundle} />
                  ))}
                </div>

                {/* Loading indicator for next page */}
                {hasNextPage && (
                  <div ref={loadMoreRef} className="mt-8 flex justify-center">
                    {isFetchingNextPage && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
                        <span>Loading more bundles...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* End of bundles message */}
                {!hasNextPage && displayBundles.length > 0 && (
                  <div className="mt-8 text-center text-gray-500">
                    You've reached the end of our bundles
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
