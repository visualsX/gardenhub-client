import HeroSection from '@/components/pages/home/HeroSection';
import ShopCollection from '@/components/pages/home/ShopCollection';
import StatsSection from '@/components/pages/home/StatsSection';
import TestimonialsSection from '@/components/pages/home/TestimonialsSection';
import ProductGrid from '@/components/shared/ProductGrid';
import { constructMetadata } from '@/lib/utils/seo';

// Metadata for the home page
export const metadata = constructMetadata({
  title: 'GardenHub - Fresh Indoor Plants',
  description:
    'Shop the best indoor plants, accessories, and care essentials delivered to your door.',
});

import { fetchFeaturedProducts } from '@/lib/api/ssr-calls/server-homepage';

export default async function Home() {
  // Fetch Indoor Plants
  const indoorPlantsData = await fetchFeaturedProducts({
    collectionType: 'sale', // Using 'sale' as per valid enum or comment in query file
    limit: 4,
    categorySlug: 'indoor',
  });

  console.log('indoorplants: ', indoorPlantsData);
  // Map API response to ProductGrid format
  const indoorPlants = indoorPlantsData.map((product) => ({
    ...product,
    price: `AED ${product.salePrice > 0 ? product.salePrice : product.price}`, // Handle sale price if needed
    rating: 5, // Default rating for now as API doesn't return it
  }));

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductGrid title="Indoor Plants" products={indoorPlants} />

      <ProductGrid
        parentClassName={'bg-accent-gray'}
        title="Our indoor best-sellers"
        titleClassName="text-4xl! text-center"
        products={indoorPlants}
      />
      <ProductGrid
        title="Best Christmas Collection "
        titleClassName="text-4xl! text-center"
        products={indoorPlants}
      />
      <ShopCollection />
      <StatsSection />
      <TestimonialsSection />
    </div>
  );
}
