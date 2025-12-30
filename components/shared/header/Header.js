'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchIcon from '@/public/shared/search.svg';
import UserIcon from '@/public/shared/user.svg';
import BagIcon from '@/public/shared/bag.svg';
import SearchWhiteIcon from '@/public/shared/search-white.svg';
import UserWhiteIcon from '@/public/shared/user-white.svg';
import BagWhiteIcon from '@/public/shared/bag-white.svg';
import { useMenu } from '@/hooks/useMenu';

import MenuDropdown from './MenuDropdown';
import SearchOverlay from './SearchOverlay';
import { useState } from 'react';

export default function Header({ initialMenuData }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Check if homepage (root / or localized root /en, /ar, etc)
  const isHomePage = pathname === '/' || /^\/[a-zA-Z-]{2,5}$/.test(pathname);

  // Fetch menu data with initial data for SSR
  const { data: menuItems = [] } = useMenu(initialMenuData);

  const renderMenuItem = (category) => {
    // If category has children, render a dropdown
    if (category.children && category.children.length > 0) {
      // Adding pathname to the key forces the component to remount on route change,
      // which effectively resets the hover state/animation without needing complex state management.
      return (
        <MenuDropdown
          key={`${category.id}-${pathname}`}
          category={category}
          isHomePage={isHomePage}
        />
      );
    }

    // Static link if no children
    return (
      <Link
        key={category.id}
        href={`/collections/${category.slug}`}
        className={`text-sm font-medium transition-colors ${isHomePage ? 'hover:text-primary text-gray-700' : 'text-white/90 hover:text-white'
          }`}
      >
        {category.name}
      </Link>
    );
  };

  const staticLinks = [{ label: 'Contact Us', href: '/contact', id: 'contact' }];

  return (
    <header
      className={
        isHomePage
          ? 'fixed top-4 right-0 left-0 z-50'
          : 'bg-primary-dark fixed top-0 right-0 left-0 z-50 w-full text-white shadow-md'
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
            className={`text-2xl font-bold ${isHomePage ? 'text-gray-900!' : 'text-white!'}`}
          >
            GardenHub
          </Link>

          {/* Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {/* Dynamic Menu Items */}
            {menuItems?.map((category) => (
              <li key={category.id} className="h-full">
                {renderMenuItem(category)}
              </li>
            ))}

            {/* Static Links */}
            {staticLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${isHomePage
                    ? 'hover:text-primary! text-gray-700!'
                    : 'text-white/90! hover:text-white!'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="flex items-center gap-6">
            <button
              className={`hover:text-primary cursor-pointer text-gray-700 transition-colors`}
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
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

      <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
