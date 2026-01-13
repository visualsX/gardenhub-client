'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/lib/api/client-config/client';
import { API_ENDPOINTS } from '@/lib/const/endpoints';
import useAuth from '@/lib/store/auth';
import useCartStore from '@/lib/store/cart';
import { message } from 'antd';
import { getCookie } from '@/lib/utils/cookies';

export const useCartCount = () => {
  const { token: authStoreToken, user } = useAuth();
  const { getItemCount } = useCartStore();
  const token = authStoreToken || getCookie('token');

  return useQuery({
    queryKey: ['cartCount', !!token, user?.id],
    queryFn: async () => {
      if (!token) return { count: getItemCount() };
      try {
        // Backend requires customerId for count
        const params = user?.id ? { customerId: user.id } : {};
        const data = await client.get(API_ENDPOINTS.CART.COUNT, { params });
        return data;
      } catch (error) {
        console.error('Error fetching cart count:', error);
        return { count: 0 };
      }
    },
    placeholderData: { count: 0 },
    staleTime: 1000 * 60 * 5,
    enabled: !token || !!user?.id,
  });
};

export const useCart = () => {
  const { token: authStoreToken } = useAuth();
  const { items: localItems } = useCartStore();
  const token = authStoreToken || getCookie('token');

  return useQuery({
    queryKey: ['cart', !!token],
    queryFn: async () => {
      if (token) {
        return await client.get(API_ENDPOINTS.CART.GET);
      }
      // For guest, return structure matching backend or consistent one
      // We map local items to match typical backend shape if needed
      // But for now returning the store structure wrapped
      const subtotal = localItems.reduce((acc, item) => {
        const price = item.salePrice > 0 ? item.salePrice : item.price;
        return acc + price * item.quantity;
      }, 0);

      return {
        items: localItems,
        subtotal: subtotal,
        totalItems: localItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { token: authStoreToken } = useAuth();
  const { addToCart } = useCartStore();
  const token = authStoreToken || getCookie('token');

  return useMutation({
    mutationFn: async ({ productId, productVariantId, quantity, addons, productInfo }) => {
      if (token) {
        return await client.post(API_ENDPOINTS.CART.ADD, {
          productId,
          productVariantId: productVariantId || null,
          quantity,
          addons: Array.isArray(addons) ? addons : [],
        });
      }

      // Guest: Add to local store
      // Mapping to store expected format
      // Store expects 'product' object with id, variantId, quantity etc.
      addToCart({
        ...productInfo,
        id: productId,
        variantId: productVariantId || null,
        quantity: quantity,
        addons: addons,
      });
      return { message: 'Item added to local cart' };
    },
    onSuccess: () => {
      message.success('Added to cart');
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to add to cart');
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { token: authStoreToken } = useAuth();
  const { updateQuantity } = useCartStore();
  const token = authStoreToken || getCookie('token');

  return useMutation({
    mutationFn: async ({ cartItemId, productId, productVariantId, quantity }) => {
      if (token) {
        if (!cartItemId) throw new Error('Cart Item ID is required for updates');
        return await client.put(`${API_ENDPOINTS.CART.ITEMS}/${cartItemId}`, { quantity });
      }

      // Guest: Update local store
      updateQuantity(productId, productVariantId, quantity);
      return { message: 'Local cart updated' };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to update cart');
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const { token: authStoreToken } = useAuth();
  const { removeFromCart } = useCartStore();
  const token = authStoreToken || getCookie('token');

  return useMutation({
    mutationFn: async ({ cartItemId, productId, productVariantId }) => {
      if (token) {
        if (!cartItemId) throw new Error('Cart Item ID is required for removal');
        return await client.delete(`${API_ENDPOINTS.CART.ITEMS}/${cartItemId}`);
      }

      // Guest: Remove from local store
      removeFromCart(productId, productVariantId);
      return { message: 'Item removed from local cart' };
    },
    onSuccess: () => {
      message.success('Item removed');
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || 'Failed to remove item');
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { token: authStoreToken } = useAuth();
  const { clearCart: clearLocalCart } = useCartStore();
  const token = authStoreToken || getCookie('token');

  return useMutation({
    mutationFn: async () => {
      if (token) {
        // Assuming Clear endpoint exists as defined in endpoints.js
        return await client.delete(API_ENDPOINTS.CART.CLEAR);
      }
      clearLocalCart();
      return { message: 'Local cart cleared' };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      message.error('Failed to clear cart');
    },
  });
};
