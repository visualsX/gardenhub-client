"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <AntdRegistry>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AntdRegistry>
    )
}
