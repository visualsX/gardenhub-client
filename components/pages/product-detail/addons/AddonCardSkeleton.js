'use client';

export default function AddonCardSkeleton() {
    return (
        <div className="relative min-w-[180px] animate-pulse rounded-2xl border-2 border-gray-200 p-2">
            {/* Image Placeholder */}
            <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gray-200"></div>

            {/* Name Placeholder */}
            <div className="mx-auto mb-2 h-4 w-2/3 rounded bg-gray-200"></div>

            {/* Price Placeholder */}
            <div className="mx-auto h-5 w-1/3 rounded bg-gray-200"></div>
        </div>
    );
}
