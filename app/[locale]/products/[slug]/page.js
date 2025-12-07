import ProductDetailPage from '@/components/pages/product-detail/ProductDetailPage';
import { productData } from '@/components/pages/product-detail/mockData';

// This is a server component by default
export default function Page({ params }) {
    // In a real application, you would fetch data here based on params.slug
    // const product = await getProduct(params.slug);

    // For now, we use the mock data
    const product = productData;

    return <ProductDetailPage product={product} />;
}
