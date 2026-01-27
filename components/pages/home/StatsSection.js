'use client';

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: '7000+',
      label: 'Happy plant parents',
      description: 'Into beautiful, thriving spaces across the UAE.',
    },
    {
      id: 2,
      value: '7000+',
      label: 'Plants grown',
      description: 'Nurtured with love, from seedlings to full bloom.',
    },
    {
      id: 3,
      value: '8+',
      label: 'Farms in UAE',
      description: 'Locally sourced from trusted, sustainable growers.',
    },
  ];

  return (
    <section className="relative w-full py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1653842647992-b584fb66b362"
          alt="Greenhouse background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-layout relative z-10">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex min-h-[160px] flex-col justify-center rounded-2xl bg-white p-6 shadow-sm sm:min-h-[250px] sm:p-8"
            >
              <span className="text-primary mb-1 text-3xl font-bold sm:mb-2 sm:text-4xl lg:text-[64px]">
                {stat.value}
              </span>
              <h3 className="mb-1 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg lg:text-xl">
                {stat.label}
              </h3>
              <p className="text-xs leading-relaxed text-gray-500 sm:text-sm lg:text-base">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
