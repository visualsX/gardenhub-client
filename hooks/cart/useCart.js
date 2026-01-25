'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/lib/api/client-config/client';
import { API_ENDPOINTS } from '@/lib/const/endpoints';
import useAuth from '@/lib/store/auth';
import useCartStore from '@/lib/store/cart';
import { message } from 'antd';
import { USER_TOKEN } from '@/lib/const/global.variables';

export const useCartCount = () => {
  const { user } = useAuth();
  const { getItemCount } = useCartStore();

  return useQuery({
    queryKey: ['cartCount', !!USER_TOKEN, user?.id, !USER_TOKEN ? getItemCount() : null],
    queryFn: async () => {
      // Guest flow
      if (!USER_TOKEN) return { count: getItemCount() };

      // Authenticated flow - wait for user data if missing
      if (!user?.id) return { count: 0 };

      try {
        // Backend requires customerId for count
        const params = { customerId: user.id };
        const data = await client.get(API_ENDPOINTS.CART.COUNT, { params });
        return data;
      } catch (error) {
        console.error('Error fetching cart count:', error);
        return { count: 0 };
      }
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    enabled: !USER_TOKEN || !!user?.id,
  });
};

export const useCart = () => {
  const { items: localItems } = useCartStore();

  return useQuery({
    queryKey: ['cart', !!USER_TOKEN, !USER_TOKEN ? localItems : null],
    queryFn: async () => {
      if (USER_TOKEN) {
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
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { addToCart } = useCartStore();

  return useMutation({
    mutationFn: async ({ productId, productVariantId, productBundleId, quantity, addons, productInfo }) => {
      if (USER_TOKEN) {
        return await client.post(API_ENDPOINTS.CART.ADD, {
          productId: productId || null,
          productVariantId: productVariantId || null,
          productBundleId: productBundleId || null,
          quantity,
          addons: Array.isArray(addons) ? addons : [],
        });
      }

      // Guest: Add to local store
      // Mapping to store expected format
      // Store expects 'product' object with id, variantId, quantity etc.
      addToCart({
        ...productInfo,
        productId,
        productVariantId,
        productBundleId,
        quantity,
        addons,
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
  const { updateQuantity } = useCartStore();

  return useMutation({
    mutationFn: async ({ cartItemId, productId, productVariantId, quantity, productBundleId = null }) => {
      if (USER_TOKEN) {
        if (!cartItemId) throw new Error('Cart Item ID is required for updates');
        return await client.put(`${API_ENDPOINTS.CART.ITEMS}/${cartItemId}`, { quantity });
      }

      // Guest: Update local store
      updateQuantity(productId, productVariantId, quantity, productBundleId);
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
  const { removeFromCart } = useCartStore();

  return useMutation({
    mutationFn: async ({ cartItemId, productId, productVariantId, productBundleId = null }) => {
      if (USER_TOKEN) {
        if (!cartItemId) throw new Error('Cart Item ID is required for removal');
        return await client.delete(`${API_ENDPOINTS.CART.ITEMS}/${cartItemId}`);
      }

      // Guest: Remove from local store
      removeFromCart(productId, productVariantId, productBundleId);
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
  const { clearCart: clearLocalCart } = useCartStore();

  return useMutation({
    mutationFn: async () => {
      if (USER_TOKEN) {
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
