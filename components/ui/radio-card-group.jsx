import React from 'react';
import { Radio } from 'antd';

/**
 * A reusable radio group component that renders options as a vertical list of cards
 * with optional expandable content.
 *
 * @param {Object[]} options - Array of option objects { value, content, rightContent, expandableContent }
 * @param {any} value - Currently selected value
 * @param {Function} onChange - Callback when selection changes
 * @param {string} className - Optional container class name
 */
export function RadioCardGroup({ options, value, onChange, className = '' }) {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      className={`flex w-full flex-col divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}
    >
      {options?.map((option) => {
        const isSelected = value === option.value;
        
        return (
          <div key={option.value} className="flex flex-col">
            <Radio
              value={option.value}
              className={`m-0! flex w-full cursor-pointer items-center justify-between p-4! transition-all [&_.ant-radio+*]:w-full ${isSelected ? 'bg-primary-light ring-1 ring-primary z-10' : 'bg-white'}`}
            >
              <div className="flex w-full items-center justify-between">
                <div className="min-w-0 font-medium text-gray-900">{option.content}</div>

                {option.rightContent && (
                  <span className="ml-4 font-bold text-gray-900">{option.rightContent}</span>
                )}
              </div>
            </Radio>
            
            {option.expandableContent && (
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isSelected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 bg-gray-50/50 p-4">
                    {option.expandableContent}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </Radio.Group>
  );
}
