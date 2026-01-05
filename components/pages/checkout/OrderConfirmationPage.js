'use client';

import { useState } from 'react';
import { Button, Input, message, Divider } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useConvertGuest } from '@/hooks/cart/useCheckout';
import useCartStore from '@/lib/store/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrderConfirmationPage() {
    const router = useRouter();
    const { sessionToken, clearCart } = useCartStore();
    const [password, setPassword] = useState('');
    const convertGuest = useConvertGuest();

    const handleConvert = async () => {
        if (!password) {
            return message.error('Please enter a password');
        }
        try {
            await convertGuest.mutateAsync({
                guestToken: sessionToken,
                password
            });
            clearCart();
            // Redirect to login or success
            message.success('Account created successfully! Please log in.');
            router.push('/login');
        } catch (error) {
            // Error handled by mutation
        }
    };

    const handleContinueShopping = () => {
        clearCart();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-6 sm:p-12">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-12 text-center border border-gray-100">
                <div className="mb-8">
                    <CheckCircleFilled className="text-8xl text-[#226B3E]" />
                </div>

                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Order complete!</h1>
                <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-md mx-auto">
                    Your order was placed successfully. A copy of your receipt was sent to your email.
                </p>

                <div className="bg-gray-50 rounded-2xl p-8 mb-12 text-left border border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Confirmation</h3>
                        <p className="text-2xl font-black text-gray-900">#GH-ORDER-SUCCESS</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Status</h3>
                        <span className="px-3 py-1 bg-[#226B3E]/10 text-[#226B3E] rounded-full text-xs font-bold">Confirmed</span>
                    </div>
                </div>

                {sessionToken && (
                    <div className="bg-[#226B3E]/5 rounded-3xl p-10 border border-[#226B3E]/20 text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#226B3E]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Create an account</h2>
                        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                            Save your details for your next purchase. You'll be able to track orders and checkout faster.
                        </p>
                        <div className="space-y-4">
                            <Input.Password
                                placeholder="Create your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-16 rounded-xl border-gray-200 text-lg shadow-sm"
                            />
                            <Button
                                type="primary"
                                size="large"
                                loading={convertGuest.isPending}
                                onClick={handleConvert}
                                className="w-full h-16 rounded-xl bg-[#226B3E] hover:bg-[#1a5230] text-lg font-black border-none shadow-lg shadow-[#226B3E]/20"
                            >
                                Save details
                            </Button>
                        </div>
                    </div>
                )}

                <div className="mt-12 flex flex-col items-center gap-6">
                    <Button
                        onClick={handleContinueShopping}
                        className="h-14 px-12 rounded-xl text-gray-900 font-black border-gray-200 hover:border-[#226B3E] hover:text-[#226B3E] transition-all"
                    >
                        Continue shopping
                    </Button>

                    <Link href="/track-order" className="text-sm font-bold text-gray-400 hover:text-[#226B3E] transition-colors">
                        Need help? Contact support
                    </Link>
                </div>
            </div>
        </div>
    );
}
