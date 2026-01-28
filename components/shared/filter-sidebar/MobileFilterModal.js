'use client';

import FilterContent from './FilterContent';
import AnimatedModal from '../../wrappers/animated-modal';

export default function MobileFilterModal({ isOpen, onClose, filters, filter, onFilterChange }) {
  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose} className="flex max-h-[85vh] flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-100 p-6 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
      </div>

      {/* Scrollable Body */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-6 pr-2">
        <FilterContent filters={filters} filter={filter} onFilterChange={onFilterChange} />
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-100 p-6 pt-4">
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-green-700 py-3.5 text-center font-bold text-white shadow-lg transition-colors hover:bg-green-800"
        >
          Apply Filters
        </button>
      </div>
    </AnimatedModal>
  );
}
