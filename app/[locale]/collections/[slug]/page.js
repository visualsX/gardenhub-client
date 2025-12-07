'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import FilterSidebar from '@/components/pages/category/FilterSidebar';
import ProductCard from '@/components/shared/ProductCard';

// Temporary mock data
const products = [
  {
    id: 1,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
  },
  {
    id: 2,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
  },
  {
    id: 3,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
  },
  {
    id: 4,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
  },
  {
    id: 5,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
  },
  {
    id: 6,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
  },
  {
    id: 7,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
  },
  {
    id: 8,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
  },
  {
    id: 9,
    name: 'Snake Plant Bundle',
    price: 'AED 75.00',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
  },
];

export default function CategoryPage() {
  const { slug } = useParams();

  // Format slug for title (e.g., "indoor-plants" -> "Indoor Plants")
  const title = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  const [sortBy, setSortBy] = useState('best-selling');

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-layout">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">{title}</h1>

        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-900">Filter by:</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm font-medium text-gray-900">
              Sort by:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer bg-transparent text-sm font-medium text-gray-600 focus:outline-none"
            >
              <option value="best-selling">Best selling</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar */}
          <FilterSidebar />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
