'use client';

export default function QuantitySelector({
    value,
    onIncrement,
    onDecrement,
    updatingType = null,
    compact = false,
    max = 99,
    disabled = false
}) {
    const isUpdating = !!updatingType;

    const Loader = () => (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg transition-all duration-300">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
    );

    // Shared styling constants
    const containerClasses = `flex items-center bg-gray-50/80 rounded-xl p-1 gap-1 shadow-inner relative w-fit`;
    const buttonClasses = `flex items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm transition-all hover:text-primary hover:shadow-md active:scale-95 disabled:opacity-50 relative overflow-hidden border border-gray-100`;

    // Size variants
    const btnSize = compact ? "h-8 w-8" : "h-10 w-10";
    const textSize = compact ? "w-6 text-sm" : "w-10 text-lg";
    const iconSize = compact ? "h-3.5 w-3.5" : "h-5 w-5";

    return (
        <div className={containerClasses}>
            <button
                onClick={() => onDecrement?.()}
                disabled={value <= 1 || isUpdating || disabled}
                className={`${buttonClasses} ${btnSize}`}
                aria-label="Decrease quantity"
            >
                {updatingType === 'dec' ? <Loader /> : (
                    <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                )}
            </button>
            <span className={`${textSize} text-center font-black text-[#425d48] font-outfit`}>
                {value}
            </span>
            <button
                onClick={() => onIncrement?.()}
                disabled={value >= max || isUpdating || disabled}
                className={`${buttonClasses} ${btnSize}`}
                aria-label="Increase quantity"
            >
                {updatingType === 'inc' ? <Loader /> : (
                    <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                )}
            </button>
        </div>
    );
}
