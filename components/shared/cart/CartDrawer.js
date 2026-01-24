'use client';

import { Drawer } from 'antd';
import { Link } from '@/i18n/navigation';
import useCartStore from '@/lib/store/cart';
import CartItem from './CartItem';
import { useCart, useRemoveCartItem, useUpdateCartItem } from '@/hooks/cart/useCart';
import { Spin } from 'antd';

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer } = useCartStore(); // Only UI state from store
  const { data: cartData, isLoading } = useCart();
  const { mutate: removeItem } = useRemoveCartItem();
  const { mutate: updateItem } = useUpdateCartItem();

  const items = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <span className="text-xl tracking-wider font-bold text-primary">Shopping Cart</span>
          <span className="text-sm font-medium text-gray-500">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      }
      placement="right"
      onClose={closeDrawer}
      open={isDrawerOpen}
      size={420}
      styles={{
        body: { padding: '0' },
      }}
    >
      {items.length === 0 ? (
        // Empty Cart State
        <div className="flex h-full flex-col items-center justify-center p-6">
          <div className="mb-6 text-center">
            <svg
              className="mx-auto h-32 w-32 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-sm text-gray-500">
              Add some plants to your cart to get started!
            </p>
          </div>
          <button
            onClick={closeDrawer}
            className="bg-primary hover:bg-primary-dark rounded-full px-8 py-3 font-semibold text-white transition-all hover:shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        // Cart with Items
        <div className="flex h-full flex-col">
          {/* Cart Items */}
          <div className="flex-1 space-y-3 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Spin />
              </div>
            ) : (
              items.map((item) => (
                <CartItem
                  key={`drawer-${item.id || item.productId}-${item.variantId || item.productVariantId || 'no-v'}`}
                  item={item}
                  compact
                  onRemove={() =>
                    removeItem({
                      cartItemId: item.cartItemId || item.id || item.productId,
                      productId: item.productId || item.id,
                      productVariantId: item.productVariantId || item.variantId,
                    })
                  }
                  onUpdateQuantity={(newQty) =>
                    updateItem({
                      cartItemId: item.cartItemId || item.id || item.productId,
                      productId: item.productId || item.id,
                      productVariantId: item.productVariantId || item.variantId,
                      quantity: newQty,
                    })
                  }
                />
              ))
            )}
          </div>

          {/* Cart Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            {/* Subtotal */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-semibold text-gray-700">Subtotal</span>
              <span className="text-primary text-xl font-bold">AED {subtotal.toFixed(2)}</span>
            </div>

            <p className="mb-4 text-center text-xs text-gray-500">
              Shipping and taxes calculated at checkout
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="bg-primary! hover:bg-primary-dark! block w-full rounded-full py-3 text-center font-semibold text-white! transition-all hover:shadow-lg"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="border-primary text-primary! hover:bg-primary-light! block w-full rounded-full border-2 py-3 text-center font-semibold transition-all"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
