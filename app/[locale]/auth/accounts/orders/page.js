import Link from 'next/link';
import { getServerMyOrders } from '@/lib/api/ssr-calls/server-orders';
import OrderListClient from '@/components/orders/OrderListClient';

const PAGE_SIZE = 10;

export default async function OrdersPage({ searchParams }) {
    const params = await searchParams;
    const activeTab = params.status || 'all';

    const where = activeTab === 'all' ? null : { status: { eq: activeTab } };

    const data = await getServerMyOrders({
        first: PAGE_SIZE,
        where,
    });

    const orders = data.edges.map((edge) => edge.node);
    const pageInfo = data.pageInfo;

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                    <p className="mt-2 text-gray-500">
                        Check the status of recent orders, manage returns, and discover similar products.
                    </p>
                </div>
                <div className="hidden sm:block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Total {data.totalCount || ''} Orders
                    </span>
                </div>
            </div>

            {/* Premium Tabs Design */}
            <div className="flex items-center gap-4 py-1">
                <div className="no-scrollbar flex gap-2 overflow-x-auto overflow-y-hidden py-1">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.value;
                        return (
                            <Link
                                key={tab.value}
                                href={tab.value === 'all' ? '?' : `?status=${tab.value}`}
                                className={`group relative flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${isActive
                                    ? 'bg-primary! text-white! shadow-md'
                                    : 'bg-gray-50! text-gray-500! hover:bg-gray-100! hover:text-gray-900!'
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Orders List Component */}
            {orders.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 rounded-3xl bg-white border border-gray-100 shadow-sm p-8 text-center ring-1 ring-black/5">
                    <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                        <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div className="max-w-xs space-y-2">
                        <h3 className="text-lg font-bold text-gray-900">No {activeTab !== 'all' ? activeTab.toLowerCase() : ''} orders yet</h3>
                        <p className="text-sm text-gray-500">Looks like you haven't placed any {activeTab !== 'all' ? activeTab.toLowerCase() : ''} orders.</p>
                    </div>
                    <Link
                        href="/shop"
                        className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        Explore Shop
                    </Link>
                </div>
            ) : (
                <OrderListClient
                    initialOrders={orders}
                    initialPageInfo={pageInfo}
                    where={where}
                    pageSize={PAGE_SIZE}
                />
            )}
        </div>
    );
}

const TABS = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Processing', value: 'PROCESSING' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' },
];
