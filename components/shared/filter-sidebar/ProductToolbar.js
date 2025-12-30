'use client';

import { Select } from 'antd';
import InputSearch from '@/components/ui/input-search';

export default function ProductToolbar({
  title = 'Shop All Products',
  totalCount,
  sortBy,
  searchQuery,
  onSortChange,
  onSearch,
  searchPlaceholder = 'Search products...',
}) {
  return (
    <main>
      <section className="mb-4 grid w-full place-items-center gap-y-4">
        <h1 className="text-center text-4xl font-bold text-gray-900">{title}</h1>
        <InputSearch
          placeholder={searchPlaceholder}
          onSearchChange={onSearch}
          defaultValue={searchQuery}
          allowClear
          className="custom-search h-10 max-w-xs rounded-2xl!"
        />
      </section>
      <div className="mb-8 flex flex-col gap-4 border-b border-gray-300 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-20">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm font-medium text-nowrap text-gray-900">
              Items: {totalCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-by" className="text-sm font-medium text-gray-900">
            Sort by:
          </label>
          <Select
            defaultValue="newest"
            value={sortBy}
            onChange={onSortChange}
            style={{ width: 180 }}
            className="custom-select"
            options={[
              { value: 'newest', label: 'Newest' },
              { value: 'name-asc', label: 'Name: A to Z' },
              { value: 'name-desc', label: 'Name: Z to A' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
              { value: 'popular', label: 'Popular' },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
