'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import client from '@/lib/api/client-config/client';
import { API_ENDPOINTS } from '@/lib/const/endpoints';
import useCartStore from '@/lib/store/cart';
import { message } from 'antd';

export const useCreateGuestCheckout = () => {
    const { setSession } = useCartStore();

    return useMutation({
        mutationFn: async (userData) => {
            // payload: { email, firstName, lastName, phone }
            const data = await client.post(API_ENDPOINTS.CHECKOUT.GUEST_CREATE, userData);
            return data;
        },
        onSuccess: (data, variables) => {
            // response: { customerId, guestToken, message }
            setSession(data.guestToken, data.customerId, variables.email);
            message.success(data.message || 'Guest checkout created');
        },
        onError: (error) => {
            console.log(error);
            message.error(error.response?.data?.error || 'Failed to create guest checkout');
        },
    });
};

export const useConvertGuest = () => {
    return useMutation({
        mutationFn: async ({ guestToken, password }) => {
            return await client.post(API_ENDPOINTS.CHECKOUT.GUEST_CONVERT, {
                guestToken,
                password,
            });
        },
        onSuccess: () => {
            message.success('Account created and guest data converted!');
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to convert guest account');
        },
    });
};

export const useCanConvertGuest = (guestToken) => {
    return useQuery({
        queryKey: ['canConvertGuest', guestToken],
        queryFn: async () => {
            if (!guestToken) return null;
            return await client.get(API_ENDPOINTS.CHECKOUT.GUEST_CAN_CONVERT, {
                params: { guestToken },
            });
        },
        enabled: !!guestToken,
    });
};

export const usePlaceOrder = () => {
    return useMutation({
        mutationFn: async (orderData) => {
            // payload matches the Swagger screenshot
            return await client.post(API_ENDPOINTS.ORDER.PLACE, orderData);
        },
        onSuccess: (data) => {
            message.success('Order placed successfully!');
            return data;
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to place order. Please try again.');
        },
    });
};
