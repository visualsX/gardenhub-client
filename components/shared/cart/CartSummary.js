'use client';

import Link from 'next/link';

export default function CartSummary({ showPromoCode = false, totals }) {
  // Totals passed from parent (CartPage) to ensure consistency with API data
  if (!totals) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h3>

      {/* Subtotal */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="text-sm text-gray-600">Subtotal</span>
        <span className="text-sm font-semibold text-gray-900">AED {totals.subtotal}</span>
      </div>

      {/* shipping alert */}
      <div className="flex items-center justify-between pt-3">
        <span className="text-sm text-gray-600">
          <Link href="/tax-policy" className="text-primary! cursor-pointer underline!">
            Tax
          </Link>
          {' & '}
          <Link href="/shipping-policy" className="text-primary! cursor-pointer underline!">
            Shipping
          </Link>{' '}
          fees will be calculated at checkout
        </span>
      </div>

      {/* Promo Code */}
      {showPromoCode && (
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="focus:border-primary focus:ring-primary/20 flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
            />
            <button className="bg-primary hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors">
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t-2 border-gray-200 pt-4">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-primary text-2xl font-bold">AED {totals.total}</span>
      </div>
    </div>
  );
}
