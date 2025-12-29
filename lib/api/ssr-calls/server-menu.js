import { GraphQLClient } from 'graphql-request';
import { MENU_QUERIES } from '../queries/menu.queries';
import { API_URLS } from '@/lib/const/urls';

const serverClient = new GraphQLClient(API_URLS.GRAPHQL_BASE, {
  headers: {},
  timeout: 10000,
});

export const fetchMenuData = async (retries = 2) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await serverClient.request(MENU_QUERIES.GET_MENU);
      return data?.shopCategories || [];
    } catch (error) {
      console.error(`Error fetching menu data (attempt ${attempt + 1}/${retries + 1}):`, error.message);

      if (attempt === retries) {
        return null; // Return null so client can pick up
      }

      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return null;
};
