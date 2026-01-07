'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useCartStore from '@/lib/store/cart';
import CartItem from '@/components/shared/cart/CartItem';
import CartSummary from '@/components/shared/cart/CartSummary';
import { useCart, useRemoveCartItem, useUpdateCartItem } from '@/hooks/cart/useCart';
import { Spin } from 'antd';

export default function CartPage() {
    const router = useRouter();
    const { data: cartData, isLoading } = useCart();
    const { mutate: removeItem } = useRemoveCartItem();
    const { mutate: updateItem } = useUpdateCartItem();

    // Parse items to ensure consistency
    const items = cartData?.items || [];
    const subtotal = cartData?.subtotal || 0;

    // Derived totals (same logic as checkout/drawer - ideally centralized)
    const shipping = subtotal > 200 ? 0 : 25;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    const totals = {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };

    if (isLoading) {
        return (
            <div className="max-layout min-h-screen pt-32 pb-16 flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-layout min-h-screen pt-32 pb-16">
                <div className="flex flex-col items-center justify-center py-20">
                    {/* Empty Cart Illustration */}
                    <div className="mb-8">
                        <svg
                            className="h-48 w-48 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8 text-center max-w-md">
                        Looks like you haven't added any plants to your cart yet. Start shopping and discover our amazing collection!
                    </p>

                    <Link
                        href="/shop"
                        className="rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-xl"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-layout min-h-screen pt-32 pb-16">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                <p className="text-gray-600">
                    {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </p>
            </div>

            {/* Cart Content */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <CartItem
                            key={`${item.id || item.productId}-${item.variantId || item.productVariantId || 'default'}`}
                            item={item}
                            onRemove={() => removeItem({
                                cartItemId: item.cartItemId || item.id,
                                productId: item.id || item.productId,
                                productVariantId: item.variantId || item.productVariantId
                            })}
                            onUpdateQuantity={(newQty) => updateItem({
                                cartItemId: item.cartItemId || item.id,
                                productId: item.id || item.productId,
                                productVariantId: item.variantId || item.productVariantId,
                                quantity: newQty
                            })}
                        />
                    ))}

                    {/* Continue Shopping Link */}
                    <div className="pt-4">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Cart Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32">
                        <CartSummary showPromoCode totals={totals} />

                        {/* Checkout Button */}
                        <button
                            onClick={() => router.push('/checkout')}
                            className="mt-6 w-full rounded-full bg-primary py-4 font-bold text-white transition-all hover:bg-primary-dark hover:shadow-xl"
                        >
                            Proceed to Checkout
                        </button>

                        {/* Security Badge */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
