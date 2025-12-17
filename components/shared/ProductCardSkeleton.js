import React from 'react';

export default function ProductCardSkeleton() {
    return (
        <div className="rounded-3xl bg-white p-3 shadow-sm animate-pulse">
            {/* Image Placeholder */}
            <div className="aspect-square w-full rounded-2xl bg-gray-200 mb-4"></div>

            {/* Content Placeholder */}
            <div className="px-2">
                {/* Title Line */}
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-3"></div>

                {/* Rating Placeholder */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="h-3 w-8 bg-gray-200 rounded"></div>
                    <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                </div>

                {/* Price and Button Placeholder */}
                <div className="flex items-center justify-between">
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>
    );
}
