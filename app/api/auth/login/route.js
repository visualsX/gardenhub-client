import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Mock Login Logic
        if (email === 'test@example.com' && password === 'password') {
            return NextResponse.json({
                user: {
                    id: '1',
                    name: 'Test User',
                    email: 'test@example.com',
                },
                token: 'mock-jwt-token-12345',
            });
        }

        // Accept any login for now for ease of testing
        return NextResponse.json({
            user: {
                id: '1',
                name: 'Demo User',
                email: email,
            },
            token: 'mock-jwt-token-demo',
        });

    } catch (error) {
        return NextResponse.json({ message: 'Login failed' }, { status: 500 });
    }
}
