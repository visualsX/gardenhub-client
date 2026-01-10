
import { LANDING_PAGE_QUERIES } from '../queries/home.queries';
import { withSSRRetry } from './ssr-utils';
import { serverClient } from '../client-config/server.client';

export const fetchFeaturedProducts = async ({ retries = 2 } = {}) => {
  return withSSRRetry(
    () => serverClient.request(LANDING_PAGE_QUERIES.GET_LANDING_PAGE_SECTIONS),
    { retries, label: 'landingpage' }
  ).then((data) => data?.landingPage?.sections || null);
};

export const fetchActiveBanners = async ({ retries = 2 } = {}) => {
  return withSSRRetry(
    () => serverClient.request(LANDING_PAGE_QUERIES.GET_ACTIVE_BANNERS),
    { retries, label: 'fetchActiveBanners' }
  ).then((data) => data?.activeBanners || []);
};
