import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useRecentlyViewedStore = create(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      addToRecentlyViewed: (product) => {
        if (!product) return;

        const { recentlyViewed } = get();

        // Format helper
        const formatProduct = (p) => {
          const firstVariant = p.variants?.[0];
          const price = p.price || firstVariant?.price || 0;
          const salePrice = p.salePrice || firstVariant?.salePrice || 0;
          const isOnSale = p.isOnSale || (salePrice > 0 && salePrice < price);

          return {
            id: p.id,
            name: p.name,
            slug: p.slug,
            mainImageUrl: p.images?.[0] || p.mainImageUrl,
            rating: p.rating || 5.0,
            price: price,
            salePrice: salePrice,
            isOnSale: isOnSale,
          };
        };

        const formatted = formatProduct(product);

        // Check if exists
        const exists = recentlyViewed.some((p) => p.slug === formatted.slug);

        // Remove existing to move to top, or just add if new
        const filtered = recentlyViewed.filter((p) => p.slug !== formatted.slug);

        const updated = [formatted, ...filtered].slice(0, 8);

        set({ recentlyViewed: updated });
      },
    }),
    {
      name: 'recently-viewed-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
