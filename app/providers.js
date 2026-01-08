'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import NextTopLoader from 'nextjs-toploader';
import OfflineNotice from '@/components/shared/OfflineNotice';

// Helper to ensure we only have one QueryClient on the client side
function getQueryClient() {
  const config = {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 3,
      },
    },
  };

  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return new QueryClient(config);
  } else {
    // Browser: make a new query client if we don't already have one
    if (!window.queryClientInstance) {
      window.queryClientInstance = new QueryClient(config);
    }
    return window.queryClientInstance;
  }
}

export default function Providers({ children }) {
  // NOTE: Avoid useState for QueryClient in Next.js app dir
  // as it can lead to issues during hydration/suspense transitions.
  const queryClient = getQueryClient();

  return (
    <AntdRegistry>
      <NextTopLoader
        color="#B0CA87"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        showSpinner={false}
        zIndex={99999}
        showAtBottom={false}
      />
      <QueryClientProvider client={queryClient}>
        <OfflineNotice />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AntdRegistry>
  );
}
