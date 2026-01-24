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
    <section className={`py-12 sm:py-16 ${parentClassName}`}>
      <div className="max-layout">
        {/* Section Header: Title + View All */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <h2 className={`font-outfit text-3xl font-black text-[#2d5f3f] sm:text-5xl ${titleClassName}`}>
            {title}
          </h2>
          {viewAll && (
            <Link
              href={viewAll.startsWith('/') ? viewAll : `/collections/${viewAll}`}
              className="group flex items-center gap-2"
            >
              <button className="bg-primary/5 hover:bg-primary group-hover:bg-primary rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition-all hover:text-white group-hover:text-white sm:px-8">
                View All
              </button>
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
