'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ORDERS_QUERIES } from '@/lib/api/queries/orders.queries';
import graphqlClient from '@/lib/api/client-config/graphql-client';

/**
 * Client-side function to fetch my orders
 */
async function fetchMyOrders({ first = 10, after = null, where = null } = {}) {
    const variables = {
        first,
        after,
        where,
    };

    const data = await graphqlClient.request(ORDERS_QUERIES.GET_MY_ORDERS, variables);

    return data.myOrders || { edges: [], totalCount: 0, pageInfo: {} };
}

/**
 * Hook for infinite scroll user orders
 * @param {Object} options - Query options
 * @param {number} options.pageSize - Number of items per page
 * @param {Object} options.where - Filter object for the where clause
 */
export function useInfiniteOrders({ pageSize = 10, where = null } = {}) {
    return useInfiniteQuery({
        queryKey: ['myOrders', { pageSize, where }],
        queryFn: async ({ pageParam }) => {
            const data = await fetchMyOrders({
                first: pageSize,
                after: pageParam,
                where,
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
