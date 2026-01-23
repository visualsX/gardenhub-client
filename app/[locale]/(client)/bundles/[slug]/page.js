import BundleDetailPage from '@/components/pages/bundles/BundleDetailPage';
import { getBundleBySlug } from '@/lib/api/ssr-calls/server-bundles';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
    const bundle = await getBundleBySlug(slug);

    if (!bundle) {
        return {
            title: 'Bundle Not Found',
        };
    }

    return {
        title: bundle.metaTitle || bundle.name,
        description: bundle.metaDescription || bundle.shortDescription,
        openGraph: {
            title: bundle.metaTitle || bundle.name,
            description: bundle.metaDescription || bundle.shortDescription,
            images: [bundle.mainImageUrl],
            type: 'website',
        },
    };
}

export default async function Page({ params }) {
    const { slug: rawSlug } = await params;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    const bundle = await getBundleBySlug(slug);

    if (!bundle) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product', // Using Product type for Bundle
        name: bundle.name,
        image: [bundle.mainImageUrl],
        description: bundle.detailDescription || bundle.shortDescription,
        brand: {
            '@type': 'Brand',
            name: 'GardenHub',
        },
        offers: {
            '@type': 'Offer',
            url: `https://gardenhub.ae/bundles/${slug}`,
            priceCurrency: 'AED',
            price: bundle.price,
            availability: 'https://schema.org/InStock',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BundleDetailPage bundle={bundle} />
        </>
    );
}
