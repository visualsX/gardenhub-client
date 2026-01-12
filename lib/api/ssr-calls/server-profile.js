import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { AUTH_QUERIES } from '@/lib/api/queries/auth.queries';
import { withSSRRetry } from './ssr-utils';

/**
 * Fetch customer profile server-side using the auth token from cookies
 */
export async function getCustomerProfile(locale = 'en') {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect(`/${locale}/auth/login`);
  }

  return withSSRRetry(
    async () => {
      // Configure client with token for this server-side request
      graphqlClient.setHeader('Authorization', `Bearer ${token}`);
      const data = await graphqlClient.request(AUTH_QUERIES.GET_CUSTOMER_PROFILE_USING_TOKEN);
      return data;
    },
    { label: 'Get Customer Profile' }
  );
}
