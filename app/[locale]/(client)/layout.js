import { Outfit } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

import { defaultMetadata } from '@/config/seo.config';
import Preloader from '@/components/shared/Preloader';

export const metadata = defaultMetadata;

export default async function RootLayout({ children, params }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
