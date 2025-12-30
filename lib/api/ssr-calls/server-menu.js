import { GraphQLClient } from 'graphql-request';
import { MENU_QUERIES } from '../queries/menu.queries';
import { API_URLS } from '@/lib/const/urls';
import { withSSRRetry } from './ssr-utils';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
  timeout: 10000,
});

export const fetchMenuData = async (retries = 2) => {
  return withSSRRetry(() => serverClient.request(MENU_QUERIES.GET_MENU), {
    retries,
    label: 'fetchMenuData',
  }).then((data) => data?.shopCategories || null);
};
