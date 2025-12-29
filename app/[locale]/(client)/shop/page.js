import { getShopProducts, getShopFilters } from '@/lib/api/ssr-calls/server-shop';
import ShopPage from '@/components/pages/shop/ShopPage';

export const metadata = {
  title: 'Shop All Products | GardenHub',
  description: 'Browse our complete collection of plants, planters, and gardening accessories.',
};

export default async function Shop() {
  // Fetch initial products server-side for SEO
  const initialData = await getShopProducts({ first: 12 });
  const initialFilters = await getShopFilters(null);

  const initialProducts = initialData.edges?.map((edge) => edge.node) || [];

  return <ShopPage initialProducts={initialProducts} initialFilters={initialFilters} />;
}
