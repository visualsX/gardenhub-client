'use client';

import { useEffect, useState } from 'react';
import ProductGallery from '../product-detail/ProductGallery';
import FeaturesSection from '../product-detail/FeaturesSection';
import FAQBanner from '../product-detail/FAQBanner';
import ProductDescription from '../product-detail/ProductDescription';
import ProductGrid from '@/components/shared/ProductGrid';
import { useRecentlyViewedStore } from '@/lib/store/useRecentlyViewedStore';
import Link from 'next/link';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAddToCart } from '@/hooks/cart/useCart';
import useCartStore from '@/lib/store/cart';

export default function BundleDetailPage({ bundle }) {
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addToRecentlyViewed);
  const recentlyViewed = useRecentlyViewedStore((state) => state.recentlyViewed);
  const { openDrawer } = useCartStore();
  const addToCartMutation = useAddToCart();

  const [isMounted, setIsMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (bundle) {
      // Note: addToRecentlyViewed might expect a product object,
      // but we can pass bundle for now if the store/component can handle it.
      // If not, we might need a separate store for bundles or adapt this.
      // For now, let's just pass it and see.
      addToRecentlyViewed({
        ...bundle,
        mainImageUrl: bundle.mainImageUrl,
        // Ensure properties match what's expected in ProductCard/Grid
      });
    }
  }, [bundle, addToRecentlyViewed]);

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      {
        productId: bundle.id,
        productVariantId: null,
        quantity: quantity,
        addons: [],
        productInfo: {
          id: bundle.id,
          variantId: 'bundle',
          name: bundle.name,
          variant: 'Bundle',
          price: parseFloat(bundle.price),
          salePrice: 0,
          quantity: quantity,
          image: bundle.mainImageUrl || '/all/image-placeholder.svg',
          addons: [],
          addonDetails: null,
        },
      },
      {
        onSuccess: () => {
          openDrawer();
        },
      }
    );
  };

  if (!bundle) return null;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-layout space-y-16">
        {/* Top Section: Gallery & Info */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ProductGallery images={[bundle.mainImageUrl]} />
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-gray-900">{bundle.name}</h1>
              <div className="flex items-center gap-4">
                {bundle.originalPrice > bundle.price && (
                  <span className="text-xl text-gray-400 line-through">
                    AED {bundle.originalPrice}
                  </span>
                )}
                <span className="text-primary text-3xl font-bold">AED {bundle.price}</span>
                {bundle.savingsAmount > 0 && (
                  <span className="rounded bg-red-100 px-2 py-1 text-sm font-bold text-red-600">
                    Save AED {bundle.savingsAmount}
                  </span>
                )}
              </div>
            </div>

            <p className="mb-8 text-lg text-gray-600">{bundle.shortDescription}</p>

            {/* Bundle Items */}
            <div className="mb-8 rounded-2xl bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">What's included:</h3>
              <div className="space-y-4">
                {bundle.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.productImageUrl || '/all/image-placeholder.svg'}
                      alt={item.productName}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.productName}</h4>
                      {item.variantName && (
                        <p className="text-sm text-gray-500">{item.variantName}</p>
                      )}
                      <p className="text-sm font-medium text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold">AED {item.totalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-900">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="flex h-12 w-12 items-center justify-center"
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-white text-xl font-bold text-gray-900 shadow-sm">
                    {quantity}
                  </div>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="flex h-12 w-12 items-center justify-center"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              className="bg-primary hover:bg-primary-hover shadow-primary/20 w-full rounded-2xl py-4 text-xl font-bold text-white shadow-lg transition-colors disabled:opacity-50"
            >
              {addToCartMutation.isPending ? 'Adding to Cart...' : 'Add Bundle to Cart'}
            </button>
            <FeaturesSection />
          </div>
        </div>
      </div>

      <FAQBanner />

      <div className="">
        {/* Description */}
        <ProductDescription
          description={bundle.detailDescription || bundle.shortDescription}
          careInfo={[]}
        />

        {/* Recently Viewed */}
        {isMounted && recentlyViewed.filter((p) => p.slug !== bundle.slug).length > 0 && (
          <ProductGrid
            titleClassName="text-4xl!"
            title="Recently viewed"
            products={recentlyViewed.filter((p) => p.slug !== bundle.slug)}
          />
        )}
      </div>
    </div>
  );
}
