import { Outfit } from 'next/font/google';
import './globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
});

import { defaultMetadata } from '@/config/seo.config';
import Preloader from '@/components/shared/Preloader';
import Providers from '../providers';

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
                    <Providers>
                        <Preloader />
                        {children}
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
