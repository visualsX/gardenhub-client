export const metadata = {
    title: 'Shipping Policy - GardenHub',
    description:
        'Learn about GardenHub shipping options, delivery times, and shipping costs for your plant orders across the UAE.',
    openGraph: {
        title: 'Shipping Policy | GardenHub',
        description:
            'Learn about GardenHub shipping options, delivery times, and shipping costs for your plant orders across the UAE.',
        type: 'website',
    },
};

export default function ShippingPolicyPage() {
    return (
        <div className="max-layout min-h-screen pt-32 pb-20">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
                    Shipping Policy
                </h1>
                <p className="mb-12 text-center text-sm text-gray-500">
                    Last updated: January 28, 2026
                </p>

                <div className="prose prose-gray max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <p className="text-base leading-relaxed text-gray-600">
                            At GardenHub, we take great care in packaging and shipping your plants to ensure they arrive healthy and thriving. This policy outlines our shipping practices, delivery times, and what you can expect when ordering from us.
                        </p>
                    </section>

                    {/* Shipping Areas */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🌍</span>
                            Shipping Areas
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                We currently ship to all areas across the United Arab Emirates, including:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Dubai</li>
                                <li>Abu Dhabi</li>
                                <li>Sharjah</li>
                                <li>Ajman</li>
                                <li>Ras Al Khaimah</li>
                                <li>Fujairah</li>
                                <li>Umm Al Quwain</li>
                            </ul>
                        </div>
                    </section>

                    {/* Delivery Times */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">⏱️</span>
                            Delivery Times
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Standard Delivery</h3>
                                    <p className="text-base leading-relaxed text-gray-600">
                                        Orders are typically delivered within 2-4 business days from the date of order confirmation.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Same-Day Delivery</h3>
                                    <p className="text-base leading-relaxed text-gray-600">
                                        Available for orders placed before 12:00 PM in select areas of Dubai and Abu Dhabi. Additional charges may apply.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Remote Areas</h3>
                                    <p className="text-base leading-relaxed text-gray-600">
                                        Delivery to remote areas may take 5-7 business days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Shipping Costs */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">💰</span>
                            Shipping Costs
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li><strong>Free Shipping:</strong> On all orders over AED 199</li>
                                <li><strong>Standard Shipping:</strong> AED 25 for orders under AED 199</li>
                                <li><strong>Same-Day Delivery:</strong> AED 50 (where available)</li>
                                <li><strong>Large Plants:</strong> Additional charges may apply for oversized items</li>
                            </ul>
                        </div>
                    </section>

                    {/* Order Processing */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">📦</span>
                            Order Processing
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. You will receive a confirmation email with tracking information once your order has been shipped.
                            </p>
                        </div>
                    </section>

                    {/* Packaging */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🌱</span>
                            Plant Packaging
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                We take special care in packaging your plants to ensure they arrive in perfect condition:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Plants are secured in their pots to prevent movement</li>
                                <li>Protective wrapping around delicate leaves</li>
                                <li>Sturdy boxes with ventilation holes</li>
                                <li>Cushioning material to prevent damage during transit</li>
                            </ul>
                        </div>
                    </section>

                    {/* Tracking */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">📍</span>
                            Order Tracking
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                Once your order ships, you will receive a tracking number via email. You can track your order status through our website or by contacting our customer service team.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">📧</span>
                            Questions?
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                If you have any questions about shipping, please contact us:
                            </p>
                            <div className="mt-4 space-y-2 text-gray-600">
                                <p><strong>Email:</strong> shipping@gardenhub.ae</p>
                                <p><strong>Phone:</strong> +971 XX XXX XXXX</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
