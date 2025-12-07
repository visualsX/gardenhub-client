'use client';
import PlusCircleIcon from '@/public/shared/plus-circle.svg';

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
          className={`text-primary ml-4 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
        >
          <PlusCircleIcon />
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
