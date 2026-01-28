'use client';

import FilterContent from './FilterContent';

export default function FilterSidebar({ filters = [], filter, onFilterChange }) {
  return (
    <div className="sticky top-28 hidden h-[calc(100vh-8rem)] w-64 shrink-0 overflow-y-auto pb-4 lg:block">
      <div className="mb-6 flex items-center gap-2 text-gray-900">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
        <span className="text-base font-semibold">Filters</span>
      </div>

      <FilterContent filters={filters} filter={filter} onFilterChange={onFilterChange} />
    </div>
  );
}
