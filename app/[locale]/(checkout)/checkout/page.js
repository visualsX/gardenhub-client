import CheckoutPage from '@/components/pages/checkout/CheckoutPage';
import { getCustomerProfile } from '@/lib/api/ssr-calls/server-checkout-profile';

export default async function Checkout() {
  const customerProfile = await getCustomerProfile();

  return <CheckoutPage customerProfile={customerProfile} />;
}
