import Link from 'next/link';
import ProductCard from './ProductCard';

export default function ProductGrid({
  title,
  products,
  parentClassName,
  titleClassName = '',
  viewAll = null,
}) {
  return (
    <section className={`pt-10 pb-5 sm:py-12 md:py-16 ${parentClassName}`}>
      <div className="max-layout overflow-hidden">
        {/* Section Header: Title + View All */}
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-12 ">
          <h2 className={`font-outfit text-2xl font-black text-[#2d5f3f] sm:text-5xl ${titleClassName}`}>
            {title}
          </h2>
          {viewAll && (
            <Link
              href={viewAll.startsWith('/') ? viewAll : `/collections/${viewAll}`}
              className="group flex items-center gap-2"
            >
              <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/50 p-2 text-sm font-bold text-gray-700 backdrop-blur-sm transition-all hover:bg-[#2d5f3f] hover:text-white group-hover:bg-[#2d5f3f] group-hover:text-white sm:px-6 sm:py-2.5">
                <span className="hidden sm:block">View All</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="-ml-0.5 sm:ml-0"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </Link>
          )}
        </div>

        {/* Product Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="slider-scrollbar-thumb -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
            {products?.map((product, index) => (
              <div key={index} className="w-[75vw] max-w-[320px] shrink-0 snap-start sm:w-[40vw] sm:max-w-[320px] lg:w-auto lg:max-w-none">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
