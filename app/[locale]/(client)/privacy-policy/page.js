export const metadata = {
    title: 'Privacy Policy - GardenHub',
    description:
        'Learn how GardenHub collects, uses, and protects your personal information when you visit our site or make a purchase.',
    openGraph: {
        title: 'Privacy Policy | GardenHub',
        description:
            'Learn how GardenHub collects, uses, and protects your personal information when you visit our site or make a purchase.',
        type: 'website',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="max-layout min-h-screen pt-32 pb-20">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
                    Privacy Policy
                </h1>
                <p className="mb-12 text-center text-sm text-gray-500">
                    Last updated: January 28, 2026
                </p>

                <div className="prose prose-gray max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <p className="text-base leading-relaxed text-gray-600">
                            This Privacy Policy describes how GardenHub ("we", "us", or "our") collects, uses, and discloses your personal information when you visit or make a purchase from our website.
                        </p>
                    </section>

                    {/* Collecting Personal Information */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">📋</span>
                            Collecting Personal Information
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                When you visit our Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
                            </p>
                            <div className="mt-4">
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Information we collect includes:</h3>
                                <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                    <li><strong>Device Information:</strong> IP address, browser type, device type, operating system</li>
                                    <li><strong>Order Information:</strong> Name, billing address, shipping address, payment information, email address, phone number</li>
                                    <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, referring website</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🔍</span>
                            How We Use Your Information
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                We use the information we collect to:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Process and fulfill your orders</li>
                                <li>Communicate with you about your orders and provide customer support</li>
                                <li>Screen our orders for potential risk or fraud</li>
                                <li>Provide you with information or advertising relating to our products or services</li>
                                <li>Improve and optimize our Site</li>
                            </ul>
                        </div>
                    </section>

                    {/* Sharing Your Information */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🔗</span>
                            Sharing Your Information
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                We share your personal information with third parties to help us use your information as described above. For example:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>We use payment processors to process payments</li>
                                <li>We use shipping companies to deliver your orders</li>
                                <li>We use analytics services to understand how customers use our Site</li>
                                <li>We may share information to comply with applicable laws and regulations</li>
                            </ul>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🍪</span>
                            Cookies
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use cookies to remember your preferences, understand how you use our Site, and improve your experience.
                            </p>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">⚖️</span>
                            Your Rights
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                If you are a resident of the UAE or European Economic Area, you have the right to:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-600">
                                <li>Access personal information we hold about you</li>
                                <li>Request that we correct or update your personal information</li>
                                <li>Request that we delete your personal information</li>
                                <li>Object to our processing of your personal information</li>
                                <li>Withdraw your consent at any time</li>
                            </ul>
                            <p className="mt-4 text-base leading-relaxed text-gray-600">
                                To exercise these rights, please contact us using the information below.
                            </p>
                        </div>
                    </section>

                    {/* Data Retention */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">⏰</span>
                            Data Retention
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                            </p>
                        </div>
                    </section>

                    {/* Changes to Policy */}
                    <section className="mb-12">
                        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="text-primary">🔄</span>
                            Changes to This Policy
                        </h2>
                        <div className="bg-accent-gray space-y-4 rounded-2xl p-6">
                            <p className="text-base leading-relaxed text-gray-600">
                                We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons.
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
                                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us:
                            </p>
                            <div className="mt-4 space-y-2 text-gray-600">
                                <p><strong>Email:</strong> privacy@gardenhub.ae</p>
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
