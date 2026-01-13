'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import client from '@/lib/api/client-config/client';
import { API_ENDPOINTS } from '@/lib/const/endpoints';
import { getCookie, setCookie, deleteCookie } from '@/lib/utils/cookies';
import { message } from 'antd';

// Create Guest
export const useCreateGuest = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await client.post(API_ENDPOINTS.CHECKOUT_GUEST.CREATE, data);
      return response;
    },
    onSuccess: (data, variables) => {
      console.log('response', data);
      const { customerId, guestToken } = data;
      setCookie('guest_customer_id', customerId, 365);
      setCookie('guest_token', guestToken, 365);
      setCookie('guest_email', variables.email, 365);
    },
    onError: (error) => {
      console.error('Guest creation failed', error);
      message.error('Failed to create guest session');
    },
  });
};

// Convert Guest
export const useConvertGuest = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await client.post(API_ENDPOINTS.CHECKOUT_GUEST.CONVERT, data);
      return response;
    },
    onSuccess: () => {
      message.success('Account created successfully! Please log in.');
      // deleteCookie('guest_customer_id');
      // deleteCookie('guest_token');
      // deleteCookie('guest_email');
    },
    onError: (error) => {
      console.error('Conversion failed', error);
      message.error(
        'Failed to create account: ' + (error.response?.data?.message || 'Unknown error')
      );
    },
  });
};

// Can Convert Guest
export const useCanConvertGuest = () => {
  const guestToken = getCookie('guest_token');
  return useQuery({
    queryKey: ['canConvertGuest', guestToken],
    queryFn: async () => {
      const response = await client.get(API_ENDPOINTS.CHECKOUT_GUEST.CAN_CONVERT, {
        params: { guestToken },
      });
      return response;
    },
    enabled: !!guestToken,
    retry: false,
  });
};
