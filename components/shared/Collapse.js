'use client';

import { useState } from 'react';

export default function Collapse({ title, children, defaultOpen = false, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`overflow-hidden transition-all ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
      >
        <span className="font-bold text-gray-900">{title}</span>
        <span
          className={`text-primary ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 12 12" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden px-6">
          <div className="pt-2 leading-relaxed text-gray-600">{children}</div>
        </div>
      </div>
    </div>
  );
}
