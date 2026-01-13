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
      className={`flex w-full flex-col divide-y divide-gray-200 overflow-hidden rounded border border-gray-200 ${className}`}
    >
      {options?.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          className={`m-0! flex w-full cursor-pointer items-center justify-between p-2! transition-all [&_.ant-radio+*]:w-full ${value === option.value ? 'bg-primary-light/5' : 'bg-white'} hover:bg-gray-50`}
        >
          <div className="flex justify-between">
            <div className="min-w-0 font-medium text-black">{option.content}</div>

            {option.rightContent && (
              <span className="ml-4 font-bold text-gray-900">{option.rightContent}</span>
            )}
          </div>
        </Radio>
      ))}
    </Radio.Group>
  );
}
