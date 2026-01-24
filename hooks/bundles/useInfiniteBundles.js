'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { BUNDLES_QUERIES } from '@/lib/api/queries/bundles.queries';
import graphqlClient from '@/lib/api/client-config/graphql-client';

/**
 * Client-side function to fetch bundles
 */
async function fetchBundles({ first = 12, after = null } = {}) {
  const variables = {
    first,
    after,
  };

  const data = await graphqlClient.request(BUNDLES_QUERIES.GET_BUNDLES, variables);

  return data.shopBundles || { edges: [], totalCount: 0, pageInfo: {} };
}

/**
 * Hook for infinite scroll bundles
 * @param {Object} options - Query options
 * @param {number} options.pageSize - Number of items per page
 */
export function useInfiniteBundles({ pageSize = 12 } = {}) {
  return useInfiniteQuery({
    queryKey: ['bundles', { pageSize }],
    queryFn: async ({ pageParam }) => {
      const data = await fetchBundles({
        first: pageSize,
        after: pageParam,
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo?.hasNextPage) {
        return lastPage.pageInfo.endCursor;
      }
      return undefined;
    },
    initialPageParam: null,
    staleTime: 1000 * 60 * 5, // 5 minutes
    throwOnError: true,
  });
}
