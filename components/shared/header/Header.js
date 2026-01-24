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
import useAuth from '@/lib/store/auth';
import useCartStore from '@/lib/store/cart';
import CartDrawer from '@/components/shared/cart/CartDrawer';
import { useCartCount } from '@/hooks/cart/useCart';
// import CartTestButton from '@/components/shared/cart/CartTestButton';

import MenuDropdown from './MenuDropdown';
import SearchOverlay from './SearchOverlay';
import MobileMenu from './MobileMenu';
import { useState, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';

export default function Header({ initialMenuData }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { openDrawer } = useCartStore();
  const { data: cartCountData } = useCartCount();

  // Only get cart count after mount to avoid hydration mismatch
  const cartItemCount = isMounted ? cartCountData?.count || 0 : 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);
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
        className={`text-sm! font-medium! transition-colors ${isHomePage ? 'hover:text-primary! text-gray-700!' : 'text-white/90! hover:text-white!'
          }`}
      >
        {category.name}
      </Link>
    );
  };

  const staticLinks = [
    { label: 'Bundles', href: '/bundles', id: 'bundles' },
    { label: 'Contact Us', href: '/contact', id: 'contact' },
  ];

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
          <ul className="hidden items-center gap-8 lg:flex">
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
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className={`hover:text-primary cursor-pointer transition-colors lg:hidden ${isHomePage ? 'text-gray-700!' : 'text-white!'
                }`}
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuOutlined className="text-xl!" />
            </button>

            <button
              className={`hover:text-primary cursor-pointer text-gray-700 transition-colors`}
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              {isHomePage ? <SearchIcon /> : <SearchWhiteIcon />}
            </button>
            <Link
              href={
                isMounted && useAuth.getState().token ? '/auth/accounts/profile' : '/auth/login'
              }
              className={`hover:text-primary hidden text-gray-700 transition-colors md:block`}
              aria-label="Account"
            >
              {isHomePage ? <UserIcon /> : <UserWhiteIcon />}
            </Link>
            <button
              onClick={openDrawer}
              className={`hover:text-primary relative text-gray-700 transition-colors`}
              aria-label="Shopping Cart"
            >
              {isHomePage ? <BagIcon /> : <BagWhiteIcon />}
              {cartItemCount > 0 && (
                <span className="bg-primary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
        staticLinks={staticLinks}
      />
      <CartDrawer />
      {/* <CartTestButton /> */}
    </header>
  );
}
