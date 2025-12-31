import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { SHOP_QUERIES } from '@/lib/api/queries/shop.queries';

export const useShopFilters = (categorySlug, initialData) => {
  return useQuery({
    queryKey: ['shop-filters', categorySlug],
    queryFn: async () => {
      const data = await graphqlClient.request(SHOP_QUERIES.SIDEBAR_FILTER_QUERY, { categorySlug });
      return data?.shopFilters || [];
    },
    initialData,
    staleTime: 1000 * 60 * 60, // 1 hour
    throwOnError: true,
  });
};
