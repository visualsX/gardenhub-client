'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import NextTopLoader from 'nextjs-toploader';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AntdRegistry>
      <NextTopLoader
        color="var(--primary-green)"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        showSpinner={false}
      />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AntdRegistry>
  );
}
