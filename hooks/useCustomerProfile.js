import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/graphql-client';
import { AUTH_QUERIES } from '@/lib/api/queries/auth.queries';

export const useCustomerProfile = (initialData) => {
    return useQuery({
        queryKey: ['customerProfile'],
        queryFn: async () => {
            return await graphqlClient.request(AUTH_QUERIES.GET_CUSTOMER_PROFILE_USING_TOKEN);
        },
        initialData,
    });
};
