'use client';

export default function ReviewsSection({ reviews, rating, totalReviews }) {
  // Mock distribution for the UI similar to screenshot
  const distribution = [
    { stars: 5, count: 12 },
    { stars: 4, count: 5 },
    { stars: 3, count: 8 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  return (
    <main className="max-layout py-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Customer Reviews</h2>

      <div className="bg-accent-gray space-y-6 rounded-2xl p-8 md:p-12">
        {/* Rating Summary Block */}
        <section className="mb-12 flex flex-col items-center justify-between gap-8 border-b border-gray-300 pb-6 md:flex-row">
          {/* Left: Overall Rating */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-gray-900">{rating} out of 5</span>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500">Based on {totalReviews} reviews</p>
          </div>

          {/* Middle: Bars */}
          <div className="flex flex-1 flex-col gap-2 md:mx-auto md:max-w-xs">
            {distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-4 text-sm">
                <div className="flex w-24 justify-end text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className={`h-4 w-4 ${j < item.stars ? 'fill-current' : 'fill-current text-gray-200'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-[#1e3d2a]"
                    style={{ width: `${(item.count / totalReviews) * 100}%` }} // Simplified calculation
                  ></div>
                </div>
                <span className="w-6 text-right font-medium text-gray-600">{item.count}</span>
              </div>
            ))}
          </div>

          {/* Right: Button */}
          <div>
            <button className="rounded-full bg-[#2D5F3F] px-8 py-3 font-bold text-white transition-colors hover:bg-[#1e3d2a]">
              Write a Review
            </button>
          </div>
        </section>

        {/* Review List */}
        <section className="space-y-6 divide-y divide-gray-300">
          {reviews.map((review) => (
            <div key={review.id} className="py-6 first:pt-0">
              <div className="flex gap-x-4">
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white text-xl font-bold text-gray-500 shadow-sm">
                  {review.userImage ? (
                    <img
                      src={review.userImage}
                      alt={review.author}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{review.author.charAt(0)}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="font-bold text-gray-800">{review.author}</h4>
                    <span className="text-sm text-gray-400">{review.date}</span>
                  </div>

                  <div className="mb-3 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mb-4 leading-relaxed text-gray-600">{review.content}</p>

                  {review.images && (
                    <div className="flex gap-3">
                      {review.images.map((img, i) => (
                        <div
                          key={i}
                          className="h-20 w-20 overflow-hidden rounded-xl border border-gray-200"
                        >
                          <img src={img} alt="Review" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
