'use server';

import { getServerMyOrders } from './server-orders';

/**
 * Server action to fetch more orders for infinite scroll
 */
export async function fetchMoreOrdersAction({ after, where, first = 10 }) {
  try {
    const data = await getServerMyOrders({ first, after, where });
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error in fetchMoreOrdersAction:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
