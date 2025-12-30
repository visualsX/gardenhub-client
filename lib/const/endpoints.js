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
};
