import Link from 'next/link';

export const metadata = {
  title: 'About Us - GardenHub',
  description:
    'Learn about GardenHub - your trusted source for premium indoor and outdoor plants across the UAE. Discover our mission to bring nature to your doorstep.',
  openGraph: {
    title: 'About Us | GardenHub',
    description:
      'Learn about GardenHub - your trusted source for premium indoor and outdoor plants across the UAE.',
    type: 'website',
  },
};

// Icon Components
const PlantIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const HeartIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const TruckIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
    />
  </svg>
);

const LightBulbIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const SparklesIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

export default function AboutPage() {
  const features = [
    {
      icon: <LeafIcon />,
      title: 'Premium Quality',
      description:
        'All our plants are carefully selected and nurtured to ensure they arrive healthy and thriving.',
      color: 'bg-primary',
    },
    {
      icon: <TruckIcon />,
      title: 'Fast Delivery',
      description:
        'Quick and reliable delivery across the UAE, with same-day options available in select areas.',
      color: 'bg-primary',
    },
    {
      icon: <LightBulbIcon />,
      title: 'Expert Guidance',
      description:
        'Our team is always ready to help you choose the right plants and provide care tips.',
      color: 'bg-primary',
    },
    {
      icon: <GlobeIcon />,
      title: 'Sustainable',
      description:
        'We source from local farms and use eco-friendly packaging to minimize our environmental impact.',
      color: 'bg-primary',
    },
    {
      icon: <SparklesIcon />,
      title: 'Wide Selection',
      description:
        'From easy-care succulents to statement indoor trees, we have plants for every space and skill level.',
      color: 'bg-primary',
    },
    {
      icon: <ShieldIcon />,
      title: 'Plant Guarantee',
      description: 'We stand behind our plants with a health guarantee and hassle-free returns.',
      color: 'bg-primary',
    },
  ];

  const team = [
    {
      name: 'Ahmed Al Mansouri',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Passionate about bringing greenery to urban spaces',
    },
    {
      name: 'Sara Johnson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Expert in logistics and customer satisfaction',
    },
    {
      name: 'Mohammed Hassan',
      role: 'Chief Horticulturist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: '15+ years of experience in plant care and cultivation',
    },
    {
      name: 'Layla Ahmed',
      role: 'Customer Experience Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Dedicated to making every customer journey delightful',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-layout">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            <PlantIcon />
            <span>About GardenHub</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-gray-900 sm:text-6xl">
            Bringing Nature to <span className="text-primary">Your Doorstep</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            We're passionate about bringing the beauty of nature into your home and outdoor spaces.
            GardenHub is your trusted partner for premium plants and gardening essentials across the
            UAE.
          </p>
        </section>

        {/* Mission & Vision Cards */}
        <section className="mb-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl border border-gray-300 bg-white p-8 transition-all hover:shadow-lg">
              <div className="bg-primary/5 absolute -top-10 -right-10 h-40 w-40 rounded-full"></div>
              <div className="bg-primary/5 absolute -bottom-10 -left-10 h-40 w-40 rounded-full"></div>
              <div className="relative">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
                  <PlantIcon />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="leading-relaxed text-gray-600">
                  To make plant ownership accessible and enjoyable for everyone. We believe that
                  everyone deserves to experience the joy and benefits of living with plants,
                  whether you're a seasoned gardener or just starting your green journey.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-gray-300 bg-white p-8 transition-all hover:shadow-lg">
              <div className="bg-primary/5 absolute -top-10 -right-10 h-40 w-40 rounded-full"></div>
              <div className="bg-primary/5 absolute -bottom-10 -left-10 h-40 w-40 rounded-full"></div>
              <div className="relative">
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
                  <HeartIcon />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Vision</h2>
                <p className="leading-relaxed text-gray-600">
                  To create greener, healthier living spaces across the UAE. We envision a future
                  where every home and office is enriched with thriving plants, contributing to
                  better air quality, mental well-being, and a deeper connection with nature.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Why Choose GardenHub?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md"
              >
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.color} text-white transition-transform group-hover:scale-110 group-hover:rotate-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-primary rounded-3xl p-12 text-white">
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div className="group">
                <div className="mb-2 text-5xl font-bold transition-transform group-hover:scale-110">
                  7000+
                </div>
                <div className="text-lg text-green-100">Happy Customers</div>
              </div>
              <div className="group">
                <div className="mb-2 text-5xl font-bold transition-transform group-hover:scale-110">
                  7000+
                </div>
                <div className="text-lg text-green-100">Plants Delivered</div>
              </div>
              <div className="group">
                <div className="mb-2 text-5xl font-bold transition-transform group-hover:scale-110">
                  8+
                </div>
                <div className="text-lg text-green-100">Partner Farms</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              The passionate people behind GardenHub, dedicated to bringing you the best plants and
              service
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl bg-white transition-all hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>
                <div className="border border-t-0 border-gray-200 p-5">
                  <h3 className="mb-1 text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary mb-2 text-sm font-semibold">{member.role}</p>
                  <p className="text-sm leading-relaxed text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="rounded-3xl border border-gray-300 bg-white p-12">
            <h2 className="text-primary mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Start Your Green Journey?
            </h2>
            <p className="mb-8 text-lg text-black">
              Explore our collection and find the perfect plants for your space.
            </p>
            <Link
              href="/shop"
              className="bg-primary! hover:bg-primary-dark! inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white! shadow-lg transition-all hover:scale-105 hover:shadow-xl!"
            >
              Shop Now
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
