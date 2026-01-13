import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/lib/api/client-config/client';
import useAuth from '@/lib/store/auth';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/lib/const/endpoints';
import useCartStore from '@/lib/store/cart';
import { deleteCookie } from '@/lib/utils/cookies';

export const useLogin = () => {
  const setAuth = useAuth((state) => state.setAuth);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { items, clearCart } = useCartStore();

  return useMutation({
    mutationFn: async (credentials) => {
      const data = await client.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return data;
    },
    onSuccess: async (data) => {
      // Map the API response to the store's expected format
      setAuth({ id: data.userId, name: data.userName, email: data.userName }, data.token);

      // Set token in cookie (expires in 7 days)
      if (typeof window !== 'undefined') {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        document.cookie = `token=${data.token}; path=/; expires=${expires.toUTCString()}; SameSite=Strict; Secure`;
      }

      message.success('Login successful!');

      // Sync cart if there are local items
      if (items.length > 0) {
        try {
          message.loading({ content: 'Syncing cart...', key: 'cartSync' });

          const promises = items.map((item) =>
            client.post(
              API_ENDPOINTS.CART.ADD,
              {
                productId: item.id || item.productId, // Handle both id formats
                productVariantId: item.variantId || item.productVariantId || null,
                quantity: item.quantity,
                addons: item.addons || [],
              },
              {
                headers: { Authorization: `Bearer ${data.token}` },
              }
            )
          );

          await Promise.all(promises);

          clearCart();
          message.success({ content: 'Cart synced!', key: 'cartSync' });
        } catch (error) {
          console.error('Cart sync failed', error);
          message.error({ content: 'Failed to sync some cart items', key: 'cartSync' });
        }
      }

      // delete guest cookies, if user logged in
      deleteCookie('guest_customer_id');
      deleteCookie('guest_token');
      deleteCookie('guest_email');
      // Invalidate queries to fetch fresh cart from backend
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });

      router.push('/');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData) => {
      const data = await client.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return data;
    },
    onSuccess: (data) => {
      message.success('Registration successful!');
      router.push('/auth/login');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Registration failed');
    },
  });
};

// export const useInitiateGoogleLogin = () => {
//   return useMutation({
//     mutationFn: async ({ returnUrl }) => {
//       // Call the endpoint to get the redirect URL
//       const data = await client.get(API_ENDPOINTS.AUTH.EXTERNAL_LOGIN, {
//         params: {
//           provider: 'Google',
//           returnUrl,
//         },
//       });
//       return data;
//     },
//     onSuccess: (data) => {
//       if (data?.url) {
//         // Navigate to the returned URL
//         window.location.href = data.url;
//       } else {
//         message.error('Failed to get login URL');
//       }
//     },
//     onError: (error) => {
//       message.error(error.response?.data?.message || 'Failed to initiate Google login');
//     },
//   });
// };

export const useGoogleLogin = () => {
  const setAuth = useAuth((state) => state.setAuth);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { items, clearCart } = useCartStore();

  return useMutation({
    mutationFn: async (code) => {
      const data = await client.post(API_ENDPOINTS.AUTH.LOGIN_WITH_CODE, {
        code,
      });
      return data;
    },
    onSuccess: async (data) => {
      // Response: { userId, token, userName, isFirstTimeAccess }
      setAuth({ id: data.userId, name: data.userName }, data.token);

      // Set token in cookie (expires in 7 days)
      if (typeof window !== 'undefined') {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        document.cookie = `token=${data.token}; path=/; expires=${expires.toUTCString()}; SameSite=Strict; Secure`;
      }
      message.success(`Welcome ${data.userName}!`);

      // Sync cart if there are local items
      if (items.length > 0) {
        try {
          message.loading({ content: 'Syncing cart...', key: 'cartSync' });

          const promises = items.map((item) =>
            client.post(
              API_ENDPOINTS.CART.ADD,
              {
                productId: item.id || item.productId,
                productVariantId: item.variantId || item.productVariantId || null,
                quantity: item.quantity,
                addons: item.addons || [],
              },
              {
                headers: { Authorization: `Bearer ${data.token}` },
              }
            )
          );

          await Promise.all(promises);

          clearCart();
          message.success({ content: 'Cart synced!', key: 'cartSync' });
        } catch (error) {
          console.error('Cart sync failed', error);
          message.error({ content: 'Failed to sync some cart items', key: 'cartSync' });
        }
      }

      // delete guest cookies, if user logged in
      deleteCookie('guest_customer_id');
      deleteCookie('guest_token');
      deleteCookie('guest_email');
      // Invalidate queries to fetch fresh cart from backend
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });

      router.push('/');
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Google login failed');
    },
  });
};
