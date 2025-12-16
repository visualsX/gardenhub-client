'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="mt-4 text-3xl font-semibold text-gray-600">Page Not Found</h2>
            <p className="mt-2 text-lg text-gray-600">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                href="/"
                className="mt-8 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary-dark"
            >
                Go Back Home
            </Link>
        </div>
    );
}
