import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { connect, disconnect } from "@/lib/sqlite/database";
import crypto from "crypto";

// bcryptjs is optional in dev; try dynamic import when needed and fallback to a simple
// sha256-based hash/compare when bcryptjs is not installed. This keeps the API working
// without requiring native deps in the dev environment. NOTE: sha256 fallback is NOT
// intended for production security.

async function tryGetBcrypt() {
    try {
        return await import('bcryptjs');
    } catch (err) {
        return null;
    }
}

function fallbackHash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function fallbackCompare(password, stored) {
    if (!stored) return false;
    // If stored looks like a bcrypt hash ($2a$ or $2b$...), we can't verify it without bcrypt
    if (stored.startsWith('$2')) return false;
    return fallbackHash(password) === stored;
}

const _envSecret = process.env.JWT_SECRET || "dev-secret-change-me";
if (!process.env.JWT_SECRET) {
    console.warn("[auth/route] JWT_SECRET não definido. Usando fallback de desenvolvimento. NÃO usar em produção.");
}
const JWT_SECRET = new TextEncoder().encode(_envSecret);

const JWT_CONFIG = {
    issuer: process.env.JWT_ISSUER || "minha-aplicacao",
    audience: process.env.JWT_AUDIENCE || "app-users",
    // Em dev tokens curtos levam a 401 rápidos; usar variável de ambiente para produção
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

// Cookie com lifetime maior em dev para facilitar testes
const cookieOpts = { httpOnly: true, secure: false, sameSite: "lax", maxAge: 60 * 60 * 24 * 7 };

const createToken = async (payload) =>
    await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt() 
        .setIssuer(JWT_CONFIG.issuer) 
        .setAudience(JWT_CONFIG.audience)
        .setExpirationTime(JWT_CONFIG.expiresIn) 
        .sign(JWT_SECRET); 


const verifyToken = async (token) => {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, {
            issuer: JWT_CONFIG.issuer,
            audience: JWT_CONFIG.audience, 
        });
        return payload;
    } catch {
        return null;
    }
};

const getToken = (request) => {
    // 1) Cookie
    const cookie = request.cookies.get("auth-token")?.value;
    if (cookie) return cookie;

    // 2) Authorization: Bearer <token>
    const auth = request.headers.get("authorization");
    if (auth && auth.toLowerCase().startsWith("bearer ")) return auth.slice(7);

    // 3) Query param ?token=... (conveniência dev)
    try {
        const url = new URL(request.url);
        const q = url.searchParams.get("token");
        if (q) return q;
    } catch (e) {
        // ignore
    }

    return undefined;
};


const error = (message, status = 400) => NextResponse.json({ error: message }, { status });

const authResponse = (user, message, token) => {
    const response = NextResponse.json({
        success: true,
        message,
        token,
        user: {
            id: user.id,
            name: user.name || user.full_name || user.fullName,
            email: user.email,
            role: user.role,
        },
    });
    response.cookies.set("auth-token", token, cookieOpts);
    return response;
};


export async function GET(request) {
    const db = connect();
    try {
        const token = getToken(request);
        if (!token) {
            console.debug('[auth/route] GET /api/auth chamado sem token (cookie/Authorization/query)');
            return error("Não logado: token não encontrado (cookie/Authorization/query)", 401);
        }

        const payload = await verifyToken(token);
        if (!payload) {
            console.debug('[auth/route] GET /api/auth token presente mas inválido/expirado');
            return error("Token inválido ou expirado", 401);
        }

        // full_name is the column used in the seeded DB; map it to `name` for API consumers
        const user = db
            .prepare("SELECT id, email, full_name as name, role FROM users WHERE id = ?")
            .get(payload.userId);
        if (!user) return error("Usuário não encontrado", 404);

        // Retorna dados do usuário (sem senha)
        return NextResponse.json({ success: true, user });
    } catch {
        return error("Erro servidor", 500);
    } finally {
        disconnect(db); // Sempre fecha conexão do banco
    }
}

export async function POST(request) {
    try {
        const { action, ...data } = await request.json();
        return (
            {
                login: handleLogin,
                signup: handleSignup,
                logout: handleLogout,
            }[action]?.(data) || error("Ação inválida")
        ); 
    } catch {
        return error("Erro servidor", 500);
    }
}

async function handleLogin({ email, password }) {
    if (!email || !password) return error("Email e senha obrigatórios");

    const db = connect();
    try {
        const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        const bcrypt = await tryGetBcrypt();
        const passwordOk = bcrypt ? bcrypt.compareSync(password, user?.password || '') : fallbackCompare(password, user?.password || '');
        if (!user || !passwordOk) {
            return error("Credenciais inválidas", 401);
        }

        // normalize name field (some DB seeds use full_name)
        const normalizedUser = { ...user, name: user.name || user.full_name || user.fullName };

        const token = await createToken({
            userId: normalizedUser.id,
            email: normalizedUser.email,
            role: normalizedUser.role,
        });

        return authResponse(normalizedUser, "Login sucesso!", token);
    } finally {
        disconnect(db); 
    }
}

async function handleSignup({ name, email, password }) {
    if (!name || !email || !password) return error("Todos campos obrigatórios");
    if (name.length < 2) return error("Nome muito curto");
    if (password.length < 5) return error("Senha muito curta");

    const db = connect();
    try {
        if (
            db.prepare("SELECT COUNT(*) as count FROM users WHERE email = ?").get(email).count > 0
        ) {
            return error("Email em uso", 409);
        }

        const bcrypt = await tryGetBcrypt();
        const hashedPassword = bcrypt ? bcrypt.hashSync(password, 10) : fallbackHash(password);
        const result = db
            .prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)")
            .run(email, hashedPassword, name, "aluno");

        const token = await createToken({
            userId: result.lastInsertRowid,
            email,
            role: "aluno",
        });

        const newUser = {
            id: result.lastInsertRowid,
            name,
            email,
            role: "aluno",
        };


        return authResponse(newUser, "Cadastro sucesso!", token);
    } finally {
        disconnect(db); 
    }
}

async function handleLogout() {
    const response = NextResponse.json({
        success: true,
        message: "Logout sucesso!",
    });

    response.cookies.delete("auth-token");

    return response;
}