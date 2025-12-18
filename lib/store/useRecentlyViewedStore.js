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
                const formatProduct = (p) => ({
                    id: p.id,
                    name: p.name,
                    slug: p.slug,
                    mainImageUrl: p.images?.[0] || p.mainImageUrl,
                    rating: p.rating || 5.0,
                    price: p.salePrice > 0 ? `AED ${p.salePrice}` : `AED ${p.price}`,
                });

                const formatted = formatProduct(product);

                // Check if exists
                const exists = recentlyViewed.some(p => p.slug === formatted.slug);

                // Remove existing to move to top, or just add if new
                const filtered = recentlyViewed.filter(p => p.slug !== formatted.slug);

                const updated = [formatted, ...filtered].slice(0, 10);

                set({ recentlyViewed: updated });
            },
        }),
        {
            name: 'recently-viewed-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
