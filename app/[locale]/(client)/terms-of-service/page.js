export const metadata = {
    title: 'Terms of Service - GardenHub',
    description:
        'Read GardenHub Terms of Service. Learn about the terms and conditions that govern your use of our website and services.',
    openGraph: {
        title: 'Terms of Service | GardenHub',
        description:
            'Read GardenHub Terms of Service. Learn about the terms and conditions that govern your use of our website and services.',
        type: 'website',
    },
};

export default function TermsOfServicePage() {
    return (
        <div className="max-layout min-h-screen pt-32 pb-20">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
                    Terms of Service
                </h1>
                <p className="mb-12 text-center text-sm text-gray-500">
                    Last updated: January 28, 2026
                </p>

                <div className="prose prose-gray max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <p className="text-base leading-relaxed text-gray-600">
                            Welcome to GardenHub. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
                        </p>
                    </section>

                    {/* Use of Website */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🌐</span>
                            Use of Website
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                By using our website, you agree to:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Provide accurate and complete information when creating an account</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Use the website only for lawful purposes</li>
                                <li>Not engage in any activity that disrupts or interferes with our services</li>
                                <li>Not attempt to gain unauthorized access to our systems</li>
                            </ul>
                        </div>
                    </section>

                    {/* Products and Services */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🛒</span>
                            Products and Services
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <div className="space-y-4">
                                <p className="text-base leading-relaxed text-gray-600">
                                    We strive to provide accurate product descriptions and images. However:
                                </p>
                                <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                    <li>Product colors may vary slightly due to screen settings</li>
                                    <li>Plant sizes are approximate and may vary naturally</li>
                                    <li>We reserve the right to limit quantities or refuse orders</li>
                                    <li>Prices are subject to change without notice</li>
                                    <li>We are not responsible for typographical errors</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Orders and Payment */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">💳</span>
                            Orders and Payment
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                When you place an order:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>You are making an offer to purchase products</li>
                                <li>We reserve the right to accept or decline your order</li>
                                <li>Payment must be received before order processing</li>
                                <li>All prices are in UAE Dirhams (AED)</li>
                                <li>You are responsible for any applicable taxes</li>
                            </ul>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">©️</span>
                            Intellectual Property
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                All content on this website, including text, graphics, logos, images, and software, is the property of GardenHub and is protected by copyright and other intellectual property laws. You may not:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Reproduce, distribute, or modify our content without permission</li>
                                <li>Use our trademarks or branding without authorization</li>
                                <li>Create derivative works from our content</li>
                            </ul>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">⚠️</span>
                            Limitation of Liability
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                To the fullest extent permitted by law:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>GardenHub shall not be liable for any indirect, incidental, or consequential damages</li>
                                <li>Our total liability shall not exceed the amount you paid for the product</li>
                                <li>We are not responsible for delays or failures due to circumstances beyond our control</li>
                                <li>Plant care and survival after delivery is the customer's responsibility</li>
                            </ul>
                        </div>
                    </section>

                    {/* User Content */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">💬</span>
                            User Content
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                If you submit reviews, comments, or other content:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>You grant us a non-exclusive license to use, reproduce, and display your content</li>
                                <li>You represent that you own or have rights to the content</li>
                                <li>Your content must not violate any laws or third-party rights</li>
                                <li>We reserve the right to remove any content at our discretion</li>
                            </ul>
                        </div>
                    </section>

                    {/* Governing Law */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">⚖️</span>
                            Governing Law
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                            </p>
                        </div>
                    </section>

                    {/* Changes to Terms */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🔄</span>
                            Changes to Terms
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified Terms.
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
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <div className="mt-4 space-y-2 text-gray-600">
                                <p><strong>Email:</strong> legal@gardenhub.ae</p>
                                <p><strong>Phone:</strong> +971 XX XXX XXXX</p>
                                <p><strong>Address:</strong> Dubai, United Arab Emirates</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
