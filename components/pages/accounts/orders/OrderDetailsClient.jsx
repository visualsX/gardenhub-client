'use client';

import React from 'react';
import Link from 'next/link';
import { useOrderDetails } from '@/hooks/useOrder';
import CommunicationSection from './CommunicationSection';


export default function OrderDetailsClient({ initialOrder, id }) {
  const { data: order = initialOrder, isLoading, refetch } = useOrderDetails(id);

  console.log(initialOrder);
  if (!order) return null;

  const statusStyle = STATUS_CONFIG[order.status] || {
    color: 'text-gray-700 bg-gray-50 ring-gray-600/10',
    dot: 'bg-gray-500',
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-20">
      {/* Header & Back Navigation */}
      <div className="flex flex-col gap-6">
        <Link
          href={`/auth/accounts/orders`}
          className="hover:text-primary flex w-fit items-center gap-2 text-sm font-bold text-gray-500 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to History
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                Order #{order.orderNumber}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black tracking-wider uppercase ring-1 ring-inset ${statusStyle.color}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}></span>
                {order.status}
              </span>
            </div>
            <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content: Order Items & Communication */}
        <div className="space-y-8 lg:col-span-2">
          {/* Order Contents */}
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm ring-1 ring-black/5">
            <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-4">
              <h3 className="text-xs font-black tracking-widest text-gray-500 uppercase">
                Order Contents
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-4 p-6 transition-colors hover:bg-gray-50/50">
                   <div className="flex gap-6">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-gray-100 shadow-sm">
                      <img
                        src={item.imageUrl || '/shared/placeholder.png'}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="line-clamp-1 font-bold text-gray-900">{item.productName}</h4>
                           {item.variantAttributes && (
                            <p className="mt-1 text-xs font-medium text-gray-400 capitalize">
                              {item.variantAttributes}
                            </p>
                          )}
                        </div>
                        <p className="font-bold text-gray-900 tabular-nums">
                          {formatCurrency(item.itemTotal)}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <p className="font-bold text-gray-400">
                          Quantity <span className="ml-1 text-gray-900">{item.quantity}</span>
                        </p>
                        <p className="font-medium text-gray-400">
                          {formatCurrency(item.pricePerUnit)} per unit
                        </p>
                      </div>
                    </div>
                   </div>

                  {/* Addons Section */}
                  {item.addons?.length > 0 && (
                    <div className="mt-2 space-y-3 rounded-2xl bg-gray-50/50 p-4 ring-1 ring-gray-100/50 border border-gray-100">
                      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                        Product Customizations / Addons
                      </p>
                      <div className="space-y-3">
                        {item.addons.map((addon) => (
                          <div key={addon.id} className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-gray-100 shadow-sm">
                              <img
                                src={addon.imageUrl || '/shared/placeholder.png'}
                                alt={addon.addonName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 items-center justify-between">
                              <div>
                                <p className="text-xs font-bold text-gray-900">
                                  {addon.addonName}
                                </p>
                                <p className="text-[10px] font-medium text-gray-400 capitalize">
                                  {addon.optionName}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-900 tabular-nums">
                                  +{formatCurrency(addon.priceAtPurchase)}
                                </p>
                                <p className="text-[9px] font-medium tracking-tight text-gray-400 uppercase">
                                  Qty: {addon.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Communication Section */}
          <CommunicationSection order={order} isLoading={isLoading} refetch={refetch} />

          {/* Timeline / Logistics */}
          {order.trackingHistory?.length > 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="mb-6 text-xs font-black tracking-widest text-gray-500 uppercase">
                Logistics Timeline
              </h3>
              <div className="space-y-6">
                {order.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative flex gap-4">
                    {idx !== order.trackingHistory.length - 1 && (
                      <div className="absolute top-6 left-2.5 h-full w-px bg-gray-100"></div>
                    )}
                    <div
                      className={`bg-primary ring-primary/20 mt-1 h-5 w-5 shrink-0 rounded-full border-4 border-white ring-2`}
                    ></div>
                    <div className="space-y-1 pb-4">
                      <p className="text-sm font-bold text-gray-900">{step.status}</p>
                      <p className="text-xs font-medium text-gray-500">
                        {step.notes || 'No notes provided'}
                      </p>
                      <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">
                        {formatDate(step.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Totals & Addresses */}
        <div className="space-y-8">
          {/* Totals Card */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="mb-6 text-xs font-black tracking-widest text-gray-500 uppercase">
              Order Ledger
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500">
                <span>Shipping Fee</span>
                <span className="text-gray-900">{formatCurrency(order.shippingFee)}</span>
              </div>
              {order.taxAmount > 0 && (
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Tax Amount</span>
                  <span className="text-gray-900">{formatCurrency(order.taxAmount)}</span>
                </div>
              )}
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-sm font-medium text-rose-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discountAmount)}</span>
                </div>
              )}
              <div className="mt-6 flex justify-between border-t border-gray-100 pt-6">
                <span className="text-base font-black text-gray-900">Grand Total</span>
                <span className="text-primary text-2xl font-black tabular-nums">
                  {formatCurrency(order.grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="mb-4 text-xs font-black tracking-widest text-gray-500 uppercase">
              Shipping Destination
            </h3>
            <div className="space-y-2">
              <p className="text-sm font-black text-gray-900">{order.shippingAddress.fullName}</p>
              <p className="text-sm leading-relaxed text-gray-500">
                {order.shippingAddress.streetAddress}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.country}
                <br />
                {order.shippingAddress.postalCode}
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-xs font-bold text-gray-600 ring-1 ring-gray-100">
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {order.shippingAddress.phone}
              </div>
            </div>
          </div>

          {/* Payment Info */}
          {order.transactions?.length > 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="mb-4 text-xs font-black tracking-widest text-gray-500 uppercase">
                Transaction Info
              </h3>
              <div className="space-y-4">
                {order.transactions.map((tx, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 rounded-2xl bg-gray-50/50 p-4 ring-1 ring-gray-100/50"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="flex-1 text-sm leading-snug font-black tracking-tight wrap-break-word text-gray-900 uppercase">
                          {formatPaymentMethod(tx.paymentMethod)}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider uppercase ring-1 ring-inset ${tx.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10' : 'bg-amber-50 text-amber-700 ring-amber-600/10'}`}
                        >
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        {formatDate(tx.createdAt)}
                      </p>
                    </div>
                    {tx.amount > 0 && (
                      <div className="mt-1 flex items-center justify-between border-t border-gray-100/50 pt-2 text-[10px] font-bold tracking-widest uppercase">
                        <span className="text-gray-400">Amount Charged</span>
                        <span className="text-gray-900">{formatCurrency(tx.amount)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Native date formatter
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};

// Native currency formatter
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
  }).format(amount);
};


const formatPaymentMethod = (method) => {
  if (!method) return 'N/A';
  const clean = method.includes('.') ? method.split('.').pop() : method;
  return clean
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toUpperCase();
};


const STATUS_CONFIG = {
  PENDING: { color: 'text-amber-700 bg-amber-50 ring-amber-600/10', dot: 'bg-amber-500' },
  PROCESSING: { color: 'text-blue-700 bg-blue-50 ring-blue-600/10', dot: 'bg-blue-500' },
  SHIPPED: { color: 'text-purple-700 bg-purple-50 ring-purple-600/10', dot: 'bg-purple-500' },
  DELIVERED: { color: 'text-emerald-700 bg-emerald-50 ring-emerald-600/10', dot: 'bg-emerald-500' },
  COMPLETED: { color: 'text-emerald-700 bg-emerald-50 ring-emerald-600/10', dot: 'bg-emerald-500' },
  CANCELLED: { color: 'text-rose-700 bg-rose-50 ring-rose-600/10', dot: 'bg-rose-500' },
};
