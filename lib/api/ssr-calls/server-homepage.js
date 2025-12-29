import { GraphQLClient } from 'graphql-request';
import { HOMEPAGE_QUERIES } from '../queries/homepage.queries';
import { API_URLS } from '@/lib/const/urls';
import { withSSRRetry } from './ssr-utils';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
  timeout: 10000,
});

export const fetchFeaturedProducts = async ({ collectionType, limit, categorySlug, retries = 2 }) => {
  return withSSRRetry(
    () => serverClient.request(HOMEPAGE_QUERIES.GET_FEATURED_PRODUCTS, {
      collectionType,
      limit,
      categorySlug,
    }),
    { retries, label: 'fetchFeaturedProducts' }
  ).then(data => data?.featuredProducts || null);
};
