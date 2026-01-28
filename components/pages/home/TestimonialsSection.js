'use client';

import { useRef } from 'react';
import ArrowLeft from '@/public/shared/arrow-left.svg';
import ArrowRight from '@/public/shared/arrow-right.svg';
import PrizeIcon from '@/public/all/prize.svg';

export default function TestimonialsSection({ reviewStats, topReviews }) {
  const scrollRef = useRef(null);

  const testimonials = topReviews && topReviews.length > 0 ? topReviews : [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!testimonials.length) return null;

  return (
    <section className="py-20">
      <div className="max-layout text-center">
        <h2 className="mb-8 text-4xl font-bold tracking-tight text-gray-900">
          Hear from Our Clients
        </h2>

        {reviewStats && (
          <div className="mb-16 flex justify-center">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 shadow-sm">
              <div className="bg-accent-gray flex h-10 w-10 items-center justify-center rounded-xl">
                <PrizeIcon />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-900">
                  {reviewStats.averageRating?.toFixed(1) || '0.0'} from{' '}
                  {reviewStats.totalReviews >= 1000
                    ? `${(reviewStats.totalReviews / 1000).toFixed(1)}k`
                    : reviewStats.totalReviews}{' '}
                  reviews
                </div>
                <div className="text-xs text-gray-500">
                  {reviewStats.totalReviews} happy clients
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          {/* Fade Masks - Increased Width for smoother transition */}
          <div className="sm:from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-48 sm:bg-linear-to-r sm:to-transparent"></div>
          <div className="sm:from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-48 sm:bg-linear-to-l sm:to-transparent"></div>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 sm:px-8"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full shrink-0 snap-center space-y-4 rounded-2xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md sm:w-[380px]"
              >
                <div className="bg-accent-gray rounded-2xl p-4">
                  <div className="mb-4 flex text-yellow-400">
                    {[...Array(Math.floor(testimonial.rating || 5))].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mb-6 line-clamp-4 text-[15px] leading-relaxed text-gray-600">
                    {testimonial.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-gray-50 font-bold text-gray-400">
                    {testimonial.image1Url ? (
                      <img
                        src={testimonial.image1Url}
                        alt={testimonial.customerName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      testimonial.customerName?.charAt(0) || 'U'
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {testimonial.customerName}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {new Date(testimonial.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="flex h-14 w-[72px] cursor-pointer items-center justify-center rounded-4xl border border-gray-300 bg-transparent text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-14 w-[72px] cursor-pointer items-center justify-center rounded-4xl border border-gray-300 bg-transparent text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
