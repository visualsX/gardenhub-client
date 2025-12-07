import ProductCard from './ProductCard';

export default function ProductGrid({ title, products, titleClassName = '' }) {
  return (
    <section className="py-16">
      <div className="max-layout">
        {/* Section Title */}
        <h2 className={`mb-12 text-5xl font-bold text-gray-900 ${titleClassName}`}>{title}</h2>

        {/* Product Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="hover:border-primary hover:text-primary rounded-full border-2 border-gray-300 bg-white px-12 py-3 font-semibold text-gray-700 transition-all">
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
