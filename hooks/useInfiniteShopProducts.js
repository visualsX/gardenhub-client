'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { API_URLS } from '@/lib/const/urls';
import { SHOP_QUERIES } from '@/lib/api/queries/shop.queries';

const graphQLClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
});

/**
 * Client-side function to fetch shop products
 */
async function fetchShopProducts({ first = 12, after = null, filter = {} } = {}) {
  const variables = {
    first,
    after,
    filter,
  };

  const data = await graphQLClient.request(SHOP_QUERIES.FILTERED_PRODUCTS, variables);

  return data.filteredProducts || { edges: [], totalCount: 0, pageInfo: {} };
}

/**
 * Hook for infinite scroll shop products
 * @param {Object} options - Query options
 * @param {number} options.pageSize - Number of items per page
 * @param {Object} options.filter - Filter object
 */
export function useInfiniteShopProducts({ pageSize = 12, filter = {} } = {}) {
  return useInfiniteQuery({
    queryKey: ['shopProducts', { filter, pageSize }],
    queryFn: async ({ pageParam }) => {
      const data = await fetchShopProducts({
        first: pageSize,
        after: pageParam,
        filter,
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      // Check if there are more pages
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
