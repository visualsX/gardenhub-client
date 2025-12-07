'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import ArrowLeft from '@/public/shared/arrow-left.svg';
import ArrowRight from '@/public/shared/arrow-right.svg';
export default function ShopCollection() {
  const scrollRef = useRef(null);

  const collections = [
    {
      id: 1,
      title: 'Indoor Plants',
      href: '/indoor-plants',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    },
    {
      id: 2,
      title: 'Outdoor Plants',
      href: '/outdoor-plants',
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
    },
    {
      id: 3,
      title: 'Low Light Plants',
      href: '/low-light-plants',
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=800&q=80',
    },
    {
      id: 4,
      title: 'Planters',
      href: '/accessories',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    },
    {
      id: 5,
      title: 'Indoor Plants',
      href: '/indoor-plants',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    },
    {
      id: 6,
      title: 'Indoor Plants',
      href: '/indoor-plants',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    },
  ];

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
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={collection.href}
                className="group relative h-[400px] w-[300px] shrink-0 snap-center overflow-hidden rounded-2xl"
              >
                {/* Image */}
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl bg-[#1e3d2a] px-6 py-4 text-white transition-colors hover:bg-[#153020]">
                  <span className="text-lg font-medium">{collection.title}</span>
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
