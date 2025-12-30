'use client';

import { useEffect, useState } from 'react';
import { Button, Result, Typography } from 'antd';
import { HomeOutlined, RedoOutlined, WifiOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Paragraph, Text } = Typography;

export default function Error({ error, reset }) {
  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial status
    if (typeof window !== 'undefined') {
      setIsOffline(!window.navigator.onLine);

      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled Client Exception:', error);
  }, [error]);

  const handleRetry = () => {
    // For network errors, a full reload is often more reliable than reset()
    // as it ensures all chunks and assets are re-fetched.
    if (typeof window !== 'undefined') {
      window.location.reload();
    } else {
      reset();
    }
  };

  const handleHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 pt-32">
      <Result
        status={isOffline ? 'warning' : 'error'}
        icon={
          isOffline ? <WifiOutlined className="text-gray-400" style={{ fontSize: '64px' }} /> : null
        }
        title={isOffline ? "You're Offline" : 'Something went wrong!'}
        subTitle={
          isOffline
            ? 'It looks like your internet connection was lost. Please check your network and try again.'
            : "An unexpected error occurred while processing your request. We've been notified and are looking into it."
        }
        extra={[
          <Button
            key="retry"
            type="primary"
            icon={<RedoOutlined />}
            onClick={handleRetry}
            size="large"
            className="rounded-full"
          >
            Try Again
          </Button>,
          <Button
            key="home"
            icon={<HomeOutlined />}
            onClick={handleHome}
            size="large"
            className="rounded-full"
          >
            Back to Home
          </Button>,
        ]}
      >
        {!isOffline && (
          <div className="mt-8 rounded-lg bg-gray-100 p-4 text-left">
            <Paragraph>
              <Text strong className="mb-2 block text-red-600">
                Error Details:
              </Text>
              <Text code className="text-xs break-all">
                {error?.message || 'Unknown application error'}
              </Text>
            </Paragraph>
          </div>
        )}
      </Result>
    </div>
  );
}
