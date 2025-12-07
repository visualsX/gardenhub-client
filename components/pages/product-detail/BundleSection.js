'use client';

export default function BundleSection({ bundles }) {
  if (!bundles || bundles.length === 0) return null;

  return (
    <div className="py-8">
      <h3 className="mb-6 font-medium text-gray-900">Buy it with</h3>
      <div className="space-y-4">
        {bundles.map((bundle) => (
          <div
            key={bundle.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
              <img src={bundle.image} alt={bundle.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1">
              <h4 className="text-xl font-bold text-gray-900">{bundle.name}</h4>
              <p className="text-lg font-medium text-gray-600">AED{bundle.price.toFixed(2)}</p>
            </div>
            <button className="mr-2 flex items-center gap-2 rounded-full bg-[#E5F0E6] px-6 py-3 text-sm font-bold text-[#1F4A2F] transition-colors hover:bg-[#dbece0]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
