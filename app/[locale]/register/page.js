'use client';

import React from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useRegister, useInitiateGoogleLogin } from '@/hooks/useAuthMutations';

export default function RegisterPage() {
    const registerMutation = useRegister();
    const initiateGoogleLoginMutation = useInitiateGoogleLogin();

    const onFinish = (values) => {
        registerMutation.mutate({
            name: values.name,
            email: values.email,
            password: values.password
        });
    };

    const handleGoogleLogin = () => {
        const returnUrl = window.location.origin;
        console.log("urls: ", returnUrl)
        initiateGoogleLoginMutation.mutate({ returnUrl });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        size="large"
                    >
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="John Doe" />
                        </Form.Item>

                        <Form.Item
                            label="Email address"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input placeholder="you@example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={registerMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                block
                                icon={<GoogleOutlined />}
                                onClick={handleGoogleLogin}
                                size="large"
                                loading={initiateGoogleLoginMutation.isPending}
                            >
                                Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
