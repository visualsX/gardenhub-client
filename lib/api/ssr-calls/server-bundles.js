import { BUNDLES_QUERIES } from '../queries/bundles.queries';
import { withSSRRetry } from './ssr-utils';
import { serverClient } from '../client-config/server.client';

/**
 * Fetch bundles with pagination support and retry logic
 */
export async function getBundles({ first = 12, after = null, retries = 2 } = {}) {
  const variables = { first, after };

  return withSSRRetry(() => serverClient.request(BUNDLES_QUERIES.GET_BUNDLES, variables), {
    retries,
    label: 'getBundles',
  }).then((data) => data?.shopBundles || null);
}

/**
 * Fetch bundle by slug
 */
export async function getBundleBySlug(slug, retries = 2) {
  return withSSRRetry(() => serverClient.request(BUNDLES_QUERIES.GET_BUNDLE_BY_SLUG, { slug }), {
    retries,
    label: `getBundleBySlug (${slug})`,
  }).then((data) => data?.shopBundleBySlug || null);
}
