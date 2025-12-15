import axios from 'axios';

// Create an Axios instance
const client = axios.create({
    baseURL: "https://api.gardenhub.ae/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
client.interceptors.request.use(
    (config) => {
        // We will retrieve the token from the store (localStorage via Zustand persist)
        // For now, let's try to get it from localStorage directly to avoid circular dependencies with the store if strictly needed
        // Or we can import the store outside.
        // A common pattern is to let the store handle the token setting, specifically by setting `Defaults.headers` on login.
        // But reading from localStorage is safer for persistence across reloads before hydration.
        if (typeof window !== 'undefined') {
            const storage = localStorage.getItem('auth-storage');
            if (storage) {
                try {
                    const { state } = JSON.parse(storage);
                    if (state?.token) {
                        config.headers.Authorization = `Bearer ${state.token}`;
                    }
                } catch (e) {
                    // Ignore parse errors
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
client.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 (Unauthorized) -> maybe redirect to login or clear store?
        // specific logic can be added here
        return Promise.reject(error);
    }
);

export default client;
