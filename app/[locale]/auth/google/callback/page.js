'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLogin } from '@/hooks/useAuthMutations';
import { Spin, Button } from 'antd';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleLoginMutation = useGoogleLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // Prevent double calling if strict mode or re-renders
      // React Query's mutation can be called multiple times but usually we want to trigger it once.
      // We can check if it's already idle or pending.
      if (googleLoginMutation.isIdle) {
        googleLoginMutation.mutate(code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Depend only on Params to trigger once

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        {googleLoginMutation.isError ? (
          <div className="text-red-600">
            <h3 className="text-lg font-medium">Login Failed</h3>
            <p className="mt-2 text-sm text-gray-500">
              {googleLoginMutation.error?.response?.data?.message || 'Authentication failed'}
            </p>
            <Button type="link" onClick={() => router.push('/login')} className="mt-4">
              Return to Login
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Spin size="large" className="mb-4" />
            <p className="font-medium text-gray-900">Authenticating with Google...</p>
          </div>
        )}
      </div>
    </div>
  );
}
