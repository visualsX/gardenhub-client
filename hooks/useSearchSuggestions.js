import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/graphql-client';
import { SEARCH_QUERIES } from '@/lib/api/queries/search.query';

export const useSearchSuggestions = (query, limit = 5) => {
    return useQuery({
        queryKey: ['search-suggestions', query, limit],
        queryFn: async () => {
            if (!query || query.trim().length < 2) {
                return { products: [], collections: [] };
            }
            const data = await graphqlClient.request(SEARCH_QUERIES.GET_SEARCH_SUGGESTIONS, {
                query,
                limit,
            });
            return data?.searchSuggestions || { products: [], collections: [] };
        },
        enabled: !!query && query.trim().length >= 2,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
