import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', id, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id || props.name} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id || props.name}
          ref={ref}
          className={`block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
