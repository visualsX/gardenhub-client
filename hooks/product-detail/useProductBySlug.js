import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/graphql-client';
import { PRODUCTS_QUERIES } from '@/lib/api/queries/products';

export const useProductBySlug = (slug, initialData) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            if (!slug) return null;
            const data = await graphqlClient.request(PRODUCTS_QUERIES.GET_PRODUCT_BY_SLUG, {
                slug,
            });

            const product = data?.shopProductBySlug;

            if (!product) return null;

            // TODO: Remove these mock values when backend adds price/salePrice fields
            return {
                ...product,
                price: 999, // Mock price for non-variant products
                salePrice: 0, // Mock sale price
            };
        },
        initialData: initialData,
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
