import { getCustomerProfile } from '@/lib/api/ssr-calls/server-profile';
import ProfileForm from '@/components/auth/ProfileForm';

export default async function ProfilePage({ params }) {
  const { locale } = await params;
  const customerProfile = await getCustomerProfile(locale);

  return <ProfileForm customerProfile={customerProfile} />;
}
