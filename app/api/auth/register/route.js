import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Mock Register Logic
        return NextResponse.json({
            user: {
                id: Math.random().toString(36).substr(2, 9),
                name,
                email,
            },
            token: 'mock-jwt-token-register',
        });

    } catch (error) {
        return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
    }
}
