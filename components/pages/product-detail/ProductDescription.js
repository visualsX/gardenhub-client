export default function ProductDescription({ description, careInfo }) {
  return (
    <div className="max-layout grid gap-12 py-12 md:grid-cols-2">
      {/* Description Text */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">Description</h2>
        <div className="bg-accent-gray rounded-3xl p-8">
          <div className="space-y-4 leading-relaxed whitespace-pre-line text-gray-600">
            {description || 'No description available for this product.'}
          </div>
        </div>
      </div>

      {/* Care Info Card */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
          Care & Characteristics
        </h2>
        <div className="space-y-4">
          {Array.isArray(careInfo) && careInfo.length > 0 ? (
            careInfo.map((item, index) => (
              <div
                key={`${item.slug}-${index}`}
                className="bg-accent-gray group overflow-hidden rounded-2xl"
              >
                {item.description ? (
                  <details className="w-full">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-4 focus:outline-none">
                      <div>
                        {/* <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                          {item.attributeName}
                        </h3> */}
                        <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                      </div>
                      <div className="text-primary transition-transform duration-300 group-open:rotate-45">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    </summary>
                    <div className="border-t border-gray-100 p-4 pt-2">
                      <p className="leading-relaxed text-gray-600">{item.description}</p>
                    </div>
                  </details>
                ) : (
                  <div className="p-4">
                    <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                      {item.attributeName}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-gray-400">
              Care information is currently unavailable.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
