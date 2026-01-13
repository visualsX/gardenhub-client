'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import ArrowLeft from '@/public/shared/arrow-left.svg';
import ArrowRight from '@/public/shared/arrow-right.svg';
import { useShopCollections } from '@/hooks/useHome';
export default function ShopCollection({ initialCollections }) {
  const { data: collections } = useShopCollections(initialCollections);
  console.log(collections);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-accent-gray py-16">
      <div className="max-layout">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-gray-900">
          Shop the collection
        </h2>

        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
          >
            {collections?.map((collection) => (
              <Link
                key={collection.categoryId}
                href={`/collections/${collection.categorySlug}`}
                className="group relative flex h-[400px] w-[300px] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-300 bg-[#f3fbf6]"
              >
                {/* Image or Placeholder */}
                {collection.imageUrl ? (
                  <img
                    src={collection.imageUrl}
                    alt={collection.customTitle}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <img
                      src="/all/image-placeholder.svg"
                      alt="No image"
                      className="w-40 opacity-20 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl bg-[#1e3d2a] px-6 py-4 text-white transition-colors hover:bg-[#153020]">
                  <span className="text-lg font-medium">{collection.customTitle}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white">
                    <svg
                      className="h-5 w-5 text-white transition-colors group-hover:text-[#1e3d2a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="flex h-14 w-[72px] cursor-pointer items-center justify-center rounded-4xl border border-gray-300 bg-transparent text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
              aria-label="Scroll Left"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-14 w-[72px] cursor-pointer items-center justify-center rounded-4xl border border-gray-300 bg-transparent text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
              aria-label="Scroll Right"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
