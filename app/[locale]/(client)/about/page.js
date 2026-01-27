import Link from "next/link";

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

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-layout">
                {/* Hero Section */}
                <section className="mb-16 text-center">
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                        About GardenHub
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        We're passionate about bringing the beauty of nature into your home and outdoor spaces.
                        GardenHub is your trusted partner for premium plants and gardening essentials across the UAE.
                    </p>
                </section>

                {/* Mission Section */}
                <section className="mb-16">
                    <div className="grid gap-12 md:grid-cols-2">
                        <div className="bg-accent-gray rounded-3xl p-8">
                            <div className="mb-4 text-4xl">🌱</div>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Mission</h2>
                            <p className="leading-relaxed text-gray-600">
                                To make plant ownership accessible and enjoyable for everyone. We believe that everyone deserves
                                to experience the joy and benefits of living with plants, whether you're a seasoned gardener or
                                just starting your green journey.
                            </p>
                        </div>

                        <div className="bg-accent-gray rounded-3xl p-8">
                            <div className="mb-4 text-4xl">💚</div>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Vision</h2>
                            <p className="leading-relaxed text-gray-600">
                                To create greener, healthier living spaces across the UAE. We envision a future where every
                                home and office is enriched with thriving plants, contributing to better air quality, mental
                                well-being, and a deeper connection with nature.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mb-16">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Why Choose GardenHub?</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-accent-gray rounded-2xl p-6 text-center">
                            <div className="mb-4 text-4xl">🌿</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Premium Quality</h3>
                            <p className="text-sm text-gray-600">
                                All our plants are carefully selected and nurtured to ensure they arrive healthy and thriving.
                            </p>
                        </div>

                        <div className="bg-accent-gray rounded-2xl p-6 text-center">
                            <div className="mb-4 text-4xl">🚚</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Fast Delivery</h3>
                            <p className="text-sm text-gray-600">
                                Quick and reliable delivery across the UAE, with same-day options available in select areas.
                            </p>
                        </div>

                        <div className="bg-accent-gray rounded-2xl p-6 text-center">
                            <div className="mb-4 text-4xl">💡</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Expert Guidance</h3>
                            <p className="text-sm text-gray-600">
                                Our team is always ready to help you choose the right plants and provide care tips.
                            </p>
                        </div>

                        <div className="bg-accent-gray rounded-2xl p-6 text-center">
                            <div className="mb-4 text-4xl">🌍</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Sustainable</h3>
                            <p className="text-sm text-gray-600">
                                We source from local farms and use eco-friendly packaging to minimize our environmental impact.
                            </p>
                        </div>

                        <div className="bg-accent-gray rounded-2xl p-6 text-center">
                            <div className="mb-4 text-4xl">✨</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Wide Selection</h3>
                            <p className="text-sm text-gray-600">
                                From easy-care succulents to statement indoor trees, we have plants for every space and skill level.
                            </p>
                        </div>

                        <div className="bg-accent-gray rounded-2xl p-6 text-center">
                            <div className="mb-4 text-4xl">🛡️</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Plant Guarantee</h3>
                            <p className="text-sm text-gray-600">
                                We stand behind our plants with a health guarantee and hassle-free returns.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mb-16">
                    <div className="bg-primary-dark rounded-3xl p-12 text-white">
                        <div className="grid gap-8 text-center md:grid-cols-3">
                            <div>
                                <div className="mb-2 text-4xl font-bold">7000+</div>
                                <div className="text-gray-300">Happy Customers</div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl font-bold">7000+</div>
                                <div className="text-gray-300">Plants Delivered</div>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl font-bold">8+</div>
                                <div className="text-gray-300">Partner Farms</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Start Your Green Journey?</h2>
                    <p className="mb-8 text-gray-600">
                        Explore our collection and find the perfect plants for your space.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 rounded-full bg-primary! px-8! py-3! font-semibold text-white! transition-colors hover:bg-primary-dark!"
                    >
                        Shop Now
                        <svg
                            width="16"
                            height="16"
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
                </section>
            </div>
        </div>
    );
}
