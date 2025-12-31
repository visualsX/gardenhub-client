'use client';

import React from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useRegister } from '@/hooks/useAuthMutations';

export default function RegisterPage() {
  const registerMutation = useRegister();

  const onFinish = (values) => {
    registerMutation.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
  };

  const handleGoogleLogin = () => {
    // We use the real API URL for external login as requested
    const returnUrl = `${window.location.origin}/auth/google/callback`;
    const apiUrl = 'https://api.gardenhub.ae/api'; // Or process.env.NEXT_PUBLIC_API_URL
    window.open(
      `${apiUrl}/Authentication/external-login?provider=Google&returnUrl=${encodeURIComponent(returnUrl)}`,
      '_self'
    );
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href={'/auth/login'} className="font-medium text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="grid grid-cols-2 gap-x-4"
          >
            <Form.Item
              className="mb-0"
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              className="mb-0"
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <div className="col-span-2">
              <Form.Item
                className="mb-0"
                label="Email address"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>
            </div>

            <Form.Item
              className="mb-0"
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item
              className="mb-0"
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
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <div className="col-span-2">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={registerMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                Sign up
              </Button>
            </div>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button block icon={<GoogleOutlined />} onClick={handleGoogleLogin} size="large">
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
