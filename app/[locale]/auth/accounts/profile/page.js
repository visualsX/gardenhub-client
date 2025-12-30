import { getCustomerProfile } from '@/lib/api/ssr-calls/server-profile';
import ProfileForm from '@/components/auth/ProfileForm';

export default async function ProfilePage({ params }) {
    const { locale } = await params;
    const initialProfile = await getCustomerProfile(locale);

    return <ProfileForm initialProfile={initialProfile} />;
}
