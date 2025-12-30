import { getCustomerProfile } from '@/lib/api/ssr-calls/server-profile';
import ProfileForm from '@/components/auth/ProfileForm';

export default async function ProfilePage() {
    const initialProfile = await getCustomerProfile();

    return <ProfileForm initialProfile={initialProfile} />;
}
