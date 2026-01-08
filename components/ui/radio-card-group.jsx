import React from 'react';
import { Radio } from 'antd';

/**
 * A reusable radio group component that renders options as a vertical list of cards.
 * 
 * @param {Object[]} options - Array of option objects { value, content, rightContent }
 * @param {any} value - Currently selected value
 * @param {Function} onChange - Callback when selection changes
 * @param {string} className - Optional container class name
 */
export function RadioCardGroup({ options, value, onChange, className = '' }) {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      className={`w-full flex flex-col rounded border border-gray-200 divide-y divide-gray-200 overflow-hidden ${className}`}
    >
      {options?.map(option => (
        <Radio
          key={option.value}
          value={option.value}
          className={`w-full m-0! p-2! flex items-center justify-between cursor-pointer transition-all [&_.ant-radio+*]:w-full
            ${value === option.value ? 'bg-primary-light/5' : 'bg-white'}
            hover:bg-gray-50`}
        >
          <div className="flex  justify-between">
            <div className="font-medium text-black min-w-0">
              {option.content}
            </div>

            {option.rightContent && (
              <span className="font-bold text-gray-900 ml-4">
                {option.rightContent}
              </span>
            )}
          </div>
        </Radio>
      ))}
    </Radio.Group>
  );
}