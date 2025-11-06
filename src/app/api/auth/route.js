import { compareSync, hashSync } from "bcryptjs";
import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { connect, disconnect } from "@/lib/sqlite/database";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const JWT_CONFIG = {
    issuer: "minha-aplicacao",
    audience: "app-users",
    expiresIn: "1m", 
};

const cookieOpts = { httpOnly: true, secure: false, sameSite: "lax", maxAge: 60 };

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
            audience: JWT_CONFIG.audience, destinatário
        });
        return payload; 
    } catch {
        return null; 
    }
};

const getToken = (request) =>
    request.cookies.get("auth-token")?.value || 
    request.headers.get("authorization")?.slice(7); 
const error = (message, status = 400) => NextResponse.json({ error: message }, { status });
const authResponse = (user, message, token) => {
    const response = NextResponse.json({
        success: true,
        message,
        token,
        user: {
            id: user.id,
            name: user.name,
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
        if (!token) return error("Não logado", 401);
        const payload = await verifyToken(token);
        if (!payload) return error("Token inválido", 401);
        const user = db
            .prepare("SELECT id, email, name, role FROM users WHERE id = ?")
            .get(payload.userId);
        if (!user) return error("Usuário não encontrado", 404);
        return NextResponse.json({ success: true, user });
    } catch {
        return error("Erro servidor", 500);
    } finally {
        disconnect(db); 
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

        // Verifica se usuário existe e se a senha confere
        if (!user || !compareSync(password, user.password)) {
            return error("Credenciais inválidas", 401);
        }

        // Cria token JWT com dados do usuário
        const token = await createToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Retorna resposta com token e dados do usuário
        return authResponse(user, "Login sucesso!", token);
    } finally {
        disconnect(db); // Sempre fecha conexão do banco
    }
}

// ====================================
// FUNÇÃO: Cadastro de novo usuário
// ====================================
async function handleSignup({ name, email, password }) {
    // Validações básicas dos campos obrigatórios
    if (!name || !email || !password) return error("Todos campos obrigatórios");
    if (name.length < 2) return error("Nome muito curto");
    if (password.length < 5) return error("Senha muito curta");

    const db = connect();
    try {
        // Verifica se email já está em uso
        if (
            db.prepare("SELECT COUNT(*) as count FROM users WHERE email = ?").get(email).count > 0
        ) {
            return error("Email em uso", 409);
        }

        // Cria hash seguro da senha antes de salvar
        const hashedPassword = hashSync(password, 10); // 10 rounds de salt

        // Insere novo usuário no banco (role padrão: "aluno")
        const result = db
            .prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)")
            .run(email, hashedPassword, name, "aluno");

        // Cria token JWT para o novo usuário
        const token = await createToken({
            userId: result.lastInsertRowid,
            email,
            role: "aluno",
        });

        // Prepara dados do usuário recém-criado
        const newUser = {
            id: result.lastInsertRowid,
            name,
            email,
            role: "aluno",
        };

        // Retorna resposta com login automático após cadastro
        return authResponse(newUser, "Cadastro sucesso!", token);
    } finally {
        disconnect(db); // Sempre fecha conexão do banco
    }
}

// ====================================
// FUNÇÃO: Logout do usuário
// ====================================
async function handleLogout() {
    // Cria resposta de sucesso
    const response = NextResponse.json({
        success: true,
        message: "Logout sucesso!",
    });

    // Remove cookie do token (invalidação client-side)
    response.cookies.delete("auth-token");

    return response;
}