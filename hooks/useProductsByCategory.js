import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/graphql-client';
import { PRODUCTS_QUERIES } from '@/lib/api/queries/products.queries';

export const useProductsByCategory = (categorySlug) => {
  return useQuery({
    queryKey: ['products-by-category', categorySlug],
    queryFn: async () => {
      if (!categorySlug) return [];
      const data = await graphqlClient.request(PRODUCTS_QUERIES.GET_PRODUCTS_BY_CATEGORY, {
        categorySlug,
      });
      console.log('data: ', data?.productsByCategory?.nodes);
      return (
        data?.productsByCategory?.nodes?.map((p) => ({
          ...p,
          price: `AED ${p.price || 0}`,
          rating: 5,
        })) || []
      );
    },
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
