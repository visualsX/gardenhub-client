'use client';

import React from 'react';
import Link from 'next/link';
import { Form, Input, Button, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useLogin, useInitiateGoogleLogin } from '@/hooks/useAuthMutations';

export default function LoginPage() {
    const loginMutation = useLogin();
    const initiateGoogleLoginMutation = useInitiateGoogleLogin();

    const onFinish = (values) => {
        loginMutation.mutate(values);
    };

    const handleGoogleLogin = () => {
        const returnUrl = `${window.location.origin}/auth/google/callback`;
        const apiUrl = "https://api.gardenhub.ae/api";
        window.open(`${apiUrl}/Authentication/external-login?provider=Google&returnUrl=${encodeURIComponent(returnUrl)}`, "_self");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-green-100/40 blur-3xl opacity-60"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-green-100/40 blur-3xl opacity-60"></div>
            </div>

            <div className="w-full max-w-lg space-y-8 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>

                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    className="mt-8 space-y-4"
                >
                    <Form.Item
                        label={<span className="text-gray-700 font-medium">Username</span>}
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                        ]}
                    >
                        <Input
                            placeholder="you@example.com"
                            className="rounded-xl px-4 py-3 bg-gray-50 border-gray-200 hover:border-green-500 focus:border-green-500 transition-all duration-200"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-gray-700 font-medium">Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="••••••••"
                            className="rounded-xl px-4 py-3 bg-gray-50 border-gray-200 hover:border-green-500 focus:border-green-500 transition-all duration-200"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loginMutation.isPending}
                        className="h-12 rounded-xl bg-green-700 hover:bg-green-800 border-none shadow-lg shadow-green-700/20 text-base font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Sign in
                    </Button>
                </Form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        block
                        icon={<GoogleOutlined className="text-lg" />}
                        onClick={handleGoogleLogin}
                        size="large"
                        loading={initiateGoogleLoginMutation.isPending}
                        className="h-12 rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200"
                    >
                        Google
                    </Button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="font-semibold text-green-700 hover:text-green-600 transition-colors">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
