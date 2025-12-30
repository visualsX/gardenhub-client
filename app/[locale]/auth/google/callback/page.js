'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLogin } from '@/hooks/useAuthMutations';
import { Spin, Button, Card, Typography } from 'antd';
import { ExclamationCircleFilled, SafetyCertificateTwoTone } from '@ant-design/icons';
const { Title, Text } = Typography;

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleLoginMutation = useGoogleLogin();

  const errorParam = searchParams.get('error');
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      if (googleLoginMutation.isIdle) {
        googleLoginMutation.mutate(code);
      }
    }
  }, [code, googleLoginMutation]);

  // Determine if we have an error (either from params or mutation)
  const hasError = errorParam || googleLoginMutation.isError;
  let errorTitle = 'Authentication Failed';
  let errorDescription = errorParam || googleLoginMutation.error?.response?.data?.message || 'We could not sign you in with Google. Please try again.';

  if (errorDescription && decodeURIComponent(errorDescription).includes('LockedOut')) {
    errorTitle = 'Account Permanently Deleted';
    errorDescription = 'This email address is associated with an account that has been permanently deleted. Access is restricted. Please sign up using a different email address.';
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <Card className="border-with-radius w-full max-w-md shadow-xl">
        {hasError ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <ExclamationCircleFilled className="text-3xl text-red-500!" />
            </div>

            <Title level={3} className="mb-2 text-gray-900!">
              {errorTitle}
            </Title>

            <Text className="mb-8 block max-w-xs text-gray-500">
              {errorDescription}
            </Text>

            <Button
              type="primary"
              size="large"
              onClick={() => router.push('/auth/login')}
              className="w-full bg-primary hover:bg-primary-dark h-11"
            >
              Return to Login
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-12">
            <Spin size="large" className="mb-6" />
            <Title level={4} className="text-gray-700! m-0!">
              Verifying credentials...
            </Title>
            <Text className="mt-2 text-gray-400">
              Please wait while we log you in safely
            </Text>
          </div>
        )}
      </Card>

      {!hasError && (
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
          <SafetyCertificateTwoTone twoToneColor="#52c41a" className="text-lg" />
          <span className="text-xs font-medium uppercase tracking-wider">Secure Connection</span>
        </div>
      )}
    </div>
  );
}
