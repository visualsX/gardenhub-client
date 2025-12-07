export default function ProductDescription({ description, careInfo }) {
  return (
    <div className="max-layout grid gap-4 py-12 md:grid-cols-2">
      {/* Description Text */}
      <div>
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Description</h2>
        <div className="bg-accent-gray rounded-3xl p-8">
          <div className="space-y-4 leading-relaxed whitespace-pre-line text-gray-600">
            {description}
          </div>
        </div>
      </div>

      {/* Care Info Card */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Caring for your Peace Lily</h2>
        <div className="space-y-4">
          {/* Difficulty */}
          <div className="bg-accent-gray rounded-2xl p-4">
            <h3 className="mb-1 text-sm font-bold text-gray-900">Difficulty Level</h3>
            <p className="text-gray-600">{careInfo.difficulty}</p>
          </div>

          {/* Light */}
          <div className="bg-accent-gray rounded-2xl p-4">
            <h3 className="mb-1 text-sm font-bold text-gray-900">Light Requirements</h3>
            <p className="text-gray-600">{careInfo.light}</p>
          </div>

          {/* Water */}
          <div className="bg-accent-gray rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-sm font-bold text-gray-900">Watering Schedule</h3>
                <p className="text-gray-600">{careInfo.water}</p>
              </div>
              <button className="text-gray-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Pet Friendly */}
          <div className="bg-accent-gray rounded-2xl p-4">
            <h3 className="mb-1 text-sm font-bold text-gray-900">Pet friendliness</h3>
            <p className="text-gray-600">{careInfo.petFriendly}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
