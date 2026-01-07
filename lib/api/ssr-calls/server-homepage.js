
import { HOMEPAGE_QUERIES } from '../queries/homepage.queries';
import { HOMEPAGE_QUERIES as BANNER_QUERIES } from '../queries/home.queries';
import { withSSRRetry } from './ssr-utils';
import { serverClient } from '../client-config/server.client';

export const fetchFeaturedProducts = async ({
  collectionType,
  limit,
  categorySlug,
  retries = 2,
}) => {
  return withSSRRetry(
    () =>
      serverClient.request(HOMEPAGE_QUERIES.GET_FEATURED_PRODUCTS, {
        collectionType,
        limit,
        categorySlug,
      }),
    { retries, label: 'fetchFeaturedProducts' }
  ).then((data) => data?.featuredProducts || null);
};

export const fetchActiveBanners = async ({ retries = 2 } = {}) => {
  return withSSRRetry(
    () => serverClient.request(BANNER_QUERIES.GET_ACTIVE_BANNERS),
    { retries, label: 'fetchActiveBanners' }
  ).then((data) => data?.activeBanners || []);
};
