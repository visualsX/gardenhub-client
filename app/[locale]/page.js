import HeroSection from '@/components/pages/home/HeroSection';
import ProductGrid from '@/components/shared/ProductGrid';
import { constructMetadata } from '@/utils/seo';

// Metadata for the home page
export const metadata = constructMetadata({
  title: 'GardenHub - Fresh Indoor Plants',
  description:
    'Shop the best indoor plants, accessories, and care essentials delivered to your door.',
});

// Sample product data
const indoorPlants = [
  {
    name: 'Snake Plant Bundle',
    price: 'AED75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=500',
  },
  {
    name: 'Snake Plant Bundle',
    price: 'AED75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=500',
  },
  {
    name: 'Snake Plant Bundle',
    price: 'AED75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=500',
  },
  {
    name: 'Snake Plant Bundle',
    price: 'AED75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductGrid title="Indoor Plants" products={indoorPlants} />
      <ProductGrid title="Outdoor Plants" products={indoorPlants} />
    </div>
  );
}
