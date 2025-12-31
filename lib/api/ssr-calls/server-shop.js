import { SHOP_QUERIES } from '../queries/shop.queries';
import { withSSRRetry } from './ssr-utils';
import { serverClient } from '../client-config/server.client';

/**
 * Fetch filtered products with pagination support and retry logic
 * Supports both shop and category pages via unified filter object
 */
export async function getShopProducts({ first = 12, after = null, filter = {}, retries = 2 } = {}) {
  const variables = { first, after, filter };

  return withSSRRetry(() => serverClient.request(SHOP_QUERIES.FILTERED_PRODUCTS, variables), {
    retries,
    label: 'getShopProducts (filtered)',
  }).then((data) => data?.filteredProducts || null);
}

/**
 * Fetch shop filters
 */
export async function getShopFilters(categorySlug = null, retries = 2) {
  return withSSRRetry(
    () => serverClient.request(SHOP_QUERIES.SIDEBAR_FILTER_QUERY, { categorySlug }),
    { retries, label: `getShopFilters (${categorySlug || 'all'})` }
  ).then((data) => data?.shopFilters || null);
}
