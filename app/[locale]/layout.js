import { Outfit } from 'next/font/google';
import './globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
// import '@ant-design/v5-patch-for-react-19';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

import { defaultMetadata } from '@/config/seo.config';

import Providers from '../providers';
import { App } from '@/theme/antd-provider';

export const metadata = defaultMetadata;

export default async function RootLayout({ children, params }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${outfit.variable} antialiased`}>
        <NextIntlClientProvider>
          <App>
            <Providers>{children}</Providers>
          </App>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
