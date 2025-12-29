import { GraphQLClient } from 'graphql-request';
import { API_URLS } from '@/lib/const/urls';
import { SHOP_QUERIES } from '../queries/shop.queries';
import { withSSRRetry } from './ssr-utils';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
  timeout: 10000,
});

/**
 * Fetch shop products with pagination support and retry logic
 */
export async function getShopProducts({
  first = 12,
  after = null,
  where = null,
  order = null,
  retries = 2,
} = {}) {
  const variables = { first, after, where, order };

  return withSSRRetry(
    () => serverClient.request(SHOP_QUERIES.SHOP_ALL_PRODUCTS, variables),
    { retries, label: 'getShopProducts' }
  ).then(data => data?.shopProducts || null);
}

/**
 * Fetch shop filters
 */
export async function getShopFilters(categorySlug = null, retries = 2) {
  return withSSRRetry(
    () => serverClient.request(SHOP_QUERIES.SIDEBAR_FILTER_QUERY, { categorySlug }),
    { retries, label: `getShopFilters (${categorySlug || 'all'})` }
  ).then(data => data?.shopFilters || null);
}
