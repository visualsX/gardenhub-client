'use client';

import { Input, Button } from 'antd';
import { Box } from '@/components/wrappers/box';
import { CheckoutBox } from '@/components/wrappers/checkout-box';

export default function CheckoutSummary({
    items,
    totals,
    couponCode,
    setCouponCode,
    couponResponse,
    setCouponResponse,
    isValidatingCoupon,
    handleApplyCoupon,
    isCartLoading,
    cartData,
}) {
    return (
        <CheckoutBox dividers={null} loading={isCartLoading || !cartData} header title="Order Summary" className="p-5 bg-white border rounded-xl">
            <div className="space-y-3 overflow-y-auto py-4">
                {items.map((item) => {
                    const name = item.productName || item.name;
                    const imageUrl = item.imageUrl || item.image || '/all/image-placeholder.svg';
                    const variantLabel = item.variantAttributes || item.variant;
                    const unitPrice = item.salePrice > 0 ? item.salePrice : item.price;
                    const total = item.itemTotal
                        ? parseFloat(item.itemTotal).toFixed(2)
                        : (unitPrice * item.quantity).toFixed(2);

                    return (
                        <div
                            key={`${item.id || item.productId}-${item.variantId || item.productVariantId || 'default'}`}
                            className="flex gap-2"
                        >
                            <div className="relative h-16 w-16 rounded-xl">
                                <img
                                    src={imageUrl}
                                    alt={name}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                                <span className="bg-primary absolute -top-2 -right-1 z-30 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h4 className="line-clamp-1 text-sm font-semibold text-gray-900">{name}</h4>
                                {variantLabel && <p className="text-xs text-gray-500">{variantLabel}</p>}
                                <p className="text-primary mt-1 text-sm font-bold">AED {total}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Coupon Section */}
            <div className="border-t border-gray-200 py-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                        disabled={couponResponse?.isValid}
                    />
                    <Button
                        loading={isValidatingCoupon}
                        onClick={
                            couponResponse?.isValid
                                ? () => {
                                    setCouponResponse(null);
                                    setCouponCode('');
                                }
                                : handleApplyCoupon
                        }
                        disabled={isValidatingCoupon}
                        className={`${couponResponse?.isValid
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            } rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50`}
                    >
                        {isValidatingCoupon ? '...' : couponResponse?.isValid ? 'Remove' : 'Apply'}
                    </Button>
                </div>
                {couponResponse && (
                    <p
                        className={`mt-2 text-xs ${couponResponse.isValid ? 'text-green-600' : 'text-red-500'
                            }`}
                    >
                        {couponResponse.message}
                    </p>
                )}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-semibold text-gray-900">AED {totals.subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-semibold text-gray-900">
                        {parseFloat(totals.shipping) === 0 ? 'FREE' : `AED ${totals.shipping}`}
                    </span>
                </div>

                {couponResponse?.isValid && (
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">
                            Discount ({couponResponse.couponCode})
                        </span>
                        <span className="text-sm font-semibold text-green-600">- AED {totals.discount}</span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tax (5%)</span>
                    <span className="text-sm font-semibold text-gray-900">AED {totals.tax}</span>
                </div>

                <div className="flex items-center justify-between border-t-2 border-gray-200 pt-3">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-primary text-2xl font-bold">AED {totals.total}</span>
                </div>
            </div>
        </CheckoutBox>
    );
}
