import { useState, useEffect } from 'react';

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('recently_viewed');
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing recently viewed:', e);
      }
    }
  }, []);

  const addToRecentlyViewed = (product) => {
    if (!product) return;

    // Use functional state update to ensure we work with latest list
    setRecentlyViewed((prev) => {
      // Check if product already exists (by id or slug)
      const exists = prev.some((p) => p.slug === product.slug);
      if (exists) {
        // Determine if we should move it to top? commonly yes.
        // Filter out existing and add to front
        const others = prev.filter((p) => p.slug !== product.slug);
        const updated = [formatProductForStorage(product), ...others].slice(0, 8);
        localStorage.setItem('recently_viewed', JSON.stringify(updated));
        return updated;
      }

      // Add to front, limit to 10
      const updated = [formatProductForStorage(product), ...prev].slice(0, 8);
      localStorage.setItem('recently_viewed', JSON.stringify(updated));
      return updated;
    });
  };

  // Helper to store only what's needed for ProductCard
  const formatProductForStorage = (product) => {
    const firstVariant = product.variants?.[0];
    const price = product.price || firstVariant?.price || 0;
    const salePrice = product.salePrice || firstVariant?.salePrice || 0;
    const isOnSale = product.isOnSale || (salePrice > 0 && salePrice < price);

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      mainImageUrl: product.images?.[0] || product.mainImageUrl,
      rating: product.rating || 5.0,
      price: price,
      salePrice: salePrice,
      isOnSale: isOnSale,
    };
  };

  return { recentlyViewed, addToRecentlyViewed };
};
