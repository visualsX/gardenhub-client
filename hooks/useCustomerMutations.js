import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/lib/api/client';
import useAuth from '@/lib/store/auth';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/lib/const/endpoints';

export const useUpdateProfile = () => {
    const setAuth = useAuth((state) => state.setAuth);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const response = await client.put(API_ENDPOINTS.CUSTOMER.PROFILE, data);
            return response;
        },
        onSuccess: (data) => {
            message.success('Profile updated successfully!');
            // Update local auth state if name changed
            // Assuming response contains fresh profile data or we use the sent data
            // For now, let's invalidate the profile query
            queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to update profile');
        },
    });
};

export const useDeleteAccount = () => {
    const logout = useAuth((state) => state.logout);
    const router = useRouter();

    return useMutation({
        mutationFn: async () => {
            const response = await client.delete(API_ENDPOINTS.CUSTOMER.DELETE_ACCOUNT);
            return response;
        },
        onSuccess: () => {
            message.success('Account deleted successfully');
            logout();
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            router.push('/');
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to delete account');
        },
    });
};

export const useAddAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const response = await client.post(API_ENDPOINTS.CUSTOMER.ADDRESS, data);
            return response;
        },
        onSuccess: () => {
            message.success('Address added successfully');
            queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
            // queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to add address');
        },
    });
};

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await client.put(`${API_ENDPOINTS.CUSTOMER.ADDRESS}/${id}`, data);
            return response;
        },
        onSuccess: () => {
            message.success('Address updated successfully');
            queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
            // queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to update address');
        },
    });
};

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const response = await client.delete(`${API_ENDPOINTS.CUSTOMER.ADDRESS}/${id}`);
            return response;
        },
        onSuccess: () => {
            message.success('Address deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
            // queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to delete address');
        },
    });
};

export const useSetDefaultBillingAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            // Endpoint logic: PATCH /api/Customer/address/{id}/default
            const response = await client.patch(
                `${API_ENDPOINTS.CUSTOMER.ADDRESS}/${id}${API_ENDPOINTS.CUSTOMER.DEFAULT_BILLING_ADDRESS}`
            );
            return response;
        },
        onSuccess: () => {
            message.success('Default billing address updated');
            queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
            // queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to set default billing address');
        },
    });
};

export const useSetDefaultShippingAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            // Endpoint logic: PATCH /api/Customer/address/{id}/default
            const response = await client.patch(
                `${API_ENDPOINTS.CUSTOMER.ADDRESS}/${id}${API_ENDPOINTS.CUSTOMER.DEFAULT_SHIPPING_ADDRESS}`
            );
            return response;
        },
        onSuccess: () => {
            message.success('Default shipping address updated');
            queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
            // queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to set default shipping address');
        },
    });
};
