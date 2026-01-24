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
        const existingItem = items.find(
          (item) =>
            String(item.productId) === String(product.productId) &&
            String(item.productVariantId || 'null') === String(product.productVariantId || 'null')
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.productId && item.productVariantId === product.productVariantId
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
                quantity: product.quantity || 1,
              },
            ],
          });
        }
      },

      removeFromCart: (productId, productVariantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                String(item.productId) === String(productId) &&
                String(item.productVariantId || 'null') === String(productVariantId || 'null')
              )
          ),
        });
      },

      updateQuantity: (productId, productVariantId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, productVariantId);
          return;
        }

        set({
          items: get().items.map((item) =>
            String(item.productId) === String(productId) &&
              String(item.productVariantId || 'null') === String(productVariantId || 'null')
              ? { ...item, quantity }
              : item
          ),
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
