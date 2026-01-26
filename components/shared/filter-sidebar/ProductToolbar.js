'use client';

import { Select } from 'antd';


export default function ProductToolbar({
  activeFilters,
  availableFilters,
  sortBy,
  onSortChange,
  onRemoveFilter,
  onClearAll,
}) {
  // Helper to find label for a slug
  const getLabel = (slug) => {
    for (const group of availableFilters) {
      const found = group.options.find((opt) => opt.slug === slug);
      if (found) return found.value;
    }
    return slug;
  };

  const hasActiveFilters = activeFilters?.filterSlugs?.length > 0;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Side: Filter Badges */}
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Render Badges for filterSlugs */}
        {activeFilters?.filterSlugs?.map((slug) => (
          <div
            key={slug}
            className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
          >
            <span>{getLabel(slug)}</span>
            <button
              onClick={() => onRemoveFilter(slug)}
              className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={`Remove ${getLabel(slug)} filter`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}

        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-sm font-medium text-gray-500 underline-offset-4 hover:text-gray-900 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Right Side: Sort */}
      <div className="flex items-center gap-3">
        <label htmlFor="sort-by" className="text-sm font-semibold text-gray-500">
          Sort by:
        </label>
        <Select
          id="sort-by"
          defaultValue="newest"
          value={sortBy}
          onChange={onSortChange}
          style={{ width: 160 }}
          variant="borderless"
          className="custom-select font-medium text-gray-900"
          popupClassName="rounded-xl!"
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'name_asc', label: 'Name: A-Z' },
            { value: 'name_desc', label: 'Name: Z-A' },
            { value: 'price_asc', label: 'Price: Low-High' },
            { value: 'price_desc', label: 'Price: High-Low' },
            { value: 'popular', label: 'Popular' },
          ]}
        />
      </div>
    </div>
  );
}
