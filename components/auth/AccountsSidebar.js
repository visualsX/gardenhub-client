'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/lib/store/auth';
import { message } from 'antd';

export default function AccountsSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuth((state) => state.logout);

    const navItems = [
        { label: 'Profile', href: '/auth/accounts/profile' },
        { label: 'Settings', href: '/auth/accounts/settings' },
    ];

    const handleLogout = () => {
        logout();
        // Remove cookie
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        message.success('Logged out successfully');
        router.push('/');
    };

    const isActive = (path) => pathname === path || pathname.endsWith(path);
    return (
        <aside className="w-full shrink-0 rounded-2xl border border-gray-200 bg-white py-8 pr-8 md:w-64">
            <nav className="flex flex-col gap-2 px-2">
                <div className="mb-4 px-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Account
                </div>

                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive(item.href)
                            ? 'bg-primary-light! text-primary!'
                            : 'text-gray-600! hover:bg-gray-50 hover:text-gray-900!'
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}

                <div className="my-2 border-t border-gray-100"></div>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                    Sign out
                </button>
            </nav>
        </aside>
    );
}
