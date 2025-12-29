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
      console.error(`Error fetching shop products (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      if (attempt === retries) return null; // Return null on final failure
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return null;
}

/**
 * Fetch shop filters
 * @param {string} categorySlug - Optional category slug
 * @param {number} retries - Number of retry attempts
 * @returns {Promise<Array>} List of filters
 */
export async function getShopFilters(categorySlug = null, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await serverClient.request(SHOP_QUERIES.SIDEBAR_FILTER_QUERY, { categorySlug });
      return data?.shopFilters || [];
    } catch (error) {
      console.error(`Error fetching shop filters (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      if (attempt === retries) return null;
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return null;
}
