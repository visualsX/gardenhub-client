import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-3 shadow-sm">
      {/* Image Placeholder */}
      <div className="mb-4 aspect-square w-full rounded-2xl bg-gray-200"></div>

      {/* Content Placeholder */}
      <div className="px-2">
        {/* Title Line */}
        <div className="mb-3 h-4 w-3/4 rounded bg-gray-200"></div>

        {/* Rating Placeholder */}
        <div className="mb-3 flex items-center gap-1">
          <div className="h-3 w-8 rounded bg-gray-200"></div>
          <div className="h-3 w-3 rounded-full bg-gray-200"></div>
        </div>

        {/* Price and Button Placeholder */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded bg-gray-200"></div>
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
