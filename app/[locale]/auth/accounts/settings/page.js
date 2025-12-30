import { getCustomerProfile } from '@/lib/api/ssr-calls/server-profile';
import AddressManager from '@/components/auth/AddressManager';

export default async function SettingsPage() {
    const initialData = await getCustomerProfile();

    return <AddressManager initialData={initialData} />;
}
