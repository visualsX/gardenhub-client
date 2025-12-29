import Collapse from '@/components/shared/Collapse';
import Link from 'next/link';
import GardenHubIcon from '@/public/all/gardenhub.svg';
import CartIcon from '@/public/all/shopping-cart.svg';
import BoxIcon from '@/public/all/box.svg';
import MessageIcon from '@/public/all/messages.svg';
import MailIcon from '@/public/all/mail-gray.svg';
import CallIcon from '@/public/all/call-gray.svg';

const categoriesData = [
  {
    title: 'About GardenHub',
    questions: [
      {
        q: 'What is gardenHub?',
        a: 'GardenHub is your premier destination for indoor plants, curated to bring life and joy to your living spaces.',
      },
      {
        q: 'What is gardenHub?',
        a: 'GardenHub is your premier destination for indoor plants, curated to bring life and joy to your living spaces.',
      },
      {
        q: 'What is gardenHub?',
        a: 'GardenHub is your premier destination for indoor plants, curated to bring life and joy to your living spaces.',
      },
    ],
  },
  {
    title: 'Buying Plants Online',
    questions: [
      {
        q: 'How are plants heights measure?',
        a: 'We measure grouped plants from the bottom of the pot to the top of the tallest leaf.',
      },
      {
        q: 'What is gardenHub?',
        a: 'GardenHub is your premier destination for indoor plants, curated to bring life and joy to your living spaces.',
      },
      {
        q: 'What is gardenHub?',
        a: 'GardenHub is your premier destination for indoor plants, curated to bring life and joy to your living spaces.',
      },
    ],
  },
  {
    title: 'Orders, Shipping & Returns',
    questions: [
      {
        q: 'How are plants heights measure?',
        a: 'We measure grouped plants from the bottom of the pot to the top of the tallest leaf.',
      },
      {
        q: 'What is gardenHub?',
        a: 'GardenHub is your premier destination for indoor plants, curated to bring life and joy to your living spaces.',
      },
      {
        q: 'What is gardenHub?',
        a: 'GardenHub is your premier destination for indoor plants, curated to bring life and joy to your living spaces.',
      },
    ],
  },
];

export const metadata = {
  title: 'FAQ - GardenHub',
  description:
    'Find answers to common questions about GardenHub shipping, returns, plant care, and more.',
  openGraph: {
    title: 'Frequently Asked Questions | GardenHub',
    description:
      'Find answers to common questions about GardenHub shipping, returns, plant care, and more.',
    type: 'website',
  },
};

export default function FAQPage() {
  // Map icons to categories
  const categoryIcons = [<GardenHubIcon />, <CartIcon />, <BoxIcon />];

  // Generate JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categoriesData.flatMap((cat) =>
      cat.questions.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <div className="max-layout min-h-screen pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-12 text-center text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>

        {/* Search */}
        <div className="relative mx-auto mb-16 max-w-lg">
          <input
            type="text"
            placeholder="Search FAQ"
            className="focus:border-primary focus:ring-primary w-full rounded-full border border-gray-200 bg-white px-6 py-3 pl-12 text-sm text-gray-900 shadow-sm focus:ring-1 focus:outline-none"
          />
          <svg
            className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categoriesData.map((cat, idx) => (
            <section key={idx}>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-gray-900">{categoryIcons[idx]}</span>
                <h2 className="text-lg font-bold text-gray-900">{cat.title}</h2>
              </div>
              <div className="bg-accent-gray space-y-4 divide-y divide-gray-200 rounded-2xl">
                {cat.questions.map((faq, i) => (
                  <Collapse key={i} title={faq.q}>
                    {faq.a}
                  </Collapse>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {/* Contact Card */}
          <div className="bg-accent-gray flex flex-col justify-between rounded-3xl p-10">
            <div className="mb-8">
              <MessageIcon />
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Didn't find your
                <br />
                question?
              </h3>
              <p className="text-sm text-gray-500">
                We are here to help! Just reach out, and we'll get back to you ASAP.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:abc@gmail.com"
                className="flex items-center gap-3 text-sm font-medium text-gray-900! hover:text-green-700!"
              >
                <MailIcon />
                abc@gmail.com
              </a>
              <a
                href="tel:+94389223444"
                className="flex items-center gap-3 text-sm font-medium text-gray-900! hover:text-green-700!"
              >
                <CallIcon />
                +94389223444
              </a>
            </div>
          </div>

          {/* Promo Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-10 text-white">
            <img
              src="https://plus.unsplash.com/premium_photo-1663011200276-e798ebcbcbd4"
              alt="Plants"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <h3 className="mb-2 text-2xl font-bold">
                Let's grow something
                <br />
                amazing together! 🌱💚
              </h3>
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center rounded-full border border-white/30 bg-white/20! px-6 py-3 text-sm font-semibold text-white! backdrop-blur-sm transition-colors hover:bg-white! hover:text-gray-900!"
                >
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
