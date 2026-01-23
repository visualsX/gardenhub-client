import { cookies } from 'next/headers';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { ORDERS_QUERIES } from '@/lib/api/queries';
import { withSSRRetry } from './ssr-utils';

/**
 * Fetch a single order by ID server-side
 */
export async function getServerOrderById(id, locale = 'en') {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  return withSSRRetry(
    async () => {
      graphqlClient.setHeader('Authorization', `Bearer ${token}`);
      const variables = { id: parseInt(id) };
      const data = await graphqlClient.request(ORDERS_QUERIES.GET_ORDERS_ID, variables);
      return data.customerOrderById;
    },
    { label: `Get Order Detail (ID: ${id})` }
  );
}

/**
 * Fetch paginate user orders server-side
 */
export async function getServerMyOrders({ first = 10, after = null, where = null } = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { edges: [], totalCount: 0, pageInfo: {} };
  }

  return withSSRRetry(
    async () => {
      graphqlClient.setHeader('Authorization', `Bearer ${token}`);
      const variables = { first, after, where };
      const data = await graphqlClient.request(ORDERS_QUERIES.GET_MY_ORDERS, variables);
      return data.myOrders || { edges: [], totalCount: 0, pageInfo: {} };
    },
    { label: 'Get My Orders (SSR)' }
  );
}
