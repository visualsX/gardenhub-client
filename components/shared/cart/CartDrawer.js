'use client';

import { Drawer } from 'antd';
import { useRouter } from 'next/navigation';
import useCartStore from '@/lib/store/cart';
import CartItem from './CartItem';

export default function CartDrawer() {
    const router = useRouter();
    const { items, isDrawerOpen, closeDrawer, getCartTotal } = useCartStore();
    const totals = getCartTotal();

    const handleViewCart = () => {
        closeDrawer();
        router.push('/cart');
    };

    const handleCheckout = () => {
        closeDrawer();
        router.push('/checkout');
    };

    return (
        <Drawer
            title={
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Shopping Cart</span>
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
                <div className="flex h-full flex-col items-center justify-center px-6 pb-6">
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
                        className="rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                // Cart with Items
                <div className="flex h-full flex-col">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-3 overflow-y-auto px-6 py-6">
                        {items.map((item) => (
                            <CartItem key={`${item.id}-${item.variantId || 'default'}`} item={item} compact />
                        ))}
                    </div>

                    {/* Cart Footer */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-6">
                        {/* Subtotal */}
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-base font-semibold text-gray-700">Subtotal</span>
                            <span className="text-xl font-bold text-primary">AED {totals.subtotal}</span>
                        </div>

                        <p className="mb-4 text-xs text-gray-500 text-center">
                            Shipping and taxes calculated at checkout
                        </p>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleCheckout}
                                className="w-full rounded-full bg-primary py-3 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={handleViewCart}
                                className="w-full rounded-full border-2 border-primary py-3 font-semibold text-primary transition-all hover:bg-primary-light"
                            >
                                View Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Drawer>
    );
}
