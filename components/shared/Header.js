'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchIcon from '@/public/shared/search.svg';
import UserIcon from '@/public/shared/user.svg';
import BagIcon from '@/public/shared/bag.svg';
export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Indoor Plants', href: '/indoor-plants' },
    { label: 'Outdoor Plants', href: '/outdoor-plants' },
    { label: 'Deals Bundles', href: '/deals' },
    { label: 'Accessories', href: '/accessories' },
    { label: 'Care Essentials', href: '/care' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="fixed top-4 right-0 left-0 z-50">
      <div className="max-layout">
        <nav className="flex items-center justify-between rounded-full bg-white px-6 py-4 shadow-lg">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            GardenHub
          </Link>

          {/* Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-primary text-sm text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button
              className="hover:text-primary text-gray-700 transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <button
              className="hover:text-primary text-gray-700 transition-colors"
              aria-label="Account"
            >
              <UserIcon />
            </button>
            <button
              className="hover:text-primary text-gray-700 transition-colors"
              aria-label="Shopping Cart"
            >
              <BagIcon />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
