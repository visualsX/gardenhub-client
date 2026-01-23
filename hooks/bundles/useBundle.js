'use client';

import { useQuery } from '@tanstack/react-query';
import { BUNDLES_QUERIES } from '@/lib/api/queries/bundles.queries';
import graphqlClient from '@/lib/api/client-config/graphql-client';

/**
 * Hook for fetching a single bundle by slug
 * @param {string} slug - Bundle slug
 * @param {Object} initialData - Initial data from SSR
 */
export function useBundle(slug, initialData = null) {
    return useQuery({
        queryKey: ['bundle', slug],
        queryFn: async () => {
            const data = await graphqlClient.request(BUNDLES_QUERIES.GET_BUNDLE_BY_SLUG, { slug });
            return data.shopBundleBySlug;
        },
        initialData: initialData,
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
