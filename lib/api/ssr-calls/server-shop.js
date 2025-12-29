import { GraphQLClient } from 'graphql-request';
import { API_URLS } from '@/lib/const/urls';
import { SHOP_QUERIES } from '../queries/shop.queries';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
  timeout: 10000, // 10 second timeout
});

/**
 * Fetch shop products with pagination support and retry logic
 * @param {Object} params - Query parameters
 * @param {number} params.first - Number of items to fetch
 * @param {string} params.after - Cursor for pagination
 * @param {Object} params.where - Filter conditions
 * @param {Array} params.order - Sort order
 * @param {number} params.retries - Number of retry attempts
 * @returns {Promise<Object>} Products data with pagination info
 */
export async function getShopProducts({
  first = 12,
  after = null,
  where = null,
  order = null,
  retries = 2,
} = {}) {
  const variables = {
    first,
    after,
    where,
    order,
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await serverClient.request(SHOP_QUERIES.SHOP_ALL_PRODUCTS, variables);

      return data.shopProducts || { edges: [], totalCount: 0 };
    } catch (error) {
      const isLastAttempt = attempt === retries;

      console.error(
        `Error fetching shop products (attempt ${attempt + 1}/${retries + 1}):`,
        error.message
      );

      if (isLastAttempt) {
        // On final failure, return empty data instead of throwing
        console.error('All retry attempts failed, returning empty data');
        return { edges: [], totalCount: 0 };
      }

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  // Fallback (should never reach here)
  return { edges: [], totalCount: 0 };
}
