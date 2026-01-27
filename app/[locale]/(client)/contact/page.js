import Link from "next/link";

export const metadata = {
    title: 'Contact Us - GardenHub',
    description:
        'Get in touch with GardenHub. We\'re here to help with any questions about our plants, orders, or services.',
    openGraph: {
        title: 'Contact Us | GardenHub',
        description:
            'Get in touch with GardenHub. We\'re here to help with any questions about our plants, orders, or services.',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="max-layout">
                {/* Header */}
                <section className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Get in Touch</h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Have a question or need assistance? We're here to help! Reach out to us through any of the channels below.
                    </p>
                </section>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="bg-accent-gray rounded-3xl p-8">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Send us a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Phone (Optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="+971 XX XXX XXXX"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-[#2d5f3f] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1e3d2a]"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Cards */}
                        <div className="bg-accent-gray rounded-3xl p-8">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Information</h2>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
                                        <a href="mailto:info@gardenhub.ae" className="text-gray-600! hover:text-primary!">
                                            info@gardenhub.ae
                                        </a>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-gray-900">Phone</h3>
                                        <a href="tel:+971XXXXXXXX" className="text-gray-600! hover:text-primary!">
                                            +971 XX XXX XXXX
                                        </a>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-gray-900">Location</h3>
                                        <p className="text-gray-600">Dubai, United Arab Emirates</p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-gray-900">Business Hours</h3>
                                        <p className="text-gray-600">Sunday - Saturday: 9:00 AM - 8:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Link */}
                        <div className="bg-primary-dark rounded-3xl p-8 text-white">
                            <h3 className="mb-3 text-xl font-bold">Have a Quick Question?</h3>
                            <p className="mb-4 text-gray-300">
                                Check out our FAQ page for instant answers to common questions about orders, shipping, and plant care.
                            </p>
                            <Link
                                href="/faq"
                                className="inline-flex items-center gap-2 rounded-full bg-white! px-6! py-2.5! font-semibold text-primary! transition-colors hover:bg-gray-100!"
                            >
                                Visit FAQ
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
