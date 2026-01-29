import { notFound } from 'next/navigation';
import { getServerOrderById } from '@/lib/api/ssr-calls/server-orders';
import OrderDetailsClient from '@/components/pages/accounts/orders/OrderDetailsClient';

export default async function OrderDetailPage({ params }) {
  const { id, locale } = await params;
  const order = await getServerOrderById(id, locale);

  if (!order) {
    notFound();
  }

  return <OrderDetailsClient initialOrder={order} id={id} />;
}
