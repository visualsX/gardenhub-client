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
async function fetchShopProducts({
    first = 12,
    after = null,
    where = null,
    order = null
} = {}) {
    const variables = {
        first,
        after,
        where,
        order,
    };

    const data = await graphQLClient.request(
        SHOP_QUERIES.SHOP_ALL_PRODUCTS,
        variables
    );

    return data.shopProducts || { edges: [], totalCount: 0, pageInfo: {} };
}

/**
 * Hook for infinite scroll shop products
 * @param {Object} options - Query options
 * @param {number} options.pageSize - Number of items per page
 * @param {Object} options.where - Filter conditions
 * @param {Array} options.order - Sort order
 */
export function useInfiniteShopProducts({
    pageSize = 12,
    where = null,
    order = null
} = {}) {
    return useInfiniteQuery({
        queryKey: ['shopProducts', { where, order, pageSize }],
        queryFn: async ({ pageParam }) => {
            const data = await fetchShopProducts({
                first: pageSize,
                after: pageParam,
                where,
                order,
            });
            return data;
        },
        getNextPageParam: (lastPage) => {
            // Check if there are more pages
            if (lastPage.edges && lastPage.edges.length > 0) {
                const lastEdge = lastPage.edges[lastPage.edges.length - 1];
                return lastEdge.cursor;
            }
            return undefined;
        },
        initialPageParam: null,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
