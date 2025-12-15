import { useMutation } from '@tanstack/react-query';
import client from '@/lib/api/client';
import useAuth from '@/lib/store/auth';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
    const setAuth = useAuth((state) => state.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await client.post('/Authentication/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            setAuth(data.user, data.token);
            message.success('Login successful!');
            router.push('/');
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Login failed');
        },
    });
};

export const useRegister = () => {
    const setAuth = useAuth((state) => state.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: async (userData) => {
            const { data } = await client.post('/Authentication/register', userData);
            return data;
        },
        onSuccess: (data) => {
            setAuth(data.user, data.token);
            message.success('Registration successful!');
            router.push('/auth/login');
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Registration failed');
        },
    });
};

export const useInitiateGoogleLogin = () => {
    return useMutation({
        mutationFn: async ({ returnUrl }) => {
            // Call the endpoint to get the redirect URL
            const { data } = await client.get('/Authentication/external-login', {
                params: {
                    provider: 'Google',
                    returnUrl,
                },
            });
            return data;
        },
        onSuccess: (data) => {
            if (data?.url) {
                // Navigate to the returned URL
                window.location.href = data.url;
            } else {
                message.error('Failed to get login URL');
            }
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Failed to initiate Google login');
        },
    });
};


export const useGoogleLogin = () => {
    const setAuth = useAuth((state) => state.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: async (code) => {
            const { data } = await client.post('/Authentication/login-with-code', {
                code
            });
            return data;
        },
        onSuccess: (data) => {
            // Response: { userId, token, userName, isFirstTimeAccess }
            setAuth({ id: data.userId, name: data.userName }, data.token);
            message.success(`Welcome ${data.userName}!`);
            router.push('/');
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Google login failed');
        },
    });
};
