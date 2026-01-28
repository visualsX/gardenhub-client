import PolicySection, { PolicyList, PolicyContact } from '@/components/shared/PolicySection';

export const metadata = {
    title: 'Terms of Service - GardenHub',
    description:
        'Read GardenHub Terms of Service. Learn about the terms and conditions that govern your use of our website and services.',
    openGraph: {
        title: 'Our Terms & Conditions | GardenHub',
        description:
            'Read GardenHub Terms of Service. Learn about the terms and conditions that govern your use of our website and services.',
        type: 'website',
        images: ['/og-terms-of-service.png'],
    },
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-layout">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Terms of Service</span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-5xl font-bold text-gray-900 sm:text-6xl">
                        Our <span className="text-primary">Terms</span> & Conditions
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-gray-600">
                        Please read these terms carefully before using our website and services.
                    </p>

                    {/* Last Updated */}
                    <p className="text-sm text-gray-500">
                        Last updated: January 28, 2026
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="space-y-6">
                        {/* Introduction */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="Welcome to GardenHub"
                        >
                            <p className="text-base leading-relaxed">
                                These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
                            </p>
                        </PolicySection>

                        {/* Use of Website */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            }
                            title="Use of Website"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                By using our website, you agree to:
                            </p>
                            <PolicyList items={[
                                'Provide accurate and complete information when creating an account',
                                'Maintain the security of your account credentials',
                                'Use the website only for lawful purposes',
                                'Not engage in any activity that disrupts or interferes with our services',
                                'Not attempt to gain unauthorized access to our systems'
                            ]} />
                        </PolicySection>

                        {/* Products and Services */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            }
                            title="Products and Services"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                We strive to provide accurate product descriptions and images. However:
                            </p>
                            <PolicyList items={[
                                'Product colors may vary slightly due to screen settings',
                                'Plant sizes are approximate and may vary naturally',
                                'We reserve the right to limit quantities or refuse orders',
                                'Prices are subject to change without notice',
                                'We are not responsible for typographical errors'
                            ]} />
                        </PolicySection>

                        {/* Orders and Payment */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            }
                            title="Orders and Payment"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                When you place an order:
                            </p>
                            <PolicyList items={[
                                'You are making an offer to purchase products',
                                'We reserve the right to accept or decline your order',
                                'Payment must be received before order processing',
                                'All prices are in UAE Dirhams (AED)',
                                'You are responsible for any applicable taxes'
                            ]} />
                        </PolicySection>

                        {/* Intellectual Property */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            }
                            title="Intellectual Property"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                All content on this website, including text, graphics, logos, images, and software, is the property of GardenHub and is protected by copyright and other intellectual property laws. You may not:
                            </p>
                            <PolicyList items={[
                                'Reproduce, distribute, or modify our content without permission',
                                'Use our trademarks or branding without authorization',
                                'Create derivative works from our content'
                            ]} />
                        </PolicySection>

                        {/* Limitation of Liability */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            }
                            title="Limitation of Liability"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                To the fullest extent permitted by law:
                            </p>
                            <PolicyList items={[
                                'GardenHub shall not be liable for any indirect, incidental, or consequential damages',
                                'Our total liability shall not exceed the amount you paid for the product',
                                'We are not responsible for delays or failures due to circumstances beyond our control',
                                'Plant care and survival after delivery is the customer\'s responsibility'
                            ]} />
                        </PolicySection>

                        {/* User Content */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            }
                            title="User Content"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                If you submit reviews, comments, or other content:
                            </p>
                            <PolicyList items={[
                                'You grant us a non-exclusive license to use, reproduce, and display your content',
                                'You represent that you own or have rights to the content',
                                'Your content must not violate any laws or third-party rights',
                                'We reserve the right to remove any content at our discretion'
                            ]} />
                        </PolicySection>

                        {/* Governing Law */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            }
                            title="Governing Law"
                        >
                            <p className="text-base leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                            </p>
                        </PolicySection>

                        {/* Changes to Terms */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            }
                            title="Changes to Terms"
                        >
                            <p className="text-base leading-relaxed">
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified Terms.
                            </p>
                        </PolicySection>

                        {/* Contact */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            }
                            title="Contact Us"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <PolicyContact contacts={[
                                { label: 'Email', value: 'legal@gardenhub.ae' },
                                { label: 'Phone', value: '+971 XX XXX XXXX' },
                                { label: 'Address', value: 'Dubai, United Arab Emirates' }
                            ]} />
                        </PolicySection>
                    </div>
                </div>
            </div>
        </div>
    );
}
