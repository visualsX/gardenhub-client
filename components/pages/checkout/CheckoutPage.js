'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Select, Radio, message } from 'antd';
import useCartStore from '@/lib/store/cart';

const { Option } = Select;

// Dummy data
const EMIRATES = [
    'Abu Dhabi',
    'Dubai',
    'Sharjah',
    'Ajman',
    'Umm Al Quwain',
    'Ras Al Khaimah',
    'Fujairah',
];

const PAYMENT_METHODS = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
    { id: 'wallet', name: 'Digital Wallet', icon: '📱' },
];

export default function CheckoutPage() {
    const router = useRouter();
    const [form] = Form.useForm();
    const { items, getCartTotal, clearCart } = useCartStore();
    const totals = getCartTotal();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect if cart is empty
    if (items.length === 0) {
        router.push('/cart');
        return null;
    }

    const handlePlaceOrder = async (values) => {
        setIsProcessing(true);

        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        message.success('Order placed successfully!');
        clearCart();
        setIsProcessing(false);

        // Redirect to success page or home
        router.push('/');
    };

    return (
        <div className="max-layout min-h-screen pt-32 pb-16">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
                <p className="text-gray-600">Complete your order</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handlePlaceOrder}
                        initialValues={{
                            firstName: 'Ahmed',
                            lastName: 'Al Mansoori',
                            email: 'ahmed.almansoori@example.com',
                            phone: '+971 50 123 4567',
                            address: 'Sheikh Zayed Road, Building 123',
                            city: 'Dubai',
                            emirate: 'Dubai',
                            postalCode: '00000',
                        }}
                    >
                        {/* Shipping Information */}
                        <div className="border-with-radius p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please enter your first name' }]}
                                >
                                    <Input size="large" placeholder="Ahmed" />
                                </Form.Item>

                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please enter your last name' }]}
                                >
                                    <Input size="large" placeholder="Al Mansoori" />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Please enter a valid email' },
                                ]}
                            >
                                <Input size="large" placeholder="ahmed@example.com" />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input size="large" placeholder="+971 50 123 4567" />
                            </Form.Item>

                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please enter your address' }]}
                            >
                                <Input.TextArea size="large" rows={3} placeholder="Street address, building, apartment" />
                            </Form.Item>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <Form.Item
                                    label="City"
                                    name="city"
                                    rules={[{ required: true, message: 'Please enter your city' }]}
                                >
                                    <Input size="large" placeholder="Dubai" />
                                </Form.Item>

                                <Form.Item
                                    label="Emirate"
                                    name="emirate"
                                    rules={[{ required: true, message: 'Please select your emirate' }]}
                                >
                                    <Select size="large" placeholder="Select emirate">
                                        {EMIRATES.map((emirate) => (
                                            <Option key={emirate} value={emirate}>
                                                {emirate}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Postal Code"
                                    name="postalCode"
                                    rules={[{ required: true, message: 'Please enter postal code' }]}
                                >
                                    <Input size="large" placeholder="00000" />
                                </Form.Item>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="border-with-radius p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                            <Radio.Group
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full"
                            >
                                <div className="space-y-3">
                                    {PAYMENT_METHODS.map((method) => (
                                        <Radio key={method.id} value={method.id} className="w-full">
                                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-all hover:border-primary hover:bg-primary-light">
                                                <span className="text-2xl">{method.icon}</span>
                                                <span className="font-medium text-gray-900">{method.name}</span>
                                            </div>
                                        </Radio>
                                    ))}
                                </div>
                            </Radio.Group>

                            {paymentMethod === 'card' && (
                                <div className="mt-6 space-y-4">
                                    <Form.Item label="Card Number" name="cardNumber">
                                        <Input size="large" placeholder="1234 5678 9012 3456" />
                                    </Form.Item>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Form.Item label="Expiry Date" name="expiryDate">
                                            <Input size="large" placeholder="MM/YY" />
                                        </Form.Item>

                                        <Form.Item label="CVV" name="cvv">
                                            <Input size="large" placeholder="123" />
                                        </Form.Item>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Place Order Button - Mobile */}
                        <div className="lg:hidden">
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full rounded-full bg-primary py-4 font-bold text-white transition-all hover:bg-primary-dark hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : `Place Order - AED ${totals.total}`}
                            </button>
                        </div>
                    </Form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 space-y-6">
                        {/* Order Summary */}
                        <div className="border-with-radius p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                            {/* Cart Items */}
                            <div className="py-4 max-h-64 space-y-3 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.variantId || 'default'}`} className="flex gap-3">
                                        <div className="relative h-16 w-16 rounded-xl">
                                            <img
                                                src={item.image || '/all/image-placeholder.svg'}
                                                alt={item.name}
                                                className="h-full w-full object-cover rounded-xl"
                                            />
                                            <span className="absolute -top-2 -right-1 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-gray-500">{item.variant}</p>
                                            <p className="text-sm font-bold text-primary mt-1">
                                                AED {((item.salePrice > 0 ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Subtotal</span>
                                    <span className="text-sm font-semibold text-gray-900">AED {totals.subtotal}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Shipping</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {parseFloat(totals.shipping) === 0 ? 'FREE' : `AED ${totals.shipping}`}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Tax (5%)</span>
                                    <span className="text-sm font-semibold text-gray-900">AED {totals.tax}</span>
                                </div>

                                <div className="flex items-center justify-between border-t-2 border-gray-200 pt-3">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-primary">AED {totals.total}</span>
                                </div>
                            </div>
                        </div>

                        {/* Place Order Button - Desktop */}
                        <div className="hidden lg:block">
                            <button
                                onClick={() => form.submit()}
                                disabled={isProcessing}
                                className="w-full rounded-full bg-primary py-4 font-bold text-white transition-all hover:bg-primary-dark hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : `Place Order - AED ${totals.total}`}
                            </button>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
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
