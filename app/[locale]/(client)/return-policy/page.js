export const metadata = {
    title: 'Return Policy - GardenHub',
    description:
        'Learn about GardenHub return and refund policy. We offer 14-day returns on eligible items with easy processes.',
    openGraph: {
        title: 'Return Policy | GardenHub',
        description:
            'Learn about GardenHub return and refund policy. We offer 14-day returns on eligible items with easy processes.',
        type: 'website',
    },
};

export default function ReturnPolicyPage() {
    return (
        <div className="max-layout min-h-screen pt-32 pb-20">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
                    Return Policy
                </h1>
                <p className="mb-12 text-center text-sm text-gray-500">
                    Last updated: January 28, 2026
                </p>

                <div className="prose prose-gray max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <p className="text-base leading-relaxed text-gray-600">
                            At GardenHub, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help with our straightforward return and refund policy.
                        </p>
                    </section>

                    {/* Return Window */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">⏰</span>
                            14-Day Return Window
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                You have 14 days from the date of delivery to return eligible items. To be eligible for a return, items must be:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>In their original condition</li>
                                <li>Unused and undamaged</li>
                                <li>In original packaging (for accessories and pots)</li>
                                <li>Accompanied by proof of purchase</li>
                            </ul>
                        </div>
                    </section>

                    {/* What Can Be Returned */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">✅</span>
                            What Can Be Returned
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Eligible for Return:</h3>
                                    <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                        <li>Pots and planters (unused, in original packaging)</li>
                                        <li>Gardening tools and accessories</li>
                                        <li>Seeds (unopened packages only)</li>
                                        <li>Fertilizers and soil (unopened)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Not Eligible for Return:</h3>
                                    <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                        <li>Live plants (except in cases of damage or quality issues)</li>
                                        <li>Opened seed packages</li>
                                        <li>Used or opened fertilizers and soil</li>
                                        <li>Custom or personalized items</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Plant Guarantee */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🌿</span>
                            Plant Health Guarantee
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                While live plants are generally not eligible for return, we guarantee that your plants will arrive healthy and in good condition. If your plant arrives damaged or unhealthy:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Contact us within 48 hours of delivery with photos</li>
                                <li>We will offer a replacement or full refund</li>
                                <li>No need to return the damaged plant</li>
                            </ul>
                        </div>
                    </section>

                    {/* Return Process */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🔄</span>
                            How to Return
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                To initiate a return, please follow these steps:
                            </p>
                            <ol className="ml-6 list-decimal space-y-2 text-gray-600">
                                <li>Contact our customer service team via email or phone</li>
                                <li>Provide your order number and reason for return</li>
                                <li>Receive return authorization and instructions</li>
                                <li>Pack the item securely in its original packaging</li>
                                <li>Ship the item back to us or schedule a pickup</li>
                            </ol>
                        </div>
                    </section>

                    {/* Refunds */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">💳</span>
                            Refunds
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds will be issued to your original payment method. Please note:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Original shipping costs are non-refundable</li>
                                <li>Return shipping costs are the customer's responsibility (unless the item was damaged or defective)</li>
                                <li>It may take additional time for your bank to process the refund</li>
                            </ul>
                        </div>
                    </section>

                    {/* Exchanges */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🔁</span>
                            Exchanges
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                We currently do not offer direct exchanges. If you need a different item, please return the original item for a refund and place a new order for the item you want.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">📧</span>
                            Contact Us
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                If you have any questions about returns or refunds, please contact us:
                            </p>
                            <div className="mt-4 space-y-2 text-gray-600">
                                <p><strong>Email:</strong> returns@gardenhub.ae</p>
                                <p><strong>Phone:</strong> +971 XX XXX XXXX</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
