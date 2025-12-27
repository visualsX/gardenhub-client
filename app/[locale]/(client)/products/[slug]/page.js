import ProductDetailPage from '@/components/pages/product-detail/ProductDetailPage';
import { getProductBySlug, getRelatedProducts } from '@/lib/api/ssr-calls/server-products';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug: rawSlug } = await params;
    // params.slug is an array because of [...slug] route
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.shortDescription,
        openGraph: {
            title: product.metaTitle || product.name,
            description: product.metaDescription || product.shortDescription,
            images: product.images || [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.metaTitle || product.name,
            description: product.metaDescription || product.shortDescription,
            images: product.images || [],
        },
    };
}

export default async function Page({ params }) {
    console.log('Page component called');
    const { slug: rawSlug } = await params;

    // params.slug might be an array depending on your config, usually string for [slug]
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    console.log('Extracted slug:', slug);
    const product = await getProductBySlug(slug);
    console.log('Product fetched:', product ? 'SUCCESS' : 'NULL');

    if (product) {
        const relatedProducts = await getRelatedProducts(product.id, 8);
        product.relatedProducts = relatedProducts;
    }

    if (!product) {
        console.log('Calling notFound() because product is null');
        notFound();
    }

    // Calculate price for JSON-LD (use lowest variant price if has variants)
    let price = 0;
    if (product.hasVariants && product.variants?.length > 0) {
        const prices = product.variants.map(v => v.salePrice > 0 ? v.salePrice : v.price);
        price = Math.min(...prices);
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images || [],
        description: product.detailedDescription || product.shortDescription,
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: 'GardenHub',
        },
        offers: {
            '@type': 'Offer',
            url: `https://gardenhub.ae/products/${slug}`,
            priceCurrency: 'AED',
            price: price,
            availability: product.stockQuantity > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailPage product={product} slug={slug} />
        </>
    );
}
