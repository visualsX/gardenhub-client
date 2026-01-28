'use client';

import Link from 'next/link';
import CartItem from '@/components/shared/cart/CartItem';
import CartSummary from '@/components/shared/cart/CartSummary';
import { useCart, useRemoveCartItem, useUpdateCartItem } from '@/hooks/cart/useCart';
import { Spin } from 'antd';

export default function CartPage() {
  const { data: cartData, isLoading } = useCart();
  const { mutate: removeItem } = useRemoveCartItem();
  const { mutateAsync: updateItemAsync } = useUpdateCartItem();

  // Parse items to ensure consistency
  const items = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;

  // Derived totals (tax and subtotal only)
  // const totalTaxAmount = (subtotal) => {
  //   return subtotal * TAX_RATE;
  // };

  const totalAmount = (subtotal) => {
    return subtotal;
  };

  const totals = {
    subtotal: subtotal.toFixed(2),
    // tax: totalTaxAmount(subtotal).toFixed(2),
    total: totalAmount(subtotal).toFixed(2),
  };

  if (isLoading) {
    return (
      <div className="max-layout flex min-h-screen items-center justify-center pt-32 pb-16">
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

          <h1 className="mb-4 text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
          <p className="mb-8 max-w-md text-center text-gray-600">
            Looks like you haven't added any plants to your cart yet. Start shopping and discover
            our amazing collection!
          </p>

          <Link
            href="/shop"
            className="bg-primary! hover:bg-primary-dark rounded-full px-8 py-4 font-semibold text-white! transition-all hover:shadow-xl"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-layout min-h-screen pt-24 pb-16 sm:pt-32">
      {/* Page Header */}
      <div className="mb-6 px-4 sm:mb-8 sm:px-0">
        <h1 className="font-outfit mb-1 text-3xl font-black tracking-tight text-[#2d5f3f] sm:mb-2 sm:text-4xl">
          Shopping Cart
        </h1>
        <p className="font-outfit text-sm font-medium text-gray-500 sm:text-base">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-0 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem
              key={`page-${item.cartItemId || item.id || item.productId || 'b'}-${item.productBundleId || 'nb'}-${item.productVariantId || 'no-v'}`}
              item={item}
              onRemove={() =>
                removeItem({
                  cartItemId: item.cartItemId || item.id,
                  productId: item.productId,
                  productVariantId: item.productVariantId,
                  productBundleId: item.productBundleId,
                })
              }
              onUpdateQuantity={(newQty) =>
                updateItemAsync({
                  cartItemId: item.cartItemId || item.id,
                  productId: item.productId,
                  productVariantId: item.productVariantId,
                  productBundleId: item.productBundleId,
                  quantity: newQty,
                })
              }
            />
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-2 sm:pt-4">
            <Link
              href="/shop"
              className="text-primary! hover:text-primary-dark! font-outfit inline-flex items-center gap-2 text-sm font-bold transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 sm:top-32">
            <div className="flex flex-col">
              <CartSummary totals={totals} />

              {/* Checkout Button */}
              <Link
                className="bg-primary! hover:bg-primary-dark! mt-6 w-full rounded-full! py-4 text-center font-bold text-white! shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
                href="/checkout"
              >
                Proceed to Checkout
              </Link>

              {/* Security Badge */}
              <div className="font-outfit mt-6 flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure Checkout Powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
