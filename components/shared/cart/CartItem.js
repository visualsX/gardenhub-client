'use client';

import { useState } from 'react';
import { CURRENCY } from '@/lib/const/global.variables';
import QuantitySelector from '../QuantitySelector';

export default function CartItem({ item, compact = false, onRemove, onUpdateQuantity }) {
  const [updatingType, setUpdatingType] = useState(null); // 'inc', 'dec', or null

  // Backend Response Field || Local Store Field
  const name = item.productName || item.name;
  const imageUrl = item.imageUrl || item.image || '/all/image-placeholder.svg';
  const variantLabel = item.variantAttributes || item.variant;
  const addonLabel = item.addonDetails; // Check if backend returns formatted addons string or array, screenshot shows addons: [], so maybe irrelevant for now or managed locally

  // Price Logic
  const unitPrice = item.salePrice > 0 ? item.salePrice : item.price;
  // Backend provides itemTotal, otherwise calculate
  const total = item.itemTotal
    ? parseFloat(item.itemTotal).toFixed(2)
    : (unitPrice * item.quantity).toFixed(2);

  const handleQuantityChange = async (newQuantity, type) => {
    if (newQuantity < 1 || updatingType) return;
    if (onUpdateQuantity) {
      setUpdatingType(type);
      try {
        await onUpdateQuantity(newQuantity);
      } finally {
        setUpdatingType(null);
      }
    }
  };

  const handleRemove = () => {
    if (onRemove) onRemove();
  };

  if (compact) {
    // Compact layout for drawer
    return (
      <div className="flex gap-4 rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100 relative">
        {/* Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <h4 className="truncate text-sm font-semibold text-gray-900">{name}</h4>
            {variantLabel && <p className="mt-0.5 truncate text-[10px] sm:text-xs text-gray-500">{variantLabel}</p>}
            {addonLabel && <p className="mt-0.5 truncate text-[10px] sm:text-xs text-gray-500">+ {addonLabel}</p>}
          </div>

          <div className="flex items-center justify-between gap-2">
            {/* Quantity Controls */}
            <QuantitySelector
              compact
              value={item.quantity}
              onIncrement={() => handleQuantityChange(item.quantity + 1, 'inc')}
              onDecrement={() => handleQuantityChange(item.quantity - 1, 'dec')}
              updatingType={updatingType}
            />

            {/* Price */}
            <span className="text-primary text-sm font-bold whitespace-nowrap">AED {total}</span>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 text-gray-400 transition-colors hover:text-red-500"
          aria-label="Remove item"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  // Expanded layout for cart page
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md relative">
      {/* Mobile Remove Button (Icon Only) */}
      <button
        onClick={handleRemove}
        className="sm:hidden absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
        aria-label="Remove item"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-50">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Details Container */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        {/* Top Section: Name and Unit Price */}
        <div className="pr-10 sm:pr-0">
          <p className="text-[#425d48] text-base font-black font-outfit mb-1">
            {CURRENCY} {parseFloat(unitPrice).toFixed(2)}
          </p>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">{name}</h3>
          {(variantLabel || addonLabel) && (
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs font-medium text-gray-400">
              {variantLabel && <span>{variantLabel}</span>}
              {addonLabel && <span className="line-clamp-1">+ {addonLabel}</span>}
            </div>
          )}
        </div>

        {/* Bottom Section: Aligned Actions (Qty, Remove, Total) */}
        <div className="mt-4 sm:mt-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-12">
            {/* Quantity Controls - Common Component */}
            <QuantitySelector
              value={item.quantity}
              onIncrement={() => handleQuantityChange(item.quantity + 1, 'inc')}
              onDecrement={() => handleQuantityChange(item.quantity - 1, 'dec')}
              updatingType={updatingType}
            />

            {/* Remove Button for Desktop */}
            <button
              onClick={handleRemove}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-red-500 p-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span className="font-outfit">Remove</span>
            </button>
          </div>

          {/* Total Price - Perfectly aligned with qty/remove */}
          <div className="text-right">
            <span className="text-primary text-xl sm:text-2xl font-black font-outfit whitespace-nowrap">
              {CURRENCY} {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
