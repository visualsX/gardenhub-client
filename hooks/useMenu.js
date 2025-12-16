import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/graphql-client';
import { MENU_QUERIES } from '@/lib/api/queries';

export const useMenu = (initialData) => {
    return useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const data = await graphqlClient.request(MENU_QUERIES.GET_MENU);
            return data?.shopCategories || [];
        },
        initialData: initialData, // Use server-fetched data instantly
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};
