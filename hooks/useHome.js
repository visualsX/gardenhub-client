import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { HOMEPAGE_QUERIES } from '@/lib/api/queries/home.queries';

export const useActiveBanners = (initialData) => {
    return useQuery({
        queryKey: ['active-banners'],
        queryFn: async () => {
            const data = await graphqlClient.request(HOMEPAGE_QUERIES.GET_ACTIVE_BANNERS);
            return data?.activeBanners || [];
        },
        initialData,
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};
