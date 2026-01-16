'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ORDERS_QUERIES } from '@/lib/api/queries/orders.queries';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { Image } from 'antd';

// Native date formatter
const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'N/A';
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        ...(includeTime && { hour: '2-digit', minute: '2-digit' }),
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

// Native currency formatter
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED',
    }).format(amount || 0);
};

const STATUS_CONFIG = {
    PENDING: { color: 'text-amber-700 bg-amber-50 ring-amber-600/10', dot: 'bg-amber-500' },
    PROCESSING: { color: 'text-blue-700 bg-blue-50 ring-blue-600/10', dot: 'bg-blue-500' },
    SHIPPED: { color: 'text-purple-700 bg-purple-50 ring-purple-600/10', dot: 'bg-purple-500' },
    DELIVERED: { color: 'text-emerald-700 bg-emerald-50 ring-emerald-600/10', dot: 'bg-emerald-500' },
    COMPLETED: { color: 'text-emerald-700 bg-emerald-50 ring-emerald-600/10', dot: 'bg-emerald-500' },
    CANCELLED: { color: 'text-rose-700 bg-rose-50 ring-rose-600/10', dot: 'bg-rose-500' },
};

export default function OrderDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const response = await graphqlClient.request(ORDERS_QUERIES.GET_ORDERS_ID, {
                id: parseInt(id),
            });
            return response.customerOrderById;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
                <p className="mt-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Order...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center text-center p-8 animate-in zoom-in-95 duration-500">
                <div className="rounded-3xl bg-rose-50 p-6 ring-1 ring-rose-200/50">
                    <svg className="h-12 w-12 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="mt-6 text-2xl font-black text-gray-900">Missing Order</h2>
                <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">This order might have been archived or moved. Let's get you back to safety.</p>
                <Link
                    href="/auth/accounts/orders"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to History
                </Link>
            </div>
        );
    }

    const order = data;
    const status = STATUS_CONFIG[order.status] || { color: 'text-gray-700 bg-gray-50 ring-gray-600/10', dot: 'bg-gray-500' };

    // Helper to format payment method
    const formatPaymentMethod = (method) => {
        if (!method) return 'Payment';
        const clean = method.split('.').pop();
        return clean.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header / Breadcrumbs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-gray-100 pb-6">
                <div className="space-y-2">
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <Link href="/auth/accounts/orders" className="transition-colors hover:text-primary">
                            History
                        </Link>
                        <span className="h-0.5 w-4 bg-gray-200"></span>
                        <span className="text-gray-900">Order #{order.orderNumber}</span>
                    </nav>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900">Order Tracking</h1>
                    <p className="text-sm text-gray-500 font-medium">
                        Placed on {formatDate(order.createdAt, true)}
                    </p>
                </div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black tracking-tight uppercase ring-1 ring-inset ${status.color}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`}></span>
                    {order.status}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content Area */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Order Contents Section */}
                    <div className="border-with-radius overflow-hidden shadow-none!">
                        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Order Contents</h3>
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{order.items?.length} {order.items?.length === 1 ? 'Item' : 'Items'}</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex flex-col gap-6 p-8 sm:flex-row items-start">
                                    <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                                        <Image
                                            preview
                                            src={item.imageUrl || '/images/placeholder-product.png'}
                                            alt={item.productName}
                                            className="h-full! w-full! object-cover!"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-2.5">
                                                <h4 className="text-xl font-bold text-gray-900">{item.productName}</h4>
                                                {item.variantAttributes && (
                                                    <div className="flex">
                                                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                                            {item.variantAttributes}
                                                        </span>
                                                    </div>
                                                )}
                                                <p className="text-base font-bold text-gray-400">
                                                    <span className="font-black text-gray-900">{item.quantity}</span> × {formatCurrency(item.pricePerUnit)}
                                                </p>
                                            </div>
                                            <span className="text-lg font-black text-gray-900 tabular-nums">{formatCurrency(item.itemTotal)}</span>
                                        </div>

                                        {item.addons?.length > 0 && (
                                            <div className="mt-4 space-y-2 rounded-xl border border-gray-100 p-4">
                                                {item.addons.map((addon, aIdx) => (
                                                    <div key={aIdx} className="flex items-center justify-between text-[11px]">
                                                        <span className="font-bold text-gray-500 uppercase tracking-widest">
                                                            {addon.addonName} <span className="text-[10px] text-gray-300">({addon.optionName})</span>
                                                        </span>
                                                        <span className="font-black text-gray-900 tabular-nums">
                                                            +{formatCurrency(addon.priceAtPurchase)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Footer */}
                        <div className="bg-white p-8 border-t border-gray-100">
                            <div className="max-w-[280px] ml-auto space-y-4">
                                <div className="flex justify-between text-[11px] font-bold text-gray-400">
                                    <span className="uppercase tracking-widest">Subtotal</span>
                                    <span className="tabular-nums text-gray-900">{formatCurrency(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold text-gray-400">
                                    <span className="uppercase tracking-widest">Shipping</span>
                                    <span className="tabular-nums text-gray-900">{formatCurrency(order.shippingFee)}</span>
                                </div>
                                {order.discountAmount > 0 && (
                                    <div className="flex justify-between text-[11px] font-bold text-rose-600">
                                        <span className="uppercase tracking-widest">Savings</span>
                                        <span className="tabular-nums">-{formatCurrency(order.discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">Grand Total</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-primary tabular-nums tracking-tight">
                                            {formatCurrency(order.grandTotal)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Journey Records Section */}
                    {order.trackingHistory?.length > 0 && (
                        <div className="rounded-[32px] border border-gray-100 bg-white p-10">
                            <h3 className="mb-10 text-[11px] font-black uppercase tracking-widest text-gray-900">Journey Records</h3>
                            <div className="relative space-y-12 pl-4 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-24px)] before:w-px before:bg-gray-100">
                                {order.trackingHistory.map((step, index) => (
                                    <div key={index} className="relative flex flex-col gap-3 pl-10">
                                        {/* Triple Ring Dot */}
                                        <div
                                            className={`absolute left-0 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white shadow-none transition-all ${index === 0 ? 'bg-primary' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div className="h-2.5 w-2.5 rounded-full bg-white flex items-center justify-center">
                                                <div className={`h-1 w-1 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <h4 className={`text-xl font-black tracking-tight uppercase ${index === 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {step.status}
                                                </h4>
                                                <div className="px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                        {formatDate(step.createdAt, true)}
                                                    </span>
                                                </div>
                                            </div>
                                            {step.notes && (
                                                <div className="max-w-2xl rounded-2xl bg-gray-50/50 px-8 py-5 border border-gray-100/50">
                                                    <p className="text-sm font-medium text-gray-600 leading-relaxed">{step.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info - Sticky Stack */}
                <div className="space-y-6 h-fit">
                    {/* General Logistics Card */}
                    <div className="rounded-[32px] border border-gray-100 bg-white p-8">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-primary/60">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Logistics</h3>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Carrier</span>
                                <span className="text-base font-bold text-gray-900">{order.carrier || 'Pending Assignment'}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Waybill Number</span>
                                <span className="text-base font-bold text-gray-900 tracking-tight">{order.trackingNumber || 'Awaiting Label Generaton'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Destination Card */}
                    <div className="rounded-[32px] border border-gray-100 bg-white p-8">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-primary/60">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Destination</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="border-b border-gray-100 pb-6">
                                <span className="text-base font-bold text-gray-900">{order.customer?.firstName} {order.customer?.lastName}</span>
                                <p className="text-[11px] font-bold text-gray-400 mt-1">{order.customer?.email}</p>
                            </div>
                            {order.shippingAddress && (
                                <div className="text-[14px] text-gray-500 font-medium leading-relaxed space-y-2">
                                    <p className="text-gray-900 font-bold">{order.shippingAddress.fullName}</p>
                                    <p>{order.shippingAddress.streetAddress}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                                    <p className="text-[11px] text-gray-300 font-bold uppercase tracking-widest pt-1">{order.shippingAddress.postalCode}</p>
                                    <p className="pt-4 flex items-center gap-2 text-gray-900 font-bold text-sm">
                                        <svg className="h-4 w-4 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {order.shippingAddress.phone}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Financial Ledger Card */}
                    {order.transactions?.length > 0 && (
                        <div className="rounded-[32px] border border-gray-100 bg-white p-8">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-primary/60">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Ledger</h3>
                            </div>
                            <div className="space-y-4">
                                {order.transactions.map((tr, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{formatPaymentMethod(tr.paymentMethod)}</span>
                                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400">
                                                <span className="capitalize">{tr.status.toLowerCase()}</span>
                                                <span className="h-0.5 w-0.5 rounded-full bg-gray-200"></span>
                                                <span>{formatDate(tr.createdAt)}</span>
                                            </div>
                                        </div>
                                        <span className={`text-base font-black tabular-nums tracking-tight ${tr.isRefund ? 'text-rose-500' : 'text-gray-900'}`}>
                                            {tr.isRefund ? '-' : ''}{formatCurrency(tr.amount)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
