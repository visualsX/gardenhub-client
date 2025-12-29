import { GraphQLClient } from 'graphql-request';
import { API_URLS } from '@/lib/const/urls';
import { PRODUCTS_QUERIES } from '@/lib/api/queries/products.queries';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
});

export async function getProductBySlug(slug, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await serverClient.request(PRODUCTS_QUERIES.GET_PRODUCT_BY_SLUG, { slug });
      const product = data?.shopProductBySlug;
      if (!product) return null;

      return {
        ...product,
        price: 999,
        salePrice: 0,
      };
    } catch (error) {
      console.error(`Error fetching product (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      if (attempt === retries) return null;
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return null;
}

export async function getRelatedProducts(productId, limit = 8, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await serverClient.request(PRODUCTS_QUERIES.GET_RELATED_PRODUCTS, {
        productId,
        limit,
      });
      return data?.relatedProducts || [];
    } catch (error) {
      console.error(`Error fetching related products (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      if (attempt === retries) return null;
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return null;
}
