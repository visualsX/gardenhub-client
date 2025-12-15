import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req) {
    const { pathname } = req.nextUrl;

    // Check if user is authenticated
    const token = req.cookies.get('token')?.value;

    // Define auth routes (regex to match /auth/login, /en/auth/login, etc.)
    const isAuthRoute = /\/auth\/(login|register)/.test(pathname);

    if (isAuthRoute && token) {
        // Redirect to home if logged in and trying to access auth pages
        return NextResponse.redirect(new URL('/', req.url));
    }

    return intlMiddleware(req);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};