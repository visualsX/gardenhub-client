export default function ProductCard({ product }) {
    const { name, price, rating, image } = product;

    return (
        <div className="group rounded-3xl bg-white p-3 transition-shadow hover:shadow-xl">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>

            {/* Product Info */}
            <div className="mt-4 px-2">
                <h3 className="mb-2 text-lg font-bold text-gray-900">{name}</h3>

                {/* Rating */}
                <div className="mb-3 flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-500">{rating}</span>
                    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">{price}</span>
                    <button
                        className="group/btn flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#d0e6d6] text-primary transition-all duration-300 hover:w-32 hover:bg-primary hover:text-white"
                        aria-label="Add to cart"
                    >
                        <svg
                            className="h-6 w-6 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v12m6-6H6"
                            />
                        </svg>
                        <span className="ml-0 max-w-0 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/btn:ml-2 group-hover/btn:max-w-[100px] group-hover/btn:opacity-100">
                            Add to Cart
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
