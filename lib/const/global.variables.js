import { getCookie } from '../utils/cookies';

export const GRAPHQL_BASE = process.env.NEXT_PUBLIC_GRAPHQL_BASE;
export const SWAGGER_BASE = process.env.NEXT_PUBLIC_SWAGGER_BASE;
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_place_key_here";
export const CURRENCY = ' AED';
export const LOCALES = ['en', 'ar'];
export const TAX_RATE = 0.05;

// Helper functions to get fresh cookie values
export const getGuestCustomerId = () => getCookie('guest_customer_id');
export const getGuestToken = () => getCookie('guest_token');
export const getGuestEmail = () => getCookie('guest_email');
export const getUserToken = () => getCookie('token');
