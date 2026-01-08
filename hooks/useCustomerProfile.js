import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { AUTH_QUERIES } from '@/lib/api/queries/auth.queries';
import { getCookie } from '@/lib/utils/cookie'; // Assuming this utility exists based on previous steps

export const useCustomerProfile = (initialData) => {
  const token = getCookie('token'); // or whatever the auth token cookie name is. Usually 'token'.

  return useQuery({
    queryKey: ['customerProfile'],
    queryFn: async () => {
      // Double check token presence just in case enabled flag race condition
      if (!getCookie('token')) return null;
      try {
        return await graphqlClient.request(AUTH_QUERIES.GET_CUSTOMER_PROFILE_USING_TOKEN);
      } catch (error) {
        // If unauthorized locally for some reason (e.g. expired), return null or let it throw but handled?
        // For now, let's allow it to throw if enabled was true, but maybe catch 401?
        throw error;
      }
    },
    initialData,
    enabled: !!token,
    retry: false
  });
};
