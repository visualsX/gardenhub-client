import { cookies } from 'next/headers';
import graphqlClient from '@/lib/api/graphql-client';
import { AUTH_QUERIES } from '@/lib/api/queries/auth.queries';
import { withSSRRetry } from './ssr-utils';

/**
 * Fetch customer profile server-side using the auth token from cookies
 */
export async function getCustomerProfile() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return null;
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
