'use client';

import Image from 'next/image';

export default function CartItem({ item, compact = false, onRemove, onUpdateQuantity }) {

    // Backend Response Field || Local Store Field
    const name = item.productName || item.name;
    const imageUrl = item.imageUrl || item.image || '/all/image-placeholder.svg';
    const variantLabel = item.variantAttributes || item.variant;
    const addonLabel = item.addonDetails; // Check if backend returns formatted addons string or array, screenshot shows addons: [], so maybe irrelevant for now or managed locally

    // Price Logic
    const unitPrice = item.salePrice > 0 ? item.salePrice : item.price;
    // Backend provides itemTotal, otherwise calculate
    const total = item.itemTotal ? parseFloat(item.itemTotal).toFixed(2) : (unitPrice * item.quantity).toFixed(2);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        if (onUpdateQuantity) {
            onUpdateQuantity(newQuantity);
        }
    };

    const handleRemove = () => {
        if (onRemove) onRemove();
    };

    if (compact) {
        // Compact layout for drawer
        return (
            <div className="flex gap-4 rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100">
                {/* Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{name}</h4>
                        {variantLabel && (
                            <p className="text-xs text-gray-500 mt-1">{variantLabel}</p>
                        )}
                        {addonLabel && (
                            <p className="text-xs text-gray-500 mt-1">+ {addonLabel}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-gray-600 transition-colors hover:bg-primary hover:text-white"
                                aria-label="Decrease quantity"
                            >
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="text-sm font-medium text-gray-900 w-6 text-center">{item.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-gray-600 transition-colors hover:bg-primary hover:text-white"
                                aria-label="Increase quantity"
                            >
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-bold text-primary">AED {total}</span>
                    </div>
                </div>

                {/* Remove Button */}
                <button
                    onClick={handleRemove}
                    className="text-gray-400 transition-colors hover:text-red-500"
                    aria-label="Remove item"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        );
    }

    // Expanded layout for cart page
    return (
        <div className="flex gap-6 rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
            {/* Image */}
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                    {variantLabel && (
                        <p className="text-sm text-gray-500 mt-1">Variant: {variantLabel}</p>
                    )}
                    {addonLabel && (
                        <p className="text-sm text-gray-500 mt-1">Addons: {addonLabel}</p>
                    )}
                    <p className="text-base font-semibold text-primary mt-2">AED {parseFloat(unitPrice).toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleQuantityChange(item.quantity - 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-primary hover:text-white"
                                aria-label="Decrease quantity"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="text-base font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(item.quantity + 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-primary hover:text-white"
                                aria-label="Increase quantity"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={handleRemove}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-red-500"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                    </button>
                </div>
            </div>

            {/* Item Total */}
            <div className="flex flex-col items-end justify-between">
                <span className="text-xs font-medium text-gray-500">Total</span>
                <span className="text-2xl font-bold text-primary">AED {total}</span>
            </div>
        </div>
    );
}
