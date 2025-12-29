'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import FilterSidebar from '@/components/pages/category/FilterSidebar';
import ProductCard from '@/components/shared/ProductCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';
import { useProductsByCategory } from '@/hooks/useProductsByCategory';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  // With [...slug], slug is an array. We usually want the last segment for the specific category title/ID.
  const currentSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  // Format slug for title (e.g., "indoor-plants" -> "Indoor Plants")
  const title = currentSlug
    ? currentSlug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  const [sortBy, setSortBy] = useState('best-selling');
  const { data: products = [], isLoading: loading, isError } = useProductsByCategory(currentSlug);

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
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="mb-4 text-lg font-medium text-gray-900">Failed to load products</p>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  Retry
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-gray-500">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
