import Link from 'next/link';

export default function NotFoundSnippet() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-primary text-9xl font-bold">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-600">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-primary! hover:bg-primary-dark! mt-8 rounded-full px-8 py-3 font-semibold text-white! transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}
