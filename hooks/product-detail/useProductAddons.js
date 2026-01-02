import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { PRODUCTS_QUERIES } from '@/lib/api/queries/products.queries';

export const useProductAddons = (productId, variantId, enabled = true) => {
  return useQuery({
    queryKey: ['product-addons', productId, variantId],
    queryFn: async () => {
      if (!productId) return [];

      const data = await graphqlClient.request(PRODUCTS_QUERIES.GET_PRODUCT_ADDONS, {
        productId,
        variantId: variantId || null,
      });

      return data?.productAddonsForDisplay || [];
    },
    enabled: !!productId && enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
