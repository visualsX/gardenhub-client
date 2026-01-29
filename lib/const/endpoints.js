export const API_ENDPOINTS = {
  // Auth Endpoints
  AUTH: {
    LOGIN: '/Authentication/login',
    REGISTER: '/Authentication/register',
    EXTERNAL_LOGIN: '/Authentication/external-login',
    LOGIN_WITH_CODE: '/Authentication/login-with-code',
  },
  CUSTOMER: {
    PROFILE: '/Customer/profile',
    DELETE_ACCOUNT: '/Customer/delete-account',
    ADDRESS: '/Customer/address',
    DEFAULT_BILLING_ADDRESS: '/default-billing', // Appended to address/{id}
    DEFAULT_SHIPPING_ADDRESS: '/default-shipping', // Appended to address/{id}
  },
  CART: {
    GET: '/cart',
    COUNT: '/cart/count',
    ADD: '/cart/add',
    ITEMS: '/cart/items',
    CLEAR: '/cart/clear',
  },
  ORDER: {
    CREATE: '/Order',
    SHIPPING_RATES: '/Order/shipping-rates',
    PAYMENT_METHODS: '/Order/payment-methods',
    NOTES: (id) => `/Order/${id}/notes`,
  },
  REVIEW: {
    CREATE: '/Review',
    UPDATE: '/Review', // used with /{id}
  },
  CHECKOUT_GUEST: {
    CREATE: '/checkout/guest/create',
    CONVERT: '/checkout/guest/convert',
    CAN_CONVERT: '/checkout/guest/can-convert',
  },
};
