'use client';

import { Drawer, Empty, Button, Spin } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/hooks/cart/useCart';
import { useCartCount } from '@/hooks/cart/useCart';

export default function CartDrawer({ open, onClose }) {
    const { data: cart, isLoading } = useCart();
    const { data: cartCount } = useCartCount();
    const updateItem = useUpdateCartItem();
    const removeItem = useRemoveCartItem();

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return;
        updateItem.mutate({
            cartItemId: item.id || item.cartItemId, // Handle both guest and auth ID names
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

    return (
        <Drawer
            title={
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">Cart</span>
                    {cartCount?.count > 0 && (
                        <span className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs text-white">
                            {cartCount.count}
                        </span>
                    )}
                </div>
            }
            placement="right"
            onClose={onClose}
            open={open}
            size={450}
            extra={<CloseOutlined onClick={onClose} className="cursor-pointer text-xl" />}
            closable={false}
            styles={{
                header: { borderBottom: 'none', padding: '24px' },
                body: { padding: '0 24px' },
                footer: { padding: '24px' },
            }}
            footer={
                items.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>AED {subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500">Tax included. <Link href="#" className="underline">Shipping</Link> calculated at checkout.</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/cart" onClick={onClose} className="w-full">
                                <Button
                                    size="large"
                                    className="w-full h-14 rounded-full border-[#226B3E] text-[#226B3E] font-bold hover:bg-[#226B3E]/10"
                                >
                                    View cart
                                </Button>
                            </Link>
                            <Link href="/checkout" onClick={onClose} className="w-full">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="w-full h-14 rounded-full bg-[#226B3E] border-none font-bold hover:opacity-90 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Checkout
                                </Button>
                            </Link>
                        </div>
                    </div>
                )
            }
        >
            {isLoading ? (
                <div className="flex h-full items-center justify-center">
                    <Spin size="large" />
                </div>
            ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                    <Empty description="Your cart is empty" />
                    <Button type="primary" className="rounded-full px-8 h-12 flex items-center justify-center" onClick={onClose}>
                        Continue Shopping
                    </Button>
                </div>
            ) : (
                <div className="space-y-6 py-4">
                    <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 font-medium">
                        You are eligible for free shipping.
                    </div>
                    <div className="divide-y divide-gray-100">
                        {items.map((item, idx) => (
                            <div key={item.id || idx} className="flex gap-4 py-6">
                                {/* Product Image */}
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                                    <img
                                        src={item.image || item.productMainImageUrl || '/all/image-placeholder.svg'}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Product Info (Left/Middle) */}
                                <div className="flex flex-1 flex-col justify-center min-w-0">
                                    <h4 className="font-bold text-gray-900 text-base leading-tight truncate-2-lines mb-1">{item.name}</h4>
                                    <p className="font-bold text-[#226B3E] text-base mb-1">AED {item.price}</p>

                                    {/* Variants display */}
                                    {(item.variantName || item.variantsDisplay) && (
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {item.variantName || item.variantsDisplay}
                                        </p>
                                    )}
                                </div>

                                {/* Controls (Right) */}
                                <div className="flex flex-col items-center justify-between gap-2">
                                    <div className="flex items-center justify-center w-12 h-10 border border-gray-100 bg-gray-50/50 rounded-lg text-lg font-medium text-gray-700">
                                        {item.quantity}
                                    </div>
                                    <button
                                        className="text-[#226B3E] hover:text-[#1a5230] text-sm font-semibold underline underline-offset-4 decoration-1 decoration-[#226B3E]/30 transition-all"
                                        onClick={() => handleRemove(item)}
                                        disabled={removeItem.isPending}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Drawer>
    );
}
