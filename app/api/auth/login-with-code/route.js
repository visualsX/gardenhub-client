import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { code, provider } = body;

        if (!code) {
            return NextResponse.json({ message: 'Code is required' }, { status: 400 });
        }

        // Mock Code Exchange Logic
        // In real app, we would exchange this code with Google for a Token, then find/create user in DB.

        return NextResponse.json({
            user: {
                id: 'google-user-123',
                name: 'Google User',
                email: 'google@example.com',
                picture: 'https://lh3.googleusercontent.com/a-/AOh14Gj...' // Fake
            },
            token: `mock-jwt-token-google-${code}`,
        });

    } catch (error) {
        return NextResponse.json({ message: 'Authentication failed' }, { status: 500 });
    }
}
