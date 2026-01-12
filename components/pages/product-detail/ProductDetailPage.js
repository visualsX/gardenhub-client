'use client';

import { useEffect, useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import BundleSection from './BundleSection';
import FeaturesSection from './FeaturesSection';
import FAQBanner from './FAQBanner';
import ProductDescription from './ProductDescription';
import ReviewsSection from './ReviewsSection';
import ProductGrid from '@/components/shared/ProductGrid';
import { useRecentlyViewedStore } from '@/lib/store/useRecentlyViewedStore';

export default function ProductDetailPage({ product }) {
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addToRecentlyViewed);
  const recentlyViewed = useRecentlyViewedStore((state) => state.recentlyViewed);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) return null;

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Added pt-24 for fixed header spacing */}
      <div className="max-layout space-y-16">
        {/* Top Section: Gallery & Info */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} />
          <div className="">
            <ProductInfo product={product} />
            <BundleSection bundles={product.bundles || []} />
            <FeaturesSection />
          </div>
        </div>
      </div>

      {/* FAQ Banner */}
      <FAQBanner />

      <div className="">
        {/* Description & Care */}
        <ProductDescription
          description={
            product.longDescription || product.detailedDescription || product.shortDescription
          }
          careInfo={product.filterTags || []}
        />

        {/* Other You May Also Like */}
        {product.relatedProducts.length > 0 && <ProductGrid
          titleClassName="text-4xl!"
          title="Other you may also like"
          products={product.relatedProducts || []}
        />
        }
        {/* Recently Viewed */}
        {isMounted && recentlyViewed.filter((p) => p.slug !== product.slug).length > 0 && (
          <ProductGrid
            titleClassName="text-4xl!"
            title="Recently viewed products"
            products={recentlyViewed.filter((p) => p.slug !== product.slug)}
          />
        )}

        {/* Reviews */}
        <div className="border-t border-gray-100 pt-12">
          <ReviewsSection
            reviews={product.reviewsList || []}
            rating={product.rating || 0}
            totalReviews={product.reviews || 0}
          />
        </div>
      </div>
    </div>
  );
}
