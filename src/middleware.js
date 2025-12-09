import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const JWT_CONFIG = {
    issuer: process.env.JWT_ISSUER || "minha-aplicacao",
    audience: process.env.JWT_AUDIENCE || "app-users",
};

const protectedRoutes = {
    "/admin": ["admin"],
    "/aluno": ["aluno"],
    "/professor": ["professor"],
    "/profileStudent": ["aluno"],
};

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    const routeConfig = Object.entries(protectedRoutes).find(([route, roles]) =>
        pathname.startsWith(route)
    );

    if (!routeConfig) {
        return NextResponse.next();
    }

    const cookieToken = request.cookies.get("auth-token")?.value;
    const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
    let token = cookieToken;
    if (!token && authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.slice(7);
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, {
            issuer: JWT_CONFIG.issuer,
            audience: JWT_CONFIG.audience,
        });

        if (!routeConfig[1].includes(payload.role)) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Erro ao verificar o token JWT:", error.message);
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("auth-token");
        return response;
    }
}

export const config = {
    matcher: ["/aluno/:path*", "/Homeadmin/:path*", "/professor/:path*", "/profileStudent/:path*"],
};