'use client';

import { useEffect } from 'react';
import { App } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export default function OfflineNotice() {
  const { notification } = App.useApp();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOnline = () => {
      // Small delay to ensure the network interface is fully ready
      setTimeout(() => {
        // Re-sync server-side data (homepage, etc)
        router.refresh();

        // Re-sync all client-side data (shop, menu, filters, etc)
        queryClient.invalidateQueries();
      }, 500);

      notification.success({
        title: 'Back Online',
        description: 'Your internet connection has been restored.',
        placement: 'bottomRight',
        duration: 3,
      });
    };

    const handleOffline = () => {
      notification.warning({
        title: 'No Internet Connection',
        description: 'It looks like you are offline. Some features may not work correctly.',
        icon: <WifiOutlined style={{ color: '#faad14' }} />,
        placement: 'bottomRight',
        duration: 0, // Keep until back online
        key: 'offline-notice',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!window.navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null; // This component doesn't render anything visible directly
}
