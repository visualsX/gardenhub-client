'use client';

import { useEffect, useState } from 'react';
import Logo from '@/public/logo.svg';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loader visible for 2 seconds

    const cleanupTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2500); // Allow exit animation to finish

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-white transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col items-center">
        {/* Animated Leaf/Plant Icon */}
        <Logo className="animate-pulse" />

        {/* Loading Spinner */}
        <div className="mt-4 flex gap-1">
          <div
            className="bg-primary h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="bg-primary h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="bg-primary h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
