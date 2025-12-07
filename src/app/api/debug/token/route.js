import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

// Dev-only endpoint to inspect the decoded JWT payload without verifying signature.
// Returns 404 in production.
export async function GET(request) {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // try cookie -> Authorization header -> ?token=...
    const cookieToken = request.cookies.get('auth-token')?.value;
    const authHeader = request.headers.get('authorization');
    let token = cookieToken;
    if (!token && authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        token = authHeader.slice(7);
    }
    if (!token) {
        try {
            const url = new URL(request.url);
            token = url.searchParams.get('token') || undefined;
        } catch (e) {
            // ignore
        }
    }

    if (!token) return NextResponse.json({ error: 'Token não fornecido (cookie/Authorization/?token)' }, { status: 400 });

    try {
        const payload = decodeJwt(token);
        return NextResponse.json({ success: true, payload });
    } catch (err) {
        return NextResponse.json({ error: err?.message || 'Token inválido' }, { status: 400 });
    }
}
