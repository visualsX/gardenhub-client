'use client';

import { Input, Button, Spin, Empty, Badge } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/hooks/cart/useCart';
import { useCartCount } from '@/hooks/cart/useCart';

const { TextArea } = Input;

export default function CartPage() {
    const { data: cart, isLoading } = useCart();
    const { data: cartCount } = useCartCount();
    const updateItem = useUpdateCartItem();
    const removeItem = useRemoveCartItem();

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return;
        updateItem.mutate({
            cartItemId: item.id || item.cartItemId,
            productId: item.productId,
            productVariantId: item.productVariantId,
            quantity: newQuantity,
        });
    };

    const handleRemove = (item) => {
        removeItem.mutate({
            cartItemId: item.id || item.cartItemId,
            productId: item.productId,
            productVariantId: item.productVariantId,
        });
    };

    const items = cart?.items || [];
    const subtotal = cart?.subtotal || items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
                <Empty description="Your cart is empty" />
                <Link href="/shop">
                    <Button type="primary" size="large" className="h-14 rounded-full px-12 text-lg font-bold">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="flex items-center justify-center gap-3 text-5xl font-bold text-gray-900">
                    Cart
                    <span className="bg-[#226B3E] flex h-8 w-8 items-center justify-center rounded-full text-sm text-white">
                        {cartCount?.count || 0}
                    </span>
                </h1>
                <div className="mt-4 flex flex-col items-center">
                    <span className="text-gray-600">You are eligible for free shipping.</span>
                    <div className="mt-2 h-1 w-64 bg-[#226B3E] rounded-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                {/* Cart Items Table */}
                <div className="lg:col-span-8">
                    <div className="hidden grid-cols-12 pb-4 text-sm font-medium text-gray-500 md:grid">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-3 text-center">Quantity</div>
                        <div className="col-span-3 text-right">Total</div>
                    </div>
                    <div className="divide-y divide-gray-100 border-t border-gray-100">
                        {items.map((item, idx) => (
                            <div key={item.id || idx} className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
                                {/* Product Info */}
                                <div className="col-span-6 flex gap-6">
                                    <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                                        <img
                                            src={item.image || item.productMainImageUrl || '/all/image-placeholder.svg'}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-600">AED {item.price}</p>
                                        {item.variantName && (
                                            <p className="mt-1 text-sm text-gray-500">{item.variantName}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Quantity Mobile/Desktop */}
                                <div className="col-span-3 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1 bg-white">
                                            <Button
                                                type="text"
                                                icon={<MinusOutlined />}
                                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                disabled={item.quantity <= 1 || updateItem.isPending}
                                                className="h-10 w-10 flex items-center justify-center"
                                            />
                                            <span className="w-10 text-center text-lg font-bold">{item.quantity}</span>
                                            <Button
                                                type="text"
                                                icon={<PlusOutlined />}
                                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                disabled={updateItem.isPending}
                                                className="h-10 w-10 flex items-center justify-center"
                                            />
                                        </div>
                                        <button
                                            className="text-gray-400 hover:text-red-500 text-sm font-medium underline underline-offset-4"
                                            onClick={() => handleRemove(item)}
                                            disabled={removeItem.isPending}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Total Price */}
                                <div className="col-span-3 flex items-center justify-end text-xl font-bold text-gray-900">
                                    AED {(item.price * item.quantity).toFixed(0)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="lg:col-span-4">
                    <div className="rounded-3xl bg-[#F8F6F2] p-8 shadow-sm">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-lg text-gray-600">
                                <span>Subtotal</span>
                                <span>AED {subtotal.toFixed(0)}</span>
                            </div>
                            <div className="flex items-center justify-between text-3xl font-bold text-gray-900 border-b border-gray-200 pb-6">
                                <span>Total</span>
                                <span>AED {subtotal.toFixed(0)}</span>
                            </div>

                            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                                Tax included. <Link href="#" className="underline">Shipping</Link> calculated at checkout.
                            </p>

                            {/* Order Note */}
                            <div className="mt-8">
                                <TextArea
                                    placeholder="Order note"
                                    rows={4}
                                    className="rounded-2xl border-gray-200 bg-white p-4 text-base focus:border-green-800 focus:ring-green-800"
                                />
                            </div>

                            {/* Checkout Button */}
                            <div className="mt-8">
                                <Link href="/checkout">
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="w-full h-16 rounded-full bg-[#226B3E] border-none text-xl font-bold hover:opacity-95 flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Checkout
                                    </Button>
                                </Link>
                            </div>

                            {/* Payment Methods */}
                            <div className="mt-8 flex flex-wrap justify-center gap-4 pt-6 border-t border-gray-100">
                                <div className="flex gap-3 grayscale opacity-40 hover:opacity-60 transition-opacity">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-5" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
