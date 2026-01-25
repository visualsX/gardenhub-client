import CheckoutPage from '@/components/pages/checkout/CheckoutPage';
import CheckoutWrapper from '@/components/pages/checkout/CheckoutWrapper';
import { getCustomerProfile } from '@/lib/api/ssr-calls/server-checkout-profile';

export default async function Checkout() {
  const customerProfile = await getCustomerProfile();

  return (
    <CheckoutWrapper>
      <CheckoutPage customerProfile={customerProfile} />
    </CheckoutWrapper>
  );
}
