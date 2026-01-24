'use client';

import { CloseOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import FacebookIcon from '../icons/facebook';
import InstagramIcon from '../icons/instagram';
import XIcon from '../icons/x';
import LinkedInIcon from '../icons/linkedin';

export default function MobileMenu({ isOpen, onClose, menuItems = [], staticLinks = [] }) {
  const pathname = usePathname();
  const [navigationStack, setNavigationStack] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync visibility state with isOpen prop for animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Tiny delay to allow DOM to register the initial state before animating
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 500); // Matches transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset navigation when menu closes or route changes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setNavigationStack([]), 500);
    }
  }, [isOpen, pathname]);

  if (!isVisible) return null;

  const currentItems =
    navigationStack.length === 0 ? menuItems : navigationStack[navigationStack.length - 1].children;

  const currentTitle =
    navigationStack.length === 0 ? null : navigationStack[navigationStack.length - 1].name;

  const handleCategoryClick = (category) => {
    if (category.children && category.children.length > 0) {
      setNavigationStack((prev) => [...prev, category]);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    setNavigationStack((prev) => prev.slice(0, -1));
  };

  return (
    <div
      className={`fixed inset-0 z-99999 flex flex-col items-center justify-end pb-2 transition-all duration-500 ${isAnimating ? 'bg-black/40 backdrop-blur-sm' : 'pointer-events-none bg-transparent'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#2d5f3f] shadow-lg transition-all duration-500 ${isAnimating ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-0 opacity-0'}`}
      >
        <CloseOutlined className="text-xl" />
      </button>

      {/* Menu Card */}
      <div
        className={`relative min-h-[75vh] w-[95%] max-w-[400px] transform overflow-hidden rounded-xl bg-[#f9f8f3] shadow-2xl transition-all duration-500 ease-out sm:min-h-[50vh] sm:max-w-[500px] md:max-w-[800px] ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      >
        <div className="flex h-full flex-col py-4">
          {/* Sliding Content Container */}
          <div
            className="flex flex-1 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${navigationStack.length * 100}%)` }}
          >
            {/* Root Level */}
            <div className="flex w-full shrink-0 flex-col px-8">
              <div className="custom-scrollbar flex-1 overflow-y-auto">
                <div className="flex flex-col gap-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {item.children?.length > 0 ? (
                        <button
                          onClick={() => handleCategoryClick(item)}
                          className="group flex w-full items-center justify-between text-left"
                        >
                          <span className="font-outfit text-lg leading-tight font-black text-[#425d48]">
                            {item.name}
                          </span>
                          <ChevronRight />
                        </button>
                      ) : (
                        <Link
                          href={`/collections/${item.slug}`}
                          onClick={onClose}
                          className="block"
                        >
                          <span className="font-outfit text-lg leading-tight font-black text-[#425d48]">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}

                  {staticLinks.map((link) => (
                    <div key={link.id}>
                      <Link href={link.href} onClick={onClose} className="block">
                        <span className="font-outfit text-lg leading-tight font-black text-[#425d48]">
                          {link.label}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section (only at root level) */}
              <div className="mt-auto pt-6">
                <div className="mb-6">
                  <h4 className="font-outfit mb-4 text-[22px] font-black text-[#425d48]">
                    Growhub Business
                  </h4>
                  <div className="flex items-center gap-6 text-[#2d5f3f]">
                    <FacebookIcon className="text-primary/90! hover:text-primary!" />
                    <InstagramIcon className="text-primary/90! hover:text-primary!" />
                    <XIcon className="text-primary/90! hover:text-primary!" />
                    <LinkedInIcon className="text-primary/90! hover:text-primary!" />
                  </div>
                </div>

                <div className="border-t border-gray-200/60 pt-6">
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="font-outfit text-primary! hover:text-primary! text-base font-bold transition-colors"
                  >
                    Account
                  </Link>
                </div>
              </div>
            </div>

            {/* Sub Levels */}
            {navigationStack.map((stackItem, index) => (
              <div key={index} className="flex w-full shrink-0 flex-col px-8">
                <div
                  onClick={handleBack}
                  className="group mb-6 flex cursor-pointer items-center gap-x-1"
                >
                  <ChevronLeft />
                  <span className="font-outfit text-base font-black tracking-tight text-[#2d5f3f] uppercase transition-transform group-hover:translate-x-1">
                    {stackItem.name}
                  </span>
                </div>

                <div className="custom-scrollbar flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-y-4">
                    {stackItem.children?.map((child) => (
                      <div key={child.id}>
                        {child.children?.length > 0 ? (
                          <button
                            onClick={() => handleCategoryClick(child)}
                            className="group flex w-full items-center justify-between text-left"
                          >
                            <span className="font-outfit text-lg leading-tight font-black text-[#425d48]">
                              {child.name}
                            </span>
                            <ChevronRight />
                          </button>
                        ) : (
                          <Link
                            href={`/collections/${child.slug}`}
                            onClick={onClose}
                            className="block"
                          >
                            <span className="font-outfit text-lg leading-tight font-black text-[#425d48]">
                              {child.name}
                            </span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ChevronRight = () => (
  <div className="flex items-center justify-center rounded-full bg-[#e8e7e1] p-1.5">
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </div>
);

const ChevronLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-500"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
