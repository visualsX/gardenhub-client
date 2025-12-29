import { HOMEPAGE_QUERIES } from '../queries/homepage.queries';
import { API_URLS } from '@/lib/const/urls';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
  timeout: 10000,
});

export const fetchFeaturedProducts = async ({ collectionType, limit, categorySlug, retries = 2 }) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await serverClient.request(HOMEPAGE_QUERIES.GET_FEATURED_PRODUCTS, {
        collectionType,
        limit,
        categorySlug,
      });
      return data?.featuredProducts || [];
    } catch (error) {
      console.error(`Error fetching featured products (attempt ${attempt + 1}/${retries + 1}):`, error.message);

      if (attempt === retries) {
        return null; // Return null so client can pick up
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return null;
};
