import { PRODUCTS_QUERIES } from '@/lib/api/queries/products.queries';
import { withSSRRetry } from './ssr-utils';
import { serverClient } from '../client-config/server.client';

export async function getProductBySlug(slug, retries = 2) {
  return withSSRRetry(() => serverClient.request(PRODUCTS_QUERIES.GET_PRODUCT_BY_SLUG, { slug }), {
    retries,
    label: `getProductBySlug (${slug})`,
  }).then((data) => {
    const product = data?.shopProductBySlug;
    if (!product) return null;

    return {
      ...product,
      price: product.regularPrice,
      salePrice: product.salePrice,
    };
  });
}

export async function getRelatedProducts(productId, limit = 8, retries = 2) {
  return withSSRRetry(
    () =>
      serverClient.request(PRODUCTS_QUERIES.GET_RELATED_PRODUCTS, {
        productId,
        limit,
      }),
    { retries, label: `getRelatedProducts (${productId})` }
  ).then((data) => data?.relatedProducts || null);
}
