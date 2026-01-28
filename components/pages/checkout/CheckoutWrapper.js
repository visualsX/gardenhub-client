'use client';

import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/lib/stripe';

export default function CheckoutWrapper({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
