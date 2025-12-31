'use client';

import React from 'react';
import Link from 'next/link';
import { Form, Input, Button, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useLogin } from '@/hooks/useAuthMutations';

export default function LoginPage() {
  const loginMutation = useLogin();

  const onFinish = (values) => {
    loginMutation.mutate(values);
  };

  const handleGoogleLogin = () => {
    const returnUrl = `${window.location.origin}/auth/google/callback`;
    const apiUrl = 'https://api.gardenhub.ae/api';
    window.open(
      `${apiUrl}/Authentication/external-login?provider=Google&returnUrl=${encodeURIComponent(returnUrl)}`,
      '_self'
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-green-100/40 opacity-60 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-green-100/40 opacity-60 blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg space-y-8 rounded-2xl border border-white/50 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="mt-8 space-y-4"
        >
          <Form.Item
            label={<span className="font-medium text-gray-700">Username</span>}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="you@example.com"
              className="rounded-xl border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-200 hover:border-green-500 focus:border-green-500"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-gray-700">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="••••••••"
              className="rounded-xl border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-200 hover:border-green-500 focus:border-green-500"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loginMutation.isPending}
            className="h-12 transform rounded-xl border-none bg-green-700 text-base font-semibold shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800"
          >
            Sign in
          </Button>
        </Form>

        <Divider>Or continue with</Divider>
        <div className="mt-6">
          <Button
            block
            icon={<GoogleOutlined className="text-lg" />}
            onClick={handleGoogleLogin}
            size="large"
            className="h-12 rounded-xl border-gray-200 font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
          >
            Google
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="font-semibold text-green-700 transition-colors hover:text-green-600"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
