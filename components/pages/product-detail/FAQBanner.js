export default function FAQBanner() {
  return (
    <div className="relative my-12 overflow-hidden bg-gray-900 py-32 text-white">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1669024808541-71f502ac6e42)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-layout relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="mb-2 text-4xl font-bold">Got Questions?</h2>
          <p className="text-lg text-gray-200">We got the answers.</p>
        </div>
        <button className="text-primary rounded-full bg-white px-8 py-3 font-bold transition-transform hover:scale-105">
          View All FAQs
        </button>
      </div>
    </div>
  );
}
