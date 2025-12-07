'use client';

import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import BundleSection from './BundleSection';
import FeaturesSection from './FeaturesSection';
import FAQBanner from './FAQBanner';
import ProductDescription from './ProductDescription';
import ReviewsSection from './ReviewsSection';
import ProductGrid from '@/components/shared/ProductGrid';

export default function ProductDetailPage({ product }) {
  if (!product) return null;

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Added pt-24 for fixed header spacing */}
      <div className="max-layout space-y-16">
        {/* Top Section: Gallery & Info */}
        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} />
          <div className="">
            <ProductInfo product={product} />
            <BundleSection bundles={product.bundles} />
            <FeaturesSection />
          </div>
        </div>
      </div>

      {/* FAQ Banner */}
      <FAQBanner />

      <div className="">
        {/* Description & Care */}
        <ProductDescription description={product.longDescription} careInfo={product.careInfo} />

        {/* Other You May Also Like */}
        <ProductGrid title="Other you may also like" products={product.relatedProducts} />

        {/* Recently Viewed */}
        <ProductGrid title="Recently viewed products" products={product.relatedProducts} />

        {/* Reviews */}
        <div className="border-t border-gray-100 pt-12">
          <ReviewsSection
            reviews={product.reviewsList}
            rating={product.rating}
            totalReviews={product.reviews}
          />
        </div>
      </div>
    </div>
  );
}
