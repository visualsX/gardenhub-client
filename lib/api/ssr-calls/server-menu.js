import { GraphQLClient } from 'graphql-request';
import { MENU_QUERIES } from '../queries/menu.queries';
import { API_URLS } from '@/lib/const/urls';

export const fetchMenuData = async () => {
  try {
    const client = new GraphQLClient(API_URLS.GRAPHQL_BASE);
    const data = await client.request(MENU_QUERIES.GET_MENU);
    return data?.shopCategories || [];
  } catch (error) {
    console.error('Failed to fetch menu data:', error);
    return [];
  }
};
