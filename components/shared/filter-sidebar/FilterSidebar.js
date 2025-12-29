'use client';

import { useState } from 'react';
import { Checkbox } from 'antd';
import FilterAccordion from '../../pages/category/FilterAccordion';
import PriceFilter from './PriceFilter';

export default function FilterSidebar({ filters = [] }) {
  const [inStockOnly, setInStockOnly] = useState(true);

  return (
    <div className="hidden w-64 shrink-0 space-y-6 lg:block">
      <div className="space-y-3">
        {/* In Stock Toggle */}
        <div className="bg-accent-gray flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-sm font-bold text-gray-900">In stock only</span>
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${inStockOnly ? 'bg-gray-900' : 'bg-gray-300'
              }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${inStockOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
          </button>
        </div>

        {/* Price Filter */}
        <FilterAccordion title="Price" defaultOpen={true}>
          <PriceFilter />
        </FilterAccordion>

        {/* Dynamic Filters */}
        {filters.map((filter) => (
          <FilterAccordion key={filter.name} title={filter.name}>
            <div className="space-y-2 pb-2">
              {filter.options.map((option) => (
                <div key={option.slug} className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900">
                  <Checkbox className="custom-checkbox">
                    {option.value}
                  </Checkbox>
                  <span className="text-gray-400 text-xs">({option.productCount})</span>
                </div>
              ))}
            </div>
          </FilterAccordion>
        ))}
      </div>
    </div>
  );
}
