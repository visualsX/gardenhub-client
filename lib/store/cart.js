import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getCookie, setCookie, removeCookie } from '../utils/cookies';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            sessionToken: getCookie('sessionToken'),
            guestEmail: getCookie('guestEmail'),
            customerId: getCookie('customerId'),

            setSession: (token, customerId, email = null) => {
                set({ sessionToken: token, customerId, guestEmail: email });
                if (token) {
                    setCookie('sessionToken', token, 7); // 7 days
                } else {
                    removeCookie('sessionToken');
                }

                if (customerId) {
                    setCookie('customerId', customerId, 7);
                } else {
                    removeCookie('customerId');
                }

                if (email) {
                    setCookie('guestEmail', email, 7);
                } else if (!token) {
                    removeCookie('guestEmail');
                }
            },

            addItem: (product, variantId = null, quantity = 1, addons = []) => {
                const { items } = get();

                // Normalize IDs and values
                const normalizedProductId = String(product.id);
                const normalizedVariantId = variantId ? String(variantId) : null;
                const normalizedAddons = Array.isArray(addons) ? addons : [];
                const addonsString = JSON.stringify(normalizedAddons);

                const existingItemIndex = items.findIndex(
                    (item) =>
                        String(item.productId) === normalizedProductId &&
                        (item.productVariantId ? String(item.productVariantId) : null) === normalizedVariantId &&
                        JSON.stringify(item.addons || []) === addonsString
                );

                if (existingItemIndex > -1) {
                    const newItems = [...items];
                    newItems[existingItemIndex].quantity += quantity;
                    set({ items: newItems });
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                productId: product.id,
                                productVariantId: variantId || null,
                                quantity,
                                addons: normalizedAddons,
                                // Store some basic product info for local display
                                name: product.name,
                                price: product.salePrice > 0 ? product.salePrice : product.price,
                                image: product.mainImageUrl,
                            },
                        ],
                    });
                }
            },

            updateItemQuantity: (productId, variantId, quantity) => {
                const { items } = get();
                const normalizedProductId = String(productId);
                const normalizedVariantId = variantId ? String(variantId) : null;

                const newItems = items.map((item) =>
                    String(item.productId) === normalizedProductId &&
                        (item.productVariantId ? String(item.productVariantId) : null) === normalizedVariantId
                        ? { ...item, quantity }
                        : item
                );
                set({ items: newItems });
            },

            removeItem: (productId, variantId) => {
                const { items } = get();
                const normalizedProductId = String(productId);
                const normalizedVariantId = variantId ? String(variantId) : null;

                set({
                    items: items.filter(
                        (item) =>
                            !(
                                String(item.productId) === normalizedProductId &&
                                (item.productVariantId ? String(item.productVariantId) : null) === normalizedVariantId
                            )
                    ),
                });
            },

            clearCart: () => {
                set({ items: [], sessionToken: null, customerId: null, guestEmail: null });
                // removeCookie('sessionToken');
                // removeCookie('guestEmail');
                // removeCookie('customerId');
            },

            // Selector for total items count
            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
        }),
        {
            name: 'gardenhub-cart',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;
