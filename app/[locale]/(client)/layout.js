import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/shared/header/Header';
import Footer from '@/components/shared/Footer';

import { defaultMetadata } from '@/config/seo.config';

export const metadata = defaultMetadata;

import { fetchMenuData } from '@/lib/api/ssr-calls/server-menu';

export default async function RootLayout({ children, params }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Fetch menu data on the server
  const menuData = await fetchMenuData();

  return (
    <div>
      <Header initialMenuData={menuData} />
      {children}
      <Footer />
    </div>
  );
}
