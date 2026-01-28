import PolicySection, { PolicyList, PolicyContact } from '@/components/shared/PolicySection';

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
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-layout">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Privacy Policy</span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-5xl font-bold text-gray-900 sm:text-6xl">
                        Your <span className="text-primary">Privacy</span> Matters
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-gray-600">
                        Learn how we collect, use, and protect your personal information when you visit our site.
                    </p>

                    {/* Last Updated */}
                    <p className="text-sm text-gray-500">
                        Last updated: January 28, 2026
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="space-y-6">
                        {/* Collecting Personal Information */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                            title="Collecting Personal Information"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                When you visit our Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
                            </p>
                            <h3 className="mb-3 text-lg font-bold">Information we collect includes:</h3>
                            <PolicyList items={[
                                'Device Information: IP address, browser type, device type, operating system',
                                'Order Information: Name, billing address, shipping address, payment information, email address, phone number',
                                'Usage Data: Pages visited, time spent on pages, links clicked, referring website'
                            ]} />
                        </PolicySection>

                        {/* How We Use Your Information */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                            title="How We Use Your Information"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                We use the information we collect to:
                            </p>
                            <PolicyList items={[
                                'Process and fulfill your orders',
                                'Communicate with you about your orders and provide customer support',
                                'Screen our orders for potential risk or fraud',
                                'Provide you with information or advertising relating to our products or services',
                                'Improve and optimize our Site'
                            ]} />
                        </PolicySection>

                        {/* Sharing Your Information */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            }
                            title="Sharing Your Information"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                We share your personal information with third parties to help us use your information as described above. For example:
                            </p>
                            <PolicyList items={[
                                'We use payment processors to process payments',
                                'We use shipping companies to deliver your orders',
                                'We use analytics services to understand how customers use our Site',
                                'We may share information to comply with applicable laws and regulations'
                            ]} />
                        </PolicySection>

                        {/* Cookies */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            }
                            title="Cookies"
                        >
                            <p className="text-base leading-relaxed">
                                A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use cookies to remember your preferences, understand how you use our Site, and improve your experience.
                            </p>
                        </PolicySection>

                        {/* Your Rights */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            }
                            title="Your Rights"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                If you are a resident of the UAE or European Economic Area, you have the right to:
                            </p>
                            <PolicyList items={[
                                'Access personal information we hold about you',
                                'Request that we correct or update your personal information',
                                'Request that we delete your personal information',
                                'Object to our processing of your personal information',
                                'Withdraw your consent at any time'
                            ]} />
                            <p className="mt-4 text-base leading-relaxed">
                                To exercise these rights, please contact us using the information below.
                            </p>
                        </PolicySection>

                        {/* Data Retention */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="Data Retention"
                        >
                            <p className="text-base leading-relaxed">
                                When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                            </p>
                        </PolicySection>

                        {/* Changes to Policy */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            }
                            title="Changes to This Policy"
                        >
                            <p className="text-base leading-relaxed">
                                We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons.
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
                                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us:
                            </p>
                            <PolicyContact contacts={[
                                { label: 'Email', value: 'privacy@gardenhub.ae' },
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
