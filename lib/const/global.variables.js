import { getCookie } from '../utils/cookies';

export const GRAPHQL_BASE = 'https://api.gardenhub.ae/graphql/';
export const SWAGGER_BASE = 'https://api.gardenhub.ae/api';
export const CURRENCY = ' AED';
export const LOCALES = ['en', 'ar'];
export const TAX_RATE = 0.05;

export const GUEST_CUSTOMER_ID = getCookie('guest_customer_id');
export const GUEST_TOKEN = getCookie('guest_token');
export const GUEST_EMAIL = getCookie('guest_email');
export const USER_TOKEN = getCookie('token');
