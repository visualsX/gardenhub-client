'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchIcon from '@/public/shared/search.svg';
import UserIcon from '@/public/shared/user.svg';
import BagIcon from '@/public/shared/bag.svg';
import SearchWhiteIcon from '@/public/shared/search-white.svg';
import UserWhiteIcon from '@/public/shared/user-white.svg';
import BagWhiteIcon from '@/public/shared/bag-white.svg';

export default function Header() {
  const pathname = usePathname();
  // Check if homepage (root / or localized root /en, /ar, etc)
  const isHomePage = pathname === '/' || /^\/[a-zA-Z-]{2,5}$/.test(pathname);

  const navItems = [
    { label: 'Indoor Plants', href: '/collections/indoor-plants' },
    { label: 'Outdoor Plants', href: '/collections/outdoor-plants' },
    { label: 'Deals Bundles', href: '/collections/deals-bundles' },
    { label: 'Accessories', href: '/collections/accessories' },
    { label: 'Care Essentials', href: '/collections/care-essentials' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header
      className={
        isHomePage
          ? 'fixed top-4 right-0 left-0 z-50'
          : 'fixed top-0 right-0 left-0 z-50 w-full bg-[#1e3d2a] text-white shadow-md'
      }
    >
      <div className={isHomePage ? 'max-layout' : ''}>
        <nav
          className={
            isHomePage
              ? 'flex items-center justify-between rounded-full bg-white px-6 py-4 shadow-lg'
              : 'max-layout flex items-center justify-between py-5'
          }
        >
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold ${isHomePage ? 'text-gray-900' : 'text-white'}`}
          >
            GardenHub
          </Link>

          {/* Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${isHomePage
                    ? 'hover:text-primary text-gray-700'
                    : 'text-white/90 hover:text-white'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="flex items-center gap-6">
            <button
              className={`hover:text-primary text-gray-700 transition-colors`}
              aria-label="Search"
            >
              {isHomePage ? <SearchIcon /> : <SearchWhiteIcon />}
            </button>
            <Link
              href="/auth/login"
              className={`hover:text-primary text-gray-700 transition-colors`}
              aria-label="Account"
            >
              {isHomePage ? <UserIcon /> : <UserWhiteIcon />}
            </Link>
            <button
              className={`hover:text-primary text-gray-700 transition-colors`}
              aria-label="Shopping Cart"
            >
              {isHomePage ? <BagIcon /> : <BagWhiteIcon />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
