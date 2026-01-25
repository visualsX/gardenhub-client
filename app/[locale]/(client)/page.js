import ShopCollection from '@/components/pages/home/ShopCollection';
import StatsSection from '@/components/pages/home/StatsSection';
import TestimonialsSection from '@/components/pages/home/TestimonialsSection';
import { constructMetadata } from '@/lib/utils/seo';
import HomeBanner from '@/components/pages/home/HomeBanner';
import DynamicSections from '@/components/pages/home/DynamicSections';

// Metadata for the home page
export const metadata = constructMetadata({
  title: 'GardenHub - Fresh Indoor Plants',
  description:
    'Shop the best indoor plants, accessories, and care essentials delivered to your door.',
});

import {
  fetchFeaturedProducts,
  fetchActiveBanners,
  fetchShopCollections,
} from '@/lib/api/ssr-calls/server-homepage';

export default async function Home() {
  // Fetch Initial Data
  const featuredSectionsData = await fetchFeaturedProducts();
  const activeBanners = await fetchActiveBanners();
  const shopCollections = await fetchShopCollections();
  return (
    <div className="min-h-screen">
      <HomeBanner initialBanners={activeBanners} />

      <DynamicSections initialSections={featuredSectionsData} />

      <ShopCollection initialCollections={shopCollections} />
      <StatsSection />
      <TestimonialsSection />
    </div>
  );
}
