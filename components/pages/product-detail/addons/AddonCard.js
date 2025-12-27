'use client';

import Image from 'next/image';

export default function AddonCard({
    option,
    addonGroup,
    isSelected,
    onSelect,
    onExpand
}) {
    const discountPercent =
        option.salePrice > 0 && option.price > option.salePrice
            ? Math.round(((option.price - option.salePrice) / option.price) * 100)
            : 0;

    return (
        <div
            onClick={() => onSelect(addonGroup.productAddonAssignmentId, option)}
            className={`relative min-w-[180px] cursor-pointer rounded-2xl border-2 p-2 transition-all ${isSelected
                ? 'border-green-700 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
        >
            {/* Discount Badge */}
            {discountPercent > 0 && (
                <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    Save {discountPercent}%
                </div>
            )}

            {/* Expand Icon */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onExpand(option, addonGroup);
                }}
                className="absolute left-4 top-4 z-10 rounded-2xl bg-white p-1 shadow hover:bg-gray-100 transition-colors"
            >
                <svg
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                </svg>
            </button>

            {/* Image */}
            <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gray-100">
                {option.imageUrl ? (
                    <Image
                        src={option.imageUrl}
                        alt={option.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Name */}
            <h4 className="mb-2 text-center text-sm font-medium text-gray-900">
                {option.name}
            </h4>

            {/* Price */}
            <div className="flex items-center justify-center gap-2">
                {option.salePrice > 0 && option.salePrice < option.price ? (
                    <>
                        <span className="font-bold text-red-600">
                            +AED {option.salePrice}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                            AED {option.price}
                        </span>
                    </>
                ) : option.price > 0 ? (
                    <span className="font-bold text-gray-900">+AED {option.price}</span>
                ) : (
                    <span className="font-bold text-gray-900">+AED 0</span>
                )}
            </div>

            {/* Rating (if available) */}
            {option.rating && (
                <div className="mt-2 flex items-center justify-center gap-1 text-xs">
                    <span className="font-medium">{option.rating}</span>
                    <span className="text-yellow-500">★</span>
                </div>
            )}
        </div>
    );
}
