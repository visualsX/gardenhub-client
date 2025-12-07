'use client';

import { useState } from 'react';

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedHeight, setSelectedHeight] = useState(product.heightOptions[1]); // Default middle option
  const [selectedOrigin, setSelectedOrigin] = useState(product.originOptions[1]);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[1]);

  return (
    <div className="flex flex-col gap-6">
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-900">{product.reviews} Reviews</span>
      </div>

      {/* Title & Price */}
      <div>
        <h1 className="text-5xl font-bold text-gray-900">{product.name}</h1>
        <div className="mt-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
          {product.scientificName}
        </div>
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="text-2xl font-bold text-gray-900">
        {product.currency} {product.price}
      </div>

      {/* Options */}
      <div className="space-y-6">
        {/* Height */}
        <div>
          <label className="mb-2 block font-medium text-gray-900">Height:</label>
          <div className="flex flex-wrap gap-3">
            {product.heightOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedHeight(opt)}
                className={`rounded-lg border px-6 py-3 text-sm font-medium transition-all ${
                  selectedHeight === opt
                    ? 'border-green-800 bg-green-50 text-green-900'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Origin */}
        <div>
          <label className="mb-2 block font-medium text-gray-900">Origin:</label>
          <div className="flex flex-wrap gap-3">
            {product.originOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedOrigin(opt)}
                className={`rounded-lg border px-6 py-3 text-sm font-medium transition-all ${
                  selectedOrigin === opt
                    ? 'border-green-800 bg-green-50 text-green-900'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="mb-2 block font-medium text-gray-900">Color:</label>
          <div className="flex flex-wrap gap-3">
            {product.colorOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(opt)}
                className={`rounded-lg border px-6 py-3 text-sm font-medium transition-all ${
                  selectedColor === opt
                    ? 'border-green-800 bg-green-50 text-green-900'
                    : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div>
        <label className="mb-2 block font-medium text-gray-900">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-xl font-bold text-gray-600 transition-colors hover:bg-gray-300"
            >
              -
            </button>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-white text-xl font-bold text-gray-900 shadow-sm">
              {quantity}
            </div>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-xl font-bold text-gray-600 transition-colors hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button className="w-full rounded-full bg-green-800 py-4 text-lg font-bold text-white transition-colors hover:bg-green-900">
        Add to Cart
      </button>
    </div>
  );
}
