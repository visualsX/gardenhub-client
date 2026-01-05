'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Radio, Checkbox, Spin, Divider, message } from 'antd';
import { useCart, useClearCart } from '@/hooks/cart/useCart';
import { useCreateGuestCheckout, usePlaceOrder } from '@/hooks/cart/useCheckout';
import useAuth from '@/lib/store/auth';
import useCartStore from '@/lib/store/cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCookie } from '@/lib/utils/cookies';

const { Option } = Select;

export default function CheckoutPage() {
    const router = useRouter();
    const { token, user } = useAuth();
    const { sessionToken, guestEmail, customerId: storeCustomerId } = useCartStore();
    const { data: cart, isLoading: isCartLoading } = useCart();

    const createGuest = useCreateGuestCheckout();
    const placeOrder = usePlaceOrder();
    const { mutateAsync: clearCartApi } = useClearCart();

    const [form] = Form.useForm();
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const items = cart?.items || [];
    const subtotal = cart?.subtotal || 0;
    const shipping = 0;
    const total = subtotal + shipping;

    // Handle form submission
    const onFinish = async (values) => {
        try {
            let currentCustomerId = storeCustomerId;
            let currentToken = token || sessionToken;

            // Step 1: Handle Guest creation if not logged in and (no session OR email changed)
            if (!token && (!sessionToken || values.email !== guestEmail)) {
                const guestData = await createGuest.mutateAsync({
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone
                });
                currentCustomerId = guestData.customerId;
            }

            // Step 2: Prepare Order Data (Matching Swagger screenshot)
            // Step 2: Prepare Address Objects
            const shippingAddress = {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                country: "United Arab Emirates", // Hardcoded as per form default/restriction
                emirate: values.emirate, // Values are now PascalCase from Select
                city: values.city,
                streetAddress: values.address,
                addressLine2: values.apartment || "",
                postalCode: values.postalCode || "00000" // Default simple postal code as it's often optional in UAE
            };

            // Step 3: Prepare Order Data
            const orderPayload = {
                idempotencyKey: crypto.randomUUID(),
                customerId: token ? user?.id : currentCustomerId,
                shippingAddressId: 0,
                billingAddressId: 0,
                shippingAddress: shippingAddress,
                billingAddress: shippingAddress, // Defaulting billing to shipping for now as per commonly checked box
                shippingRateId: 0,
                couponCode: values.couponCode || "",
                paymentToken: "string",
                paymentMethodId: paymentMethod === 'card' ? 1 : 4,
                items: items.map(item => ({
                    productId: parseInt(item.productId),
                    productVariantId: item.productVariantId,
                    quantity: item.quantity,
                    addons: (item.addons || []).map(addon => ({
                        globalAddonOptionId: addon.globalAddonOptionId || 0, // Ensure id is present or map correctly
                        quantity: addon.quantity || 1
                    }))
                }))
            };

            // Step 3: Place Order
            await placeOrder.mutateAsync(orderPayload);

            // Step 4: Clear Cart (API + Local)
            await clearCartApi();

            // Step 5: Success path
            router.push('/order-confirmation');
        } catch (error) {
            console.error('Checkout failed:', error);
        }
    };

    if (isCartLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left Column: Forms */}
                    <div className="flex-1 max-w-2xl w-full border-with-radius p-6">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            requiredMark={false}
                            initialValues={{
                                firstName: user?.firstName || '',
                                lastName: user?.lastName || '',
                                email: user?.email || guestEmail || '',
                                phone: user?.phone || '',
                                country: 'AE',
                            }}
                        >
                            {/* Contact Section */}
                            <section className="mb-12">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Contact</h2>
                                    {!token && (
                                        <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-[#226B3E] underline underline-offset-4">
                                            Sign in
                                        </Link>
                                    )}
                                </div>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                                    className="mb-4"
                                >
                                    <Input
                                        placeholder="Email"
                                        size="small"
                                        className="rounded-lg h-10 border-gray-200 focus:border-[#226B3E] focus:ring-1 focus:ring-[#226B3E]"
                                    />
                                </Form.Item>
                                <Checkbox className="text-gray-600 text-sm font-medium">
                                    Email me with news and offers
                                </Checkbox>
                            </section>

                            {/* Delivery Section */}
                            <section className="mb-12">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery</h2>
                                <Form.Item name="country" label={<span className="text-xs font-bold text-gray-400 uppercase">Country/Region</span>} rules={[{ required: true }]} className="mb-4">
                                    <Select size="small" className="h-10 w-full rounded-lg border-gray-200" defaultValue="AE">
                                        <Option value="AE">United Arab Emirates</Option>
                                        <Option value="SA">Saudi Arabia</Option>
                                    </Select>
                                </Form.Item>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <Form.Item name="firstName" rules={[{ required: false }]} className="mb-0">
                                        <Input placeholder="First name (optional)" size="small" className="rounded-lg h-10 border-gray-200" />
                                    </Form.Item>
                                    <Form.Item name="lastName" rules={[{ required: true, message: 'Last name is required' }]} className="mb-0">
                                        <Input placeholder="Last name" size="small" className="rounded-lg h-10 border-gray-200" />
                                    </Form.Item>
                                </div>

                                <Form.Item name="address" rules={[{ required: true, message: 'Address is required' }]} className="mb-4">
                                    <Input placeholder="Address" size="small" className="rounded-lg h-10 border-gray-200" />
                                </Form.Item>

                                <Form.Item name="apartment" className="mb-4">
                                    <Input placeholder="Apartment, suite, etc. (optional)" size="small" className="rounded-lg h-10 border-gray-200" />
                                </Form.Item>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <Form.Item name="city" rules={[{ required: true, message: 'City is required' }]} className="mb-0">
                                        <Input placeholder="City" size="small" className="rounded-lg h-10 border-gray-200" />
                                    </Form.Item>
                                    <Form.Item name="emirate" rules={[{ required: true, message: 'Emirate is required' }]} className="mb-0">
                                        <Select placeholder="Emirate" size="small" className="h-10 w-full">
                                            <Option value="AbuDhabi">Abu Dhabi</Option>
                                            <Option value="Dubai">Dubai</Option>
                                            <Option value="Sharjah">Sharjah</Option>
                                            <Option value="Ajman">Ajman</Option>
                                            <Option value="UmmAlQuwain">Umm Al Quwain</Option>
                                            <Option value="RasAlKhaimah">Ras Al Khaimah</Option>
                                            <Option value="Fujairah">Fujairah</Option>
                                        </Select>
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true, message: 'Phone is required' }]}
                                    extra={<span className="text-[10px] text-gray-400">Use a saved address? (Login to see saved addresses)</span>}
                                >
                                    <Input placeholder="Phone" size="small" className="rounded-lg h-10 border-gray-200" />
                                </Form.Item>

                                <div className="space-y-3 mt-4">
                                    <Checkbox className="text-gray-600 text-sm font-medium">Save this information for next time</Checkbox>
                                    <Checkbox className="text-gray-600 text-sm font-medium">Text me with news and offers</Checkbox>
                                </div>
                            </section>

                            {/* Shipping Method */}
                            <section className="mb-12">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping method</h2>
                                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 flex items-center justify-between">
                                    <span className="text-gray-500 font-medium">Free Shipping</span>
                                    <span className="font-bold text-gray-900">FREE</span>
                                </div>
                            </section>

                            {/* Payment Section */}
                            <section className="mb-12">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Payment</h2>
                                <p className="text-sm text-gray-400 mb-6">All transactions are secure and encrypted.</p>

                                <Radio.Group
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    value={paymentMethod}
                                    className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
                                >
                                    <div className={`p-6 border-b border-gray-200 transition-all ${paymentMethod === 'card' ? 'bg-[#226B3E]/5 border-l-4 border-l-[#226B3E]' : ''}`}>
                                        <div className="flex items-center justify-between">
                                            <Radio value="card" className="font-bold text-gray-900">Credit card</Radio>
                                            <div className="flex gap-1 h-5 grayscale opacity-70">
                                                <img src="https://cdn-icons-png.flaticon.com/512/196/196070.png" alt="Visa" className="h-full" />
                                                <img src="https://cdn-icons-png.flaticon.com/512/196/196086.png" alt="Mastercard" className="h-full" />
                                            </div>
                                        </div>
                                        {paymentMethod === 'card' && (
                                            <div className="mt-6 space-y-4 animate-in fade-in duration-300">
                                                <Input placeholder="Card number" className="h-10 rounded-lg" />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input placeholder="Expiration date (MM / YY)" className="h-10 rounded-lg" />
                                                    <Input placeholder="Security code" className="h-10 rounded-lg" />
                                                </div>
                                                <Input placeholder="Name on card" className="h-10 rounded-lg" />
                                                <Checkbox defaultChecked className="text-sm text-gray-500">Use shipping address as billing address</Checkbox>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`p-6 transition-all ${paymentMethod === 'cod' ? 'bg-[#226B3E]/5 border-l-4 border-l-[#226B3E]' : ''}`}>
                                        <Radio value="cod" className="font-bold text-gray-900">Cash on Delivery (COD)</Radio>
                                    </div>
                                </Radio.Group>
                            </section>

                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={createGuest.isPending || placeOrder.isPending}
                                className="w-full h-16 rounded-xl bg-[#226B3E] hover:bg-[#1a5230] text-xl font-black border-none mt-4 shadow-lg shadow-[#226B3E]/20"
                            >
                                Pay now
                            </Button>

                            <footer className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-[10px] uppercase font-bold tracking-wider text-gray-400">
                                <Link href="#" className="hover:text-[#226B3E]">Refund policy</Link>
                                <Link href="#" className="hover:text-[#226B3E]">Shipping policy</Link>
                                <Link href="#" className="hover:text-[#226B3E]">Privacy policy</Link>
                                <Link href="#" className="hover:text-[#226B3E]">Terms of service</Link>
                                <Link href="#" className="hover:text-[#226B3E]">Contact</Link>
                            </footer>
                        </Form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-[450px] shrink-0 lg:sticky lg:top-32 h-fit border-with-radius p-6 -mx-4 lg:mx-0">
                        <div className="space-y-8">
                            {/* Cart Items */}
                            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item, idx) => (
                                    <div key={item.id || idx} className="flex gap-4 items-center group">
                                        <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white border border-gray-200 shrink-0 shadow-sm">
                                            <img
                                                src={item.image || item.productMainImageUrl || '/all/image-placeholder.svg'}
                                                alt={item.name}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-[#226B3E] text-white text-[11px] w-6 h-6 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm leading-snug mb-0.5">{item.name}</h4>
                                            {item.variantName && (
                                                <p className="text-xs text-gray-400 font-medium uppercase tracking-tight">{item.variantName}</p>
                                            )}
                                        </div>
                                        <span className="font-bold text-gray-900 whitespace-nowrap text-sm">AED {item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Discount Code */}
                            <div className="flex gap-3">
                                <Input placeholder="Discount code or gift card" className="h-10 rounded-lg border-gray-200 bg-white" />
                                <Button className="h-10 px-8 rounded-lg font-bold bg-gray-100 border-none hover:bg-gray-200 transition-colors">Apply</Button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-4 pt-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal · {items.length} items</span>
                                    <span className="text-gray-900 font-bold">AED {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-gray-500 font-medium">Shipping</span>
                                        <svg className="w-4 h-4 text-gray-300 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-400 text-xs font-medium italic">Enter shipping address</span>
                                </div>

                                <Divider className="my-0 border-gray-200" />

                                <div className="flex justify-between items-end pt-2">
                                    <div>
                                        <span className="text-2xl font-black text-gray-900">Total</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-baseline gap-1.5 justify-end">
                                            <span className="text-xs font-bold text-gray-400 tracking-wider">AED</span>
                                            <span className="text-[32px] font-black text-gray-900 leading-none">{total.toFixed(2)}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-tight">Including AED {(total * 0.05).toFixed(2)} in taxes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
