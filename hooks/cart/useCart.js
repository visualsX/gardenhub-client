'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/lib/api/client-config/client';
import { API_ENDPOINTS } from '@/lib/const/endpoints';
import useAuth from '@/lib/store/auth';
import useCartStore from '@/lib/store/cart';
import { message } from 'antd';
import { getCookie } from '@/lib/utils/cookies';

const calculateNewCartItems = (currentItems, newItem) => {
    // Normalize IDs and values
    const normalizedProductId = String(newItem.productId);
    const normalizedVariantId = newItem.productVariantId ? String(newItem.productVariantId) : null;
    const normalizedAddons = Array.isArray(newItem.addons) ? newItem.addons : [];
    const addonsString = JSON.stringify(normalizedAddons);

    const existingItemIndex = currentItems.findIndex(
        (item) =>
            String(item.productId) === normalizedProductId &&
            (item.productVariantId ? String(item.productVariantId) : null) === normalizedVariantId &&
            JSON.stringify(item.addons || []) === addonsString
    );

    if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + newItem.quantity
        };
        return newItems;
    } else {
        return [
            ...currentItems,
            {
                productId: newItem.productId,
                productVariantId: newItem.productVariantId || null,
                quantity: newItem.quantity,
                addons: normalizedAddons
            }
        ];
    }
};

export const useCartCount = () => {
    const { token, user } = useAuth();
    const { sessionToken: storeSessionToken, customerId: storeCustomerId, getTotalItems } = useCartStore();

    // Fallback to cookie if store is empty (hydration/persistence gaps)
    const sessionToken = storeSessionToken || getCookie('sessionToken');
    const customerId = storeCustomerId || getCookie('customerId');

    return useQuery({
        queryKey: ['cartCount', !!token, sessionToken, customerId],
        queryFn: async () => {
            if (!token && !sessionToken) return { count: getTotalItems() };
            try {
                const params = !token && customerId ? { customerId } : (user?.id ? { customerId: user.id } : {});
                const data = await client.get(API_ENDPOINTS.CART.COUNT, { params });
                return data;
            } catch (error) {
                return { count: getTotalItems() };
            }
        },
        placeholderData: { count: getTotalItems() },
        staleTime: 1000 * 60 * 5,
    });
};

export const useCart = () => {
    const { token } = useAuth();
    const { items: localItems, sessionToken: storeSessionToken } = useCartStore();

    const sessionToken = storeSessionToken || getCookie('sessionToken');

    return useQuery({
        queryKey: ['cart', !!token, sessionToken],
        queryFn: async () => {
            if (token) {
                return await client.get(API_ENDPOINTS.CART.GET);
            }
            if (sessionToken) {
                return await client.get(`${API_ENDPOINTS.CART.GUEST_GET}/${sessionToken}`);
            }
            // For guest without session, return simplified local items structure from Zustand
            return {
                items: localItems,
                subtotal: localItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0)
            };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();
    const { addItem: addLocalItem, items: localItems } = useCartStore(); // removed sessionToken/customerId destructing to force cookie read
    const syncCart = useSyncCart();

    return useMutation({
        mutationFn: async ({ productId, productVariantId, quantity, addons, productInfo }) => {
            const normalizedVariantId = productVariantId || null;
            const normalizedAddons = Array.isArray(addons) ? addons : [];
            const sessionToken = getCookie('sessionToken');
            const customerId = getCookie('customerId');

            if (token) {
                return await client.post(API_ENDPOINTS.CART.ADD, {
                    productId,
                    productVariantId: normalizedVariantId,
                    quantity,
                    addons: normalizedAddons,
                });
            }

            // If guest with session, do NOT use local store. Sync directly.
            if (sessionToken) {
                let currentItems = [];
                // Try to get data from cache first
                const cacheData = queryClient.getQueryData(['cart', false, sessionToken]);

                if (cacheData?.items) {
                    currentItems = cacheData.items;
                } else {
                    // Fallback: Fetch directly if cache missing (e.g. direct land on product page)
                    try {
                        const res = await client.get(`${API_ENDPOINTS.CART.GUEST_GET}/${sessionToken}`);
                        currentItems = res.items || [];
                    } catch (e) {
                        currentItems = [];
                    }
                }

                const newItems = calculateNewCartItems(currentItems, {
                    productId,
                    productVariantId: normalizedVariantId,
                    quantity,
                    addons: normalizedAddons
                });

                return await syncCart.mutateAsync({ sessionToken, customerId, items: newItems });
            }

            // If guest, add to local store containing
            addLocalItem(productInfo, normalizedVariantId, quantity, normalizedAddons);
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
    const { token } = useAuth();
    const { updateItemQuantity: updateLocalQuantity } = useCartStore();
    const syncCart = useSyncCart();

    return useMutation({
        mutationFn: async ({ cartItemId, productId, productVariantId, quantity }) => {
            const normalizedVariantId = productVariantId || null;
            const sessionToken = getCookie('sessionToken');
            const customerId = getCookie('customerId');

            if (token) {
                return await client.put(`${API_ENDPOINTS.CART.ITEMS}/${cartItemId}`, { quantity });
            }

            if (sessionToken) {
                // Fetch current items from cache or API
                let currentItems = [];
                const cacheData = queryClient.getQueryData(['cart', false, sessionToken]);

                if (cacheData?.items) {
                    currentItems = cacheData.items;
                } else {
                    try {
                        const res = await client.get(`${API_ENDPOINTS.CART.GUEST_GET}/${sessionToken}`);
                        currentItems = res.items || [];
                    } catch (e) {
                        currentItems = [];
                    }
                }

                // Update item in list
                const newItems = currentItems.map(item => {
                    // Check match using IDs (ignoring addons for simple update if not passed, but usually cart update is by unique combo)
                    // Using the same logic as store but on this list
                    // Note: Backend cart might have 'id' (cartItemId), but our sync uses product/variant/addon
                    // If we are syncing, we are rewriting.
                    // IMPORTANT: The listing relies on `productId` + `variant` match
                    const isMatch = String(item.productId) === String(productId) &&
                        (item.productVariantId ? String(item.productVariantId) : null) === (normalizedVariantId ? String(normalizedVariantId) : null);
                    // For update quantity, usually we assume addons match?
                    // If multiple items have same product/variant but different addons, this naive matching might be risky.
                    // However, updateLocalQuantity in store ignores addons matching! (Line 73 in store/cart.js).
                    // So we follow suit.

                    return isMatch ? { ...item, quantity } : item;
                });

                return await syncCart.mutateAsync({ sessionToken, customerId, items: newItems });
            }

            updateLocalQuantity(productId, normalizedVariantId, quantity);
            return { message: 'Local cart updated' };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartCount'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();
    const { removeItem: removeLocalItem } = useCartStore();
    const syncCart = useSyncCart();

    return useMutation({
        mutationFn: async ({ cartItemId, productId, productVariantId }) => {
            const sessionToken = getCookie('sessionToken');
            const customerId = getCookie('customerId');

            if (token) {
                return await client.delete(`${API_ENDPOINTS.CART.ITEMS}/${cartItemId}`);
            }

            if (sessionToken) {
                let currentItems = [];
                const cacheData = queryClient.getQueryData(['cart', false, sessionToken]);

                if (cacheData?.items) {
                    currentItems = cacheData.items;
                } else {
                    try {
                        const res = await client.get(`${API_ENDPOINTS.CART.GUEST_GET}/${sessionToken}`);
                        currentItems = res.items || [];
                    } catch (e) {
                        currentItems = [];
                    }
                }

                const normalizedProductId = String(productId);
                const normalizedVariantId = productVariantId ? String(productVariantId) : null;

                const newItems = currentItems.filter(item =>
                    !(
                        String(item.productId) === normalizedProductId &&
                        (item.productVariantId ? String(item.productVariantId) : null) === normalizedVariantId
                        // Store remove logic ignores addons too? Yes, line 87 in store.
                    )
                );

                return await syncCart.mutateAsync({ sessionToken, customerId, items: newItems });
            }

            removeLocalItem(productId, productVariantId);
            return { message: 'Item removed from local cart' };
        },
        onSuccess: () => {
            message.success('Item removed');
            queryClient.invalidateQueries({ queryKey: ['cartCount'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();
    const { token } = useAuth();
    const { clearCart: clearLocalCart } = useCartStore();
    const syncCart = useSyncCart();

    return useMutation({
        mutationFn: async () => {
            if (token) {
                return await client.delete(API_ENDPOINTS.CART.CLEAR);
            }
            clearLocalCart();
            return { message: 'Local cart cleared' };
        },
        onSuccess: () => {
            const { sessionToken, customerId } = useCartStore.getState();

            // Explicitly trigger sync if sessionToken exists and guest (with empty items)
            if (!token && sessionToken) {
                syncCart.mutate({ sessionToken, customerId, items: [] });
            }

            queryClient.invalidateQueries({ queryKey: ['cartCount'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export const useSyncCart = () => {
    const queryClient = useQueryClient();
    const { clearCart: clearLocalCart } = useCartStore();

    return useMutation({
        mutationFn: async ({ sessionToken, customerId, items }) => {
            return await client.post(API_ENDPOINTS.CART.SYNC, {
                sessionToken,
                customerId,
                items: items.map(item => ({
                    productId: item.productId,
                    productVariantId: item.productVariantId,
                    quantity: item.quantity,
                    addons: item.addons
                }))
            });
        },
        onSuccess: () => {
            clearLocalCart();
            queryClient.invalidateQueries({ queryKey: ['cartCount'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};
