'use client';

import Link from 'next/link';
import useAuth from '@/lib/store/auth';

export default function AccountsHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="max-layout flex items-center justify-between px-6 py-4">
        <div className="flex items-baseline gap-x-10">
          {/* Logo */}
          <Link href="/" className="text-primary! text-2xl font-bold">
            GardenHub
          </Link>
          <Link href="#" className="text-primary! text-lg font-medium">
            Orders
          </Link>
          <Link href="/shop" className="text-primary! text-lg font-medium">
            Shop
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden text-sm text-gray-600 md:block">
            Welcome, <span className="font-semibold text-gray-900">{user?.name || 'User'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
