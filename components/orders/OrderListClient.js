'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { fetchMoreOrdersAction } from '@/lib/api/ssr-calls/order-actions';

// Simple native date formatter
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(dateString));
};

// Native currency formatter
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED',
    }).format(amount);
};

const STATUS_CONFIG = {
    PENDING: { color: 'text-amber-700 bg-amber-50 ring-amber-600/10', dot: 'bg-amber-500' },
    PROCESSING: { color: 'text-blue-700 bg-blue-50 ring-blue-600/10', dot: 'bg-blue-500' },
    SHIPPED: { color: 'text-purple-700 bg-purple-50 ring-purple-600/10', dot: 'bg-purple-500' },
    DELIVERED: { color: 'text-emerald-700 bg-emerald-50 ring-emerald-600/10', dot: 'bg-emerald-500' },
    COMPLETED: { color: 'text-emerald-700 bg-emerald-50 ring-emerald-600/10', dot: 'bg-emerald-500' },
    CANCELLED: { color: 'text-rose-700 bg-rose-50 ring-rose-600/10', dot: 'bg-rose-500' },
};

export default function OrderListClient({ initialOrders, initialPageInfo, where, pageSize }) {
    const [orders, setOrders] = useState(initialOrders);
    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isError, setIsError] = useState(false);
    const loadMoreRef = useRef(null);

    // Reset list when initial data changes (e.g. tab switch in parent)
    useEffect(() => {
        setOrders(initialOrders);
        setPageInfo(initialPageInfo);
    }, [initialOrders, initialPageInfo]);

    useEffect(() => {
        if (!loadMoreRef.current || !pageInfo.hasNextPage || isLoadingMore) return;

        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting) {
                    setIsLoadingMore(true);
                    setIsError(false);

                    const result = await fetchMoreOrdersAction({
                        after: pageInfo.endCursor,
                        where,
                        first: pageSize
                    });

                    if (result.success) {
                        setOrders(prev => [...prev, ...result.data.edges.map(e => e.node)]);
                        setPageInfo(result.data.pageInfo);
                    } else {
                        setIsError(true);
                    }
                    setIsLoadingMore(false);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [pageInfo, isLoadingMore, where, pageSize]);

    return (
        <div className="space-y-5">
            <div className="grid gap-5">
                {orders.map((order) => {
                    const status = STATUS_CONFIG[order.status] || { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' };
                    return (
                        <Link
                            key={order.id}
                            href={`/auth/accounts/orders/${order.id}`}
                            className="group relative flex flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:flex-row sm:justify-between"
                        >
                            <div className="flex flex-1 items-center gap-4 w-full">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-colors group-hover:bg-primary/5 group-hover:text-primary">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                                            Order {order.orderNumber}
                                        </h3>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-tight ring-1 ring-inset ${status.color}`}>
                                            <span className={`h-1 w-1 rounded-full ${status.dot}`}></span>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                                        <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formatDate(order.createdAt)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-6 w-full sm:w-auto">
                                <div className="flex flex-col gap-0.5 text-right">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Total Amount</p>
                                    <p className="text-lg font-bold text-gray-900 tabular-nums">{formatCurrency(order.grandTotal)}</p>
                                </div>
                                <div className="flex flex-col gap-0.5 text-right">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Items Count</p>
                                    <p className="text-base font-bold text-gray-700">
                                        {order.itemCount} {order.itemCount === 1 ? 'Plant' : 'Plants'}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Load More Trigger */}
            {pageInfo.hasNextPage && (
                <div ref={loadMoreRef} className="flex flex-col items-center justify-center py-12 space-y-3">
                    {isLoadingMore ? (
                        <>
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading older history</span>
                        </>
                    ) : (
                        <div className="h-1 w-24 rounded-full bg-gray-100"></div>
                    )}
                </div>
            )}

            {!pageInfo.hasNextPage && orders.length > 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        End of Order Journal
                    </p>
                </div>
            )}

            {isError && (
                <div className="flex items-center gap-3 rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/10">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Something went wrong fetching more orders. Please refesh or try again.
                </div>
            )}
        </div>
    );
}
