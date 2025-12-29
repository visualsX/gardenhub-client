import { getShopFilters, getShopProducts } from '@/lib/api/ssr-calls/server-shop';
import CategoryClientPage from '@/components/pages/category/CategoryClientPage';

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const currentSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  // Fetch filters and initial products server-side
  const [filters, productData] = await Promise.all([
    getShopFilters(currentSlug),
    getShopProducts({ first: 12, filter: { categorySlug: currentSlug } })
  ]);

  const initialProducts = productData?.edges?.map(edge => edge.node) || [];

  return (
    <CategoryClientPage
      currentSlug={currentSlug}
      initialFilters={filters}
      initialProducts={initialProducts}
      initialTotalCount={productData?.totalCount || 0}
    />
  );
}
