import PolicySection, { PolicyList, PolicyContact } from '@/components/shared/PolicySection';
import PolicyPageHeader from '@/components/shared/PolicyPageHeader';

export const metadata = {
  title: 'Shipping Policy - GardenHub',
  description:
    'We take great care in packaging and shipping your plants to ensure they arrive healthy and thriving.',
  openGraph: {
    title: 'Fast & Reliable Delivery | GardenHub',
    description:
      'We take great care in packaging and shipping your plants to ensure they arrive healthy and thriving.',
    type: 'website',
    images: ['/og-shipping-policy.png'],
  },
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-layout">
        <PolicyPageHeader
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
          }
          badge="Shipping Policy"
          title="Fast & Reliable"
          titleAccent="Delivery"
          subtitle="We take great care in packaging and shipping your plants to ensure they arrive healthy and thriving."
          lastUpdated="January 28, 2026"
        />

        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {/* Shipping Areas */}
            <PolicySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Shipping Areas"
            >
              <p className="mb-6 text-base leading-relaxed">
                We currently ship to all areas across the United Arab Emirates, including:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  'Dubai',
                  'Abu Dhabi',
                  'Sharjah',
                  'Ajman',
                  'Ras Al Khaimah',
                  'Fujairah',
                  'Umm Al Quwain',
                ].map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2"
                  >
                    <div className="bg-primary h-2 w-2 rounded-full"></div>
                    <span className="font-medium text-gray-800">{city}</span>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* Shipping Costs */}
            <PolicySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Shipping Costs"
            >
              <div className="space-y-4">
                <div className="rounded-xl bg-green-50 p-4">
                  <h3 className="mb-1 font-bold text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-600">Orders over AED 199</p>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <h3 className="mb-1 font-bold text-gray-900">Standard</h3>
                  <p className="text-sm text-gray-600">AED 25</p>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <h3 className="mb-1 font-bold text-gray-900">Same-Day</h3>
                  <p className="text-sm text-gray-600">AED 50</p>
                </div>
              </div>
            </PolicySection>

            {/* Order Processing */}
            <PolicySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              }
              title="Order Processing"
            >
              <p className="text-base leading-relaxed">
                All orders are processed within 1-2 business days. Orders are not shipped or
                delivered on weekends or holidays.
              </p>
            </PolicySection>

            {/* Delivery Times */}
            <PolicySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Delivery Times"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-green-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Standard Delivery</h3>
                  <p className="text-sm text-gray-600">
                    2-4 business days from order confirmation.
                  </p>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Same-Day Delivery</h3>
                  <p className="text-sm text-gray-600">Before 12:00 PM in Dubai and Abu Dhabi.</p>
                </div>
                <div className="rounded-xl bg-green-50 p-4">
                  <h3 className="mb-2 font-bold text-gray-900">Remote Areas</h3>
                  <p className="text-sm text-gray-600">5-7 business days delivery time.</p>
                </div>
              </div>
            </PolicySection>

            {/* Plant Packaging */}
            <PolicySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              }
              title="Plant Packaging"
            >
              <p className="mb-4 text-base leading-relaxed">
                We take special care in packaging your plants to ensure they arrive in perfect
                condition:
              </p>
              <PolicyList
                items={[
                  'Plants are secured in their pots to prevent movement',
                  'Protective wrapping around delicate leaves',
                  'Sturdy boxes with ventilation holes',
                  'Cushioning material to prevent damage during transit',
                ]}
              />
            </PolicySection>

            {/* Order Tracking */}
            <PolicySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              title="Order Tracking"
            >
              <p className="text-base leading-relaxed">
                Track your order status through our website or contact customer service.
              </p>
            </PolicySection>

            {/* Contact */}
            <PolicySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              title="Questions?"
            >
              <p className="mb-4 text-base leading-relaxed">
                If you have any questions about shipping, please contact us:
              </p>
              <PolicyContact
                contacts={[
                  { label: 'Email', value: 'shipping@gardenhub.ae' },
                  { label: 'Phone', value: '+971 XX XXX XXXX' },
                ]}
              />
            </PolicySection>
          </div>
        </div>
      </div>
    </div>
  );
}
