'use client';

import { useRouter } from '@/i18n/navigation';
import { Button, Input, Form, message, Result } from 'antd';
import { useCanConvertGuest, useConvertGuest } from '@/hooks/useGuestCheckout';
import { getCookie, eraseCookie } from '@/lib/utils/cookie';
import { Box } from '@/components/wrappers/box';

export default function OrderConfirmationPage() {
    const router = useRouter();
    const guestToken = getCookie('guest_token')

    const { data: canConvertData, isLoading: isCheckingConvert } = useCanConvertGuest();
    const { mutateAsync: convertGuest, isPending: isConverting } = useConvertGuest();

    const handleConvert = async (values) => {
        await convertGuest({
            guestToken: guestToken,
            password: values.password
        });
        // Redirect logic could be here or in onSuccess, but router is available here conveniently.
        // Since onSuccess in hook clears cookies/shows message, here we just navigate.

        // setCanConvert(false); // User commented this out
        router.push('/auth/login');
    };

    return (
        <div className="max-layout min-h-screen pt-32 pb-16">
            <div className="max-w-2xl mx-auto">
                <Box padding="p-8">
                    <Result
                        status="success"
                        title="Order Placed Successfully!"
                        subTitle="Thank you for your purchase. We have received your order."
                        extra={[
                            <Button type="primary" key="shop" onClick={() => router.push('/shop')}>
                                Continue Shopping
                            </Button>
                        ]}
                    />

                    {/* Guest Conversion Section */}
                    {guestToken && !isCheckingConvert && canConvertData?.canConvert && (
                        <div className="grid place-items-center w-full mt-8 border-t border-gray-100 pt-8">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Create an Account</h3>
                                <p className="text-gray-500">
                                    Save your details for faster checkout next time and track your order.
                                </p>
                            </div>

                            <Form
                                layout="vertical"
                                onFinish={handleConvert}
                                className="min-w-[340px] sm:min-w-[400px]"
                                requiredMark={false}
                            >
                                <Form.Item
                                    label="Create Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please enter a password' },
                                        { min: 6, message: 'Password must be at least 6 characters' }
                                    ]}
                                >
                                    <Input.Password placeholder="Enter password" />
                                </Form.Item>

                                <Button
                                    type="default"
                                    htmlType="submit"
                                    loading={isConverting}
                                    block
                                    className="h-10 font-medium"
                                >
                                    Create Account
                                </Button>
                            </Form>
                        </div>
                    )}
                </Box>
            </div>
        </div>
    );
}
