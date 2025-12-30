'use client';

import Link from 'next/link';
import useAuth from '@/lib/store/auth';
import UserIcon from '@/public/shared/user.svg';
import BagIcon from '@/public/shared/bag.svg';

export default function AccountsHeader() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
            <div className="max-layout flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary!">
                    GardenHub
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden text-sm text-gray-600 md:block">
                        Welcome, <span className="font-semibold text-gray-900">{user?.name || 'User'}</span>
                    </div>
                    <Link href="/" className="text-sm font-medium text-gray-500! hover:text-primary!">
                        Back to Shop
                    </Link>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <button
                        className={`hover:text-primary cursor-pointer text-gray-700 transition-colors`}
                        aria-label="Shopping Cart"
                    >
                        <BagIcon />
                    </button>
                </div>
            </div>
        </header>
    );
}
