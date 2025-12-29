import { getShopFilters } from '@/lib/api/ssr-calls/server-shop';
import CategoryClientPage from '@/components/pages/category/CategoryClientPage';

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const currentSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const filters = await getShopFilters(currentSlug);

  return <CategoryClientPage currentSlug={currentSlug} initialFilters={filters} />;
}
