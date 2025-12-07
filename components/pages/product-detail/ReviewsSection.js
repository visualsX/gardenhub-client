'use client';
import { useState } from 'react';

export default function ReviewsSection({ reviews, rating, totalReviews }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterOptions = [
    'Most Recent',
    'Highest Rating',
    'Lowest Rating',
    'Only Pictures',
    'Pictures First',
    'Most Helpful',
  ];

  return (
    <main className="max-layout py-12">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Customer Reviews</h2>

      <div className="bg-accent-gray rounded-3xl p-8">
        {/* Rating Summary Block */}
        <section className="mb-8 grid grid-cols-1 gap-8 border-b border-gray-200 pb-8 md:grid-cols-3 md:gap-0">
          {/* Left: Overall Rating */}
          <div className="flex flex-col items-center justify-center gap-2 border-gray-200 md:border-r">
            <div className="flex items-center gap-1 text-[#D35400]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-lg font-medium">5.00 out of 5</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Based on 1 review</span>
              <svg
                className="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Middle: Bars */}
          <div className="flex flex-col items-center justify-center border-gray-200 px-4 md:border-r">
            <div className="flex w-full max-w-[200px] flex-col gap-1">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <div className="flex w-12 justify-end text-[#D35400]">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        className={`h-3 w-3 ${j < star ? 'fill-current' : 'fill-current text-gray-200'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="h-2 flex-1 overflow-hidden bg-gray-200">
                    <div
                      className="h-full bg-[#4F6349]"
                      style={{ width: i === 0 ? '100%' : '0%' }}
                    ></div>
                  </div>
                  <span className="w-4 text-gray-500">{i === 0 ? 1 : 0}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Button */}
          <div className="flex items-center justify-center">
            <button className="rounded-none bg-[#4F6349] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3d4d39]">
              Write a review
            </button>
          </div>
        </section>

        {/* Filter Bar */}
        <div className="relative mb-8 flex border-b border-gray-200 pb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Most Recent
            <svg
              className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isFilterOpen && (
            <div className="absolute top-8 left-0 z-10 w-48 rounded-lg bg-gray-200 py-1 text-gray-500 shadow-lg backdrop-blur-md">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-white/10"
                >
                  {opt === 'Most Recent' && (
                    <svg className="mr-2 h-3 w-3 fill-current" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className={opt !== 'Most Recent' ? 'pl-5' : ''}>{opt}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Review List */}
        <section className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-gray-200">
                    {review.userImage ? (
                      <img
                        src={review.userImage}
                        alt={review.author}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-300 font-bold text-gray-600">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mb-1 flex text-[#D35400]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-bold text-gray-900">{review.author}</span>
                      <span className="flex items-center rounded bg-[#4F6349] px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                        Verified
                      </span>
                    </div>
                    <h4 className="mb-1 text-lg font-bold text-gray-800">Great</h4>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
