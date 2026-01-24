import { memo } from 'react';
import Link from 'next/link';

function BundleCard({ bundle }) {
  const { name, mainImageUrl, slug, price, originalPrice, savingsAmount } = bundle;

  const isOnSale = originalPrice > price;

  return (
    <div className="group relative flex h-full flex-col rounded-3xl bg-white p-3 transition-shadow hover:shadow-xl">
      <Link
        href={`/bundles/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${name}`}
      />

      {/* Bundle Image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        {isOnSale && (
          <div className="absolute top-3 right-3 z-20 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
            Save AED {savingsAmount}
          </div>
        )}
        <img
          src={mainImageUrl || '/all/image-placeholder.svg'}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Bundle Info */}
      <div className="mt-4 flex grow flex-col px-2">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">{name}</h3>

        {/* Price and Action */}
        <div className="relative z-20 mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {isOnSale && (
              <span className="text-xs text-gray-400 line-through">AED {originalPrice}</span>
            )}
            <span className="text-base font-bold text-gray-900">AED {price}</span>
          </div>

          <button
            className="group/btn text-primary hover:bg-primary flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#d0e6d6] transition-all duration-300 hover:w-32 hover:text-white disabled:opacity-50"
            aria-label="Quick Buy"
          >
            <svg className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="ml-0 max-w-0 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/btn:ml-2 group-hover/btn:max-w-[100px] group-hover/btn:opacity-100">
              Quick Buy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(BundleCard);
