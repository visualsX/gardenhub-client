'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ExternalLoginProxy() {
    const searchParams = useSearchParams();
    const provider = searchParams.get('provider');
    const returnUrl = searchParams.get('returnUrl');

    useEffect(() => {
        // This page mocks the "Go to Google" step.
        // Instead of actually going to Google, we just verify the params and redirect back to the `returnUrl` (our callback page)
        // with a mock 'code'.

        if (returnUrl) {
            // Simulate network delay
            const timer = setTimeout(() => {
                const mockCode = `mock_code_${Math.random().toString(36).substring(7)}`;
                const separator = returnUrl.includes('?') ? '&' : '?';
                window.location.href = `${returnUrl}${separator}code=${mockCode}`;
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [returnUrl]);

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">Redirecting to {provider}...</h2>
            <p className="text-gray-500 mt-2">Simulating External Provider Login</p>
        </div>
    );
}
