import PolicySection, { PolicyList, PolicySteps, PolicyGrid, PolicyContact } from '@/components/shared/PolicySection';
import PolicyPageHeader from '@/components/shared/PolicyPageHeader';

export const metadata = {
    title: 'Return Policy - GardenHub',
    description:
        'Learn about GardenHub return and refund policy. We offer 14-day returns on eligible items with easy processes.',
    openGraph: {
        title: 'Easy Returns & Refunds | GardenHub',
        description:
            'Learn about GardenHub return and refund policy. We offer 14-day returns on eligible items with easy processes.',
        type: 'website',
        images: ['/og-return-policy.png'],
    },
};

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-layout">
                <PolicyPageHeader
                    icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    }
                    badge="Return Policy"
                    title="Easy"
                    titleAccent="Returns"
                    subtitle="We want you to be completely satisfied with your purchase. Our straightforward return policy makes it easy."
                    lastUpdated="January 28, 2026"
                />

                <div className="mx-auto max-w-4xl">
                    <div className="space-y-6">
                        {/* Return Window */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="14-Day Return Window"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                You have 14 days from the date of delivery to return eligible items. To be eligible for a return, items must be:
                            </p>
                            <PolicyList items={[
                                'In their original condition',
                                'Unused and undamaged',
                                'In original packaging (for accessories and pots)',
                                'Accompanied by proof of purchase'
                            ]} />
                        </PolicySection>

                        {/* What Can Be Returned */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="What Can Be Returned"
                        >
                            <PolicyGrid columns={[
                                {
                                    title: 'Eligible for Return:',
                                    highlight: true,
                                    items: [
                                        'Pots and planters (unused, in original packaging)',
                                        'Gardening tools and accessories',
                                        'Seeds (unopened packages only)',
                                        'Fertilizers and soil (unopened)'
                                    ]
                                },
                                {
                                    title: 'Not Eligible for Return:',
                                    highlight: false,
                                    items: [
                                        'Live plants (except in cases of damage or quality issues)',
                                        'Opened seed packages',
                                        'Used or opened fertilizers and soil',
                                        'Custom or personalized items'
                                    ]
                                }
                            ]} />
                        </PolicySection>

                        {/* Plant Guarantee */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            }
                            title="Plant Health Guarantee"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                While live plants are generally not eligible for return, we guarantee that your plants will arrive healthy and in good condition. If your plant arrives damaged or unhealthy:
                            </p>
                            <PolicyList items={[
                                'Contact us within 48 hours of delivery with photos',
                                'We will offer a replacement or full refund',
                                'No need to return the damaged plant'
                            ]} />
                        </PolicySection>

                        {/* Return Process */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            }
                            title="How to Return"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                To initiate a return, please follow these steps:
                            </p>
                            <PolicySteps steps={[
                                'Contact our customer service team via email or phone',
                                'Provide your order number and reason for return',
                                'Receive return authorization and instructions',
                                'Pack the item securely in its original packaging',
                                'Ship the item back to us or schedule a pickup'
                            ]} />
                        </PolicySection>

                        {/* Refunds */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            }
                            title="Refunds"
                        >
                            <p className="mb-4 text-base leading-relaxed">
                                Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds will be issued to your original payment method. Please note:
                            </p>
                            <PolicyList items={[
                                'Original shipping costs are non-refundable',
                                'Return shipping costs are the customer\'s responsibility (unless the item was damaged or defective)',
                                'It may take additional time for your bank to process the refund'
                            ]} />
                        </PolicySection>

                        {/* Exchanges */}
                        <PolicySection
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            }
                            title="Exchanges"
                        >
                            <p className="text-base leading-relaxed">
                                We currently do not offer direct exchanges. If you need a different item, please return the original item for a refund and place a new order for the item you want.
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
                                If you have any questions about returns or refunds, please contact us:
                            </p>
                            <PolicyContact contacts={[
                                { label: 'Email', value: 'returns@gardenhub.ae' },
                                { label: 'Phone', value: '+971 XX XXX XXXX' }
                            ]} />
                        </PolicySection>
                    </div>
                </div>
            </div>
        </div>
    );
}
