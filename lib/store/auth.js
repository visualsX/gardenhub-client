import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuth = create(
    persist(
        (set) => ({
            user: null,
            token: null,

            // Actions
            setAuth: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage', // unique name
            // partialize: (state) => ({ user: state.user, token: state.token }),
        }
    )
);

export default useAuth;
