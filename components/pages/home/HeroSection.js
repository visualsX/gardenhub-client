export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070)',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-layout flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-6xl lg:text-7xl">
              Fresh Indoor Plants,
              <br />
              Delivered to Your Home.
            </h1>
            <p className="mb-8 text-lg text-white md:text-xl">
              Discover hand-picked plants perfect for beginners, collectors, and cozy spaces.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="bg-primary hover:border-primary-dark hover:bg-primary-dark border-primary rounded-full border-2 px-8 py-3 font-semibold text-white transition-all">
                Shop Plants
              </button>
              <button className="rounded-full border-2 border-gray-500 bg-transparent px-8 py-3 font-semibold text-white backdrop-blur-[2px] transition-all hover:backdrop-blur-xs">
                Explore Collections
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
