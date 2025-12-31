import { serverClient } from '../client-config/server.client';
import { MENU_QUERIES } from '../queries/menu.queries';
import { withSSRRetry } from './ssr-utils';

export const fetchMenuData = async (retries = 2) => {
  return withSSRRetry(() => serverClient.request(MENU_QUERIES.GET_MENU), {
    retries,
    label: 'fetchMenuData',
  }).then((data) => data?.shopCategories || null);
};
