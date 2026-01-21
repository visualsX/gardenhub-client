import { getCustomerProfile } from '@/lib/api/ssr-calls/server-profile';
import AddressManager from '@/components/auth/AddressManager';

export default async function SettingsPage({ params }) {
  const { locale } = await params;
  const customerProfile = await getCustomerProfile(locale);

  return <AddressManager customerProfile={customerProfile} />;
}
