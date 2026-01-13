'use client';

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

      {/* Shipping */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="text-sm text-gray-600">Shipping</span>
        <span className="text-sm font-semibold text-gray-900">
          {parseFloat(totals.shipping) === 0 ? 'FREE' : `AED ${totals.shipping}`}
        </span>
      </div>

      {/* Tax */}
      <div className="flex items-center justify-between border-b border-gray-100 py-3">
        <span className="text-sm text-gray-600">Tax (5%)</span>
        <span className="text-sm font-semibold text-gray-900">AED {totals.tax}</span>
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

      {/* Free Shipping Notice */}
      {parseFloat(totals.subtotal) > 0 && parseFloat(totals.subtotal) < 200 && (
        <div className="bg-primary-light mt-4 rounded-lg p-3">
          <p className="text-primary-dark text-xs">
            Add{' '}
            <span className="font-bold">AED {(200 - parseFloat(totals.subtotal)).toFixed(2)}</span>{' '}
            more to get FREE shipping!
          </p>
        </div>
      )}
    </div>
  );
}
