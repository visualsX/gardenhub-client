'use client';

import FilterContent from './FilterContent';
import MobileModal from '../MobileModal';

export default function MobileFilterModal({
    isOpen,
    onClose,
    filters,
    filter,
    onFilterChange,
}) {
    return (
        <MobileModal isOpen={isOpen} onClose={onClose} className="max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 p-6 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 pr-2 custom-scrollbar">
                <FilterContent
                    filters={filters}
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
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
        </MobileModal>
    );
}
