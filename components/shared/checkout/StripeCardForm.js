'use client';

import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const elementOptions = {
  style: {
    base: {
      fontSize: '14px',
      color: '#1f2937',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#dc2626',
    },
  },
};

export default function StripeCardForm() {
  const [focused, setFocused] = useState(null); // 'number', 'expiry', 'cvc'

  const getWrapperClass = (field) => {
    const isFocused = focused === field;
    return `px-2 py-2 bg-white border rounded-md transition-all duration-200 ${
      isFocused
        ? 'border-primary ring-2 ring-primary/20 shadow-sm'
        : 'border-gray-200 hover:border-gray-300'
    }`;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="ml-0.5 block text-sm font-medium text-gray-700">Card Number</label>
        <div className={getWrapperClass('number')}>
          <CardNumberElement
            options={elementOptions}
            onFocus={() => setFocused('number')}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="ml-0.5 block text-sm font-medium text-gray-700">Expiry Date</label>
          <div className={getWrapperClass('expiry')}>
            <CardExpiryElement
              options={elementOptions}
              onFocus={() => setFocused('expiry')}
              onBlur={() => setFocused(null)}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="ml-0.5 block text-sm font-medium text-gray-700">CVC</label>
          <div className={getWrapperClass('cvc')}>
            <CardCvcElement
              options={elementOptions}
              onFocus={() => setFocused('cvc')}
              onBlur={() => setFocused(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
