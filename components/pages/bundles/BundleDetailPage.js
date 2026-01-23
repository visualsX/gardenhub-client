'use client';

import { useEffect, useState } from 'react';
import ProductGallery from '../product-detail/ProductGallery';
import FeaturesSection from '../product-detail/FeaturesSection';
import FAQBanner from '../product-detail/FAQBanner';
import ProductDescription from '../product-detail/ProductDescription';
import ProductGrid from '@/components/shared/ProductGrid';
import { useRecentlyViewedStore } from '@/lib/store/useRecentlyViewedStore';
import Link from 'next/link';

export default function BundleDetailPage({ bundle }) {
    const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addToRecentlyViewed);
    const recentlyViewed = useRecentlyViewedStore((state) => state.recentlyViewed);
    const [isMounted, setIsMounted] = useState(false);

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
                                <span className="text-3xl font-bold text-primary">
                                    AED {bundle.price}
                                </span>
                                {bundle.savingsAmount > 0 && (
                                    <span className="rounded bg-red-100 px-2 py-1 text-sm font-bold text-red-600">
                                        Save AED {bundle.savingsAmount}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="mb-8 text-lg text-gray-600">
                            {bundle.shortDescription}
                        </p>

                        {/* Bundle Items */}
                        <div className="mb-8 rounded-2xl bg-gray-50 p-6">
                            <h3 className="mb-4 text-xl font-bold text-gray-900">What's included:</h3>
                            <div className="space-y-4">
                                {bundle.items?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
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
                                            <p className="font-bold text-primary">AED {item.totalPrice}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="w-full rounded-2xl bg-primary py-4 text-xl font-bold text-white transition-colors hover:bg-primary-hover shadow-lg shadow-primary/20">
                            Add Bundle to Cart
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
