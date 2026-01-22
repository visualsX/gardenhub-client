import { useQuery, useMutation } from '@tanstack/react-query';
import client from '@/lib/api/client-config/client';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { ORDERS_QUERIES } from '@/lib/api/queries/orders.queries';
import { API_ENDPOINTS } from '@/lib/const/endpoints';

export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: async (variables) => {
      const data = await graphqlClient.request(ORDERS_QUERIES.VALIDATE_COUPON_CODE, variables);
      return data.validateCoupon;
    },
  });
};

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['paymentMethods'],
    queryFn: async () => {
      const data = await client.get(API_ENDPOINTS.ORDER.PAYMENT_METHODS);
      console.log('payment methods: ', data);
      return data;
    },
  });
};

export const useShippingRates = (emirate) => {
  return useQuery({
    queryKey: ['shippingRates', emirate],
    queryFn: async () => {
      // if (!emirate) return [];
      // The API expects 'countryCode' parameter.
      const data = await client.get(API_ENDPOINTS.ORDER.SHIPPING_RATES, {
        params: { countryCode: emirate },
      });
      return data;
    },
    // enabled: !!emirate,
  });
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const data = await client.post(API_ENDPOINTS.ORDER.CREATE, payload);
      return data;
    },
  });
};
