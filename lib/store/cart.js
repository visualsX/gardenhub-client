import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isDrawerOpen: false,

      // Drawer actions
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      // Cart actions
      addToCart: (product) => {
        const items = get().items;
        const normalize = (val) => (val === null || val === undefined || val === 0) ? 'null' : String(val);
        const getItemKey = (item) =>
          `${normalize(item.productId)}-${normalize(item.productVariantId)}-${normalize(item.productBundleId)}`;

        const productKey = getItemKey(product);
        const existingItem = items.find((item) => getItemKey(item) === productKey);

        if (existingItem) {
          set({
            items: items.map((item) =>
              getItemKey(item) === productKey
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                ...product,
                productId: product.productId,
                productVariantId: product.productVariantId || null,
                productBundleId: product.productBundleId || null,
                quantity: product.quantity || 1,
              },
            ],
          });
        }
      },

      removeFromCart: (productId, productVariantId, productBundleId = null) => {
        const normalize = (val) => (val === null || val === undefined || val === 0) ? 'null' : String(val);
        const targetKey = `${normalize(productId)}-${normalize(productVariantId)}-${normalize(productBundleId)}`;

        set({
          items: get().items.filter((item) => {
            const i_key = `${normalize(item.productId)}-${normalize(item.productVariantId)}-${normalize(item.productBundleId)}`;
            return i_key !== targetKey;
          }),
        });
      },

      updateQuantity: (productId, productVariantId, quantity, productBundleId = null) => {
        const normalize = (val) => (val === null || val === undefined || val === 0) ? 'null' : String(val);
        if (quantity <= 0) {
          get().removeFromCart(productId, productVariantId, productBundleId);
          return;
        }

        const targetKey = `${normalize(productId)}-${normalize(productVariantId)}-${normalize(productBundleId)}`;

        set({
          items: get().items.map((item) => {
            const i_key = `${normalize(item.productId)}-${normalize(item.productVariantId)}-${normalize(item.productBundleId)}`;
            return i_key === targetKey
              ? { ...item, quantity }
              : item;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      // Computed values
      getCartTotal: () => {
        const items = get().items;
        const subtotal = items.reduce((total, item) => {
          const price = item.salePrice > 0 ? item.salePrice : item.price;
          return total + price * item.quantity;
        }, 0);

        const shipping = subtotal > 0 ? 25 : 0; // Free shipping over certain amount
        const tax = subtotal * 0.05; // 5% tax
        const total = subtotal + shipping + tax;

        return {
          subtotal: subtotal.toFixed(2),
          shipping: shipping.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
        };
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
