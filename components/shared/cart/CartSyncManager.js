'use client';

import { useEffect, useRef } from 'react';
import useAuth from '@/lib/store/auth';
import useCartStore from '@/lib/store/cart';
import { useSyncCart } from '@/hooks/cart/useCart';

export default function CartSyncManager() {
    const { token } = useAuth();
    const { sessionToken, items: localItems } = useCartStore();
    const syncCart = useSyncCart();
    const isSyncingRef = useRef(false);

    useEffect(() => {
        // Condition for background sync:
        // 1. User is not logged in (handled by auth token)
        // 2. We have a sessionToken/guestToken from a previous or current guest creation
        // 3. We have items in our local Zustand store that need saving to the backend
        // 4. We aren't already in the middle of a sync
        if (!token && sessionToken && localItems.length > 0 && !isSyncingRef.current && !syncCart.isPending) {
            console.log('Background Sync: Found guest items and sessionToken. Syncing to backend...');
            isSyncingRef.current = true;

            syncCart.mutate({
                sessionToken,
                items: localItems
            }, {
                onSettled: () => {
                    isSyncingRef.current = false;
                }
            });
        }
    }, [token, sessionToken, localItems.length, syncCart.isPending, syncCart.mutate]);

    return null; // This component is strictly for background logic
}
