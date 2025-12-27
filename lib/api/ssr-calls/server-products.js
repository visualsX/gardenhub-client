import { GraphQLClient } from 'graphql-request';
import { API_URLS } from '@/lib/const/urls';
import { PRODUCTS_QUERIES } from '@/lib/api/queries/products.queries';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
    headers: {},
});

export async function getProductBySlug(slug) {
    // console.log('getProductBySlug called with slug:', slug);
    try {
        const data = await serverClient.request(PRODUCTS_QUERIES.GET_PRODUCT_BY_SLUG, {
            slug,
        });

        const product = data?.shopProductBySlug;
        // console.log("products: ", product)
        if (!product) {
            console.log('No product found for slug:', slug);
            return null;
        }

        // TODO: Remove these mock values when backend adds price/salePrice fields
        return {
            ...product,
            price: 999, // Mock price for non-variant products
            salePrice: 0, // Mock sale price
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        console.error('Error details:', error.response?.errors || error.message);
        return null;
    }
}

export async function getRelatedProducts(productId, limit = 8) {
    try {
        const data = await serverClient.request(PRODUCTS_QUERIES.GET_RELATED_PRODUCTS, {
            productId,
            limit,
        });

        // console.log("related products: ", data?.relatedProducts)

        return data?.relatedProducts || [];
    } catch (error) {
        console.error('Error fetching related products:', error);
        return [];
    }
}
