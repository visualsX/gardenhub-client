import { GraphQLClient } from 'graphql-request';
import { HOMEPAGE_QUERIES } from '../queries/homepage.queries';
import { API_URLS } from '@/lib/const/urls';

export const fetchFeaturedProducts = async ({ collectionType, limit, categorySlug }) => {
  try {
    const client = new GraphQLClient(API_URLS.GRAPHQL_BASE);
    const data = await client.request(HOMEPAGE_QUERIES.GET_FEATURED_PRODUCTS, {
      collectionType,
      limit,
      categorySlug,
    });
    return data?.featuredProducts || [];
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return [];
  }
};
