import ProductDetailPage from '@/components/pages/product-detail/ProductDetailPage';
import { productData } from '@/components/pages/product-detail/mockData';

export async function generateMetadata({ params }) {
    // In a real app, fetch product by params.slug
    const product = productData;

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.images,
            type: 'product',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description,
            images: product.images,
        },
    };
}

export default function Page({ params }) {
    const product = productData;

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.longDescription || product.description,
        brand: {
            '@type': 'Brand',
            name: 'GardenHub',
        },
        offers: {
            '@type': 'Offer',
            url: `https://gardenhub-client.vercel.app/products/${params.slug}`, // Ideally dynamic base URL
            priceCurrency: 'AED',
            price: typeof product.price === 'string' ? product.price.replace(/[^0-9.]/g, '') : product.price,
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviews,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailPage product={product} />
        </>
    );
}
