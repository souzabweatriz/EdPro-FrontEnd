import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const JWT_CONFIG = {
    issuer: "minha-aplicacao",
    audience: "meus-usuarios",
};

const protectedRoutes = {
    "/admin": ["admin"],
    "/alunos": ["aluno"],
};

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    const routeConfig = Object.entries(protectedRoutes).find(([route, roles]) =>
        pathname.startsWith(route)
    );

    if (!routeConfig) {
        return NextResponse.next();
    }

    const token =
        request.cookies.get("auth-token")?.value ||
        request.headers.get("Authorization")?.slice(7);

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
    matcher: ["/alunos/:path*", "/admin/:path*"],
};