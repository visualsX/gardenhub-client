'use client';

import { useState } from 'react';
import { Checkbox, Switch } from 'antd';
import FilterAccordion from '../../pages/category/FilterAccordion';
import PriceFilter from './PriceFilter';

export default function FilterSidebar({ filters = [], filter, onFilterChange }) {
  const { inStockOnly = true, featuredOnly = false, onSaleOnly = false, filterSlugs = [] } = filter || {};

  const handleInStockChange = (checked) => {
    onFilterChange?.({ inStockOnly: checked });
  };

  const handleFeaturedChange = (checked) => {
    onFilterChange?.({ featuredOnly: checked });
  };

  const handleOnSaleChange = (checked) => {
    onFilterChange?.({ onSaleOnly: checked });
  };

  const handlePriceChange = (range) => {
    onFilterChange?.({ minPrice: range[0], maxPrice: range[1] });
  };

  const handleCheckboxChange = (slug, checked) => {
    const newSlugs = checked
      ? [...filterSlugs, slug]
      : filterSlugs.filter((s) => s !== slug);
    onFilterChange?.({ filterSlugs: newSlugs });
  };

  return (
    <div className="hidden w-64 shrink-0 space-y-6 lg:block">
      <div className="space-y-3">
        <div className="bg-accent-gray flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-sm font-bold text-gray-900">In stock only</span>
          <Switch
            checked={inStockOnly}
            onChange={handleInStockChange}
            className="custom-switch"
          />
        </div>

        {/* Featured Toggle */}
        <div className="bg-accent-gray flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-sm font-bold text-gray-900">Featured</span>
          <Switch
            checked={featuredOnly}
            onChange={handleFeaturedChange}
            className="custom-switch"
          />
        </div>

        {/* On Sale Toggle */}
        <div className="bg-accent-gray flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-sm font-bold text-gray-900">On Sale</span>
          <Switch
            checked={onSaleOnly}
            onChange={handleOnSaleChange}
            className="custom-switch"
          />
        </div>

        {/* Price Filter */}
        <FilterAccordion title="Price" defaultOpen={true}>
          <PriceFilter
            onChange={handlePriceChange}
            min={0}
            max={5000}
            initialRange={[filter?.minPrice || 0, filter?.maxPrice || 5000]}
          />
        </FilterAccordion>

        {/* Dynamic Filters */}
        {filters.map((filter) => (
          <FilterAccordion key={filter.name} title={filter.name}>
            <div className="space-y-2 pb-2">
              {filter.options.map((option) => (
                <div key={option.slug} className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900">
                  <Checkbox
                    className="custom-checkbox"
                    checked={filterSlugs.includes(option.slug)}
                    onChange={(e) => handleCheckboxChange(option.slug, e.target.checked)}
                  >
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
