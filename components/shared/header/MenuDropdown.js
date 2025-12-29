'use client';

import Link from 'next/link';
import { useMemo } from 'react';

// Recursive Dropdown Item Component
const DropdownItem = ({ item, styles, parentPath }) => {
  const hasChildren = item.children && item.children.length > 0;
  const currentPath = `${parentPath}/${item.slug}`;

  if (!hasChildren) {
    return (
      <Link
        href={currentPath}
        className={`block px-5 py-2.5 text-sm transition-colors ${styles.link}`}
      >
        {item.name}
      </Link>
    );
  }

  // Nested Item with Flyout (Cascader)
  return (
    <div className="group/nested relative">
      <div
        className={`flex cursor-default items-center justify-between px-5 py-2.5 text-sm transition-colors ${styles.link}`}
      >
        {item.name}
        {/* Right Chevron for nested indication */}
        <svg
          className={`h-2.5 w-2.5 opacity-50 transition-transform group-hover/nested:translate-x-0.5 ${styles.iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Nested Flyout Menu */}
      <div className="invisible absolute top-0 left-full z-50 w-56 -translate-x-2 pl-2 opacity-0 transition-all duration-300 ease-out group-hover/nested:visible group-hover/nested:translate-x-0 group-hover/nested:opacity-100">
        {/* Safe bridge */}
        <div className="absolute top-0 -left-2 h-full w-2" />

        <div
          className={`rounded-2xl border py-2 shadow-xl ring-1 ring-black/5 ${styles.container}`}
        >
          {item.children.map((child) => (
            <DropdownItem key={child.id} item={child} styles={styles} parentPath={currentPath} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function MenuDropdown({ category, isHomePage }) {
  // Base path for the root category.
  // Note: Since this root category has children (that's why it's a dropdown),
  // it effectively acts as a grouping and might not have its own product listing page
  // in this nested logic, or at least the logic implies drilling down.
  // However, for the context of "path generation", we start here.
  const rootPath = `/collections/${category.slug}`;

  // Styles based on header variant
  const dropdownStyles = useMemo(() => {
    if (isHomePage) {
      // White Header
      return {
        container: 'bg-white/95 backdrop-blur-md border-gray-200',
        link: 'text-gray-600 hover:text-primary hover:bg-gray-50',
        iconColor: 'text-gray-400',
      };
    } else {
      // Green Header
      return {
        container: 'bg-primary-dark/95 backdrop-blur-md border-white/10',
        link: 'text-white/90 hover:text-white hover:bg-white/10',
        iconColor: 'text-white/50',
      };
    }
  }, [isHomePage]);

  return (
    <div className="group relative flex h-full items-center">
      {/* Top Level Trigger - Disabled Link if it has children (which it does here) */}
      <div
        className={`flex cursor-default items-center gap-1 text-sm font-medium transition-colors ${
          isHomePage ? 'hover:text-primary text-gray-700' : 'text-white/90 hover:text-white'
        }`}
      >
        {category.name}
        <svg
          className={`h-2.5 w-2.5 transition-transform duration-200 group-hover:rotate-180 ${
            isHomePage
              ? 'group-hover:text-primary text-gray-500'
              : 'text-white/70 group-hover:text-white'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      <div className="invisible absolute top-8 left-0 z-50 w-56 origin-top scale-y-95 pt-4 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:scale-y-100 group-hover:opacity-100">
        {/* Safe bridge */}
        <div className="absolute -top-4 left-0 h-4 w-full" />

        <div
          className={`rounded-2xl border py-2 shadow-xl ring-1 ring-black/5 ${dropdownStyles.container}`}
        >
          {category.children.map((child) => (
            <DropdownItem
              key={child.id}
              item={child}
              styles={dropdownStyles}
              parentPath={rootPath}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
