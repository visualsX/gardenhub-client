import { getBundles } from '@/lib/api/ssr-calls/server-bundles';
import BundlesPage from '@/components/pages/bundles/BundlesPage';

export const metadata = {
  title: 'Bundles | GardenHub',
  description: 'Save more with our curated plant and accessory bundles.',
};

export default async function Bundles() {
  const initialData = await getBundles({ first: 12 });

  const initialBundles = initialData?.edges?.map((edge) => edge.node) || [];
  const initialTotalCount = initialData?.totalCount || 0;

  return <BundlesPage initialBundles={initialBundles} initialTotalCount={initialTotalCount} />;
}
