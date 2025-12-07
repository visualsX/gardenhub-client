'use client';

import { useState } from 'react';
import FilterAccordion from './FilterAccordion';

export default function FilterSidebar() {
  const [inStockOnly, setInStockOnly] = useState(true);

  return (
    <div className="hidden w-64 shrink-0 space-y-6 lg:block">
      <div className="space-y-3">
        {/* In Stock Toggle */}
        <div className="bg-accent-gray flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-sm font-bold text-gray-900">In stock only</span>
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              inStockOnly ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
                inStockOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Filters */}
        <FilterAccordion title="Price">
          <div className="space-y-2 pb-2 text-sm text-gray-600">
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>$0 - $50</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>$50 - $100</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>$100 - $200</span>
            </label>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Care Level">
          <div className="space-y-2 pb-2 text-sm text-gray-600">
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Beginner Friendly</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Requires Attention</span>
            </label>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Benefits">
          <div className="space-y-2 pb-2 text-sm text-gray-600">
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Air Purifying</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Pet Friendly</span>
            </label>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Plant Size">
          <div className="space-y-2 pb-2 text-sm text-gray-600">
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Small</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Medium</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Large</span>
            </label>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Pet Friendliness">
          <div className="space-y-2 pb-2 text-sm text-gray-600">
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Safe for Cats</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Safe for Dogs</span>
            </label>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Color">
          <div className="space-y-2 pb-2 text-sm text-gray-600">
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Green</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Variegated</span>
            </label>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Type">
          <div className="space-y-2 pb-2 text-sm text-gray-600">
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Foliage</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 hover:text-gray-900">
              <input
                type="checkbox"
                className="focus:ring-primary text-primary rounded border-gray-300"
              />
              <span>Succulent</span>
            </label>
          </div>
        </FilterAccordion>
      </div>
    </div>
  );
}
