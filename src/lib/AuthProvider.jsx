"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const cookieOpts = {
    expires: 1, // 1 dia
    // 1 dia = 1/30
    secure: false,
    sameSite: "lax",
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""; // ex: https://api.meusite.com
const axiosOpts = { timeout: 10000, withCredentials: true };
const axiosInstance = axios.create({ baseURL: API_BASE, ...axiosOpts });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const saveUser = (userData) => {
        Cookies.set("user", JSON.stringify(userData), cookieOpts);
        Cookies.set("isLoggedIn", "true", cookieOpts);
    };
    const getUser = () => {
        try {
            const user = Cookies.get("user");
            return user && Cookies.get("isLoggedIn") === "true" ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    };
    const removeUser = () => ["user", "isLoggedIn", "auth-token"].forEach((c) => Cookies.remove(c));

    const authError = (error) => ({
        success: false,
        error: error?.response?.data?.error || error?.message || "Erro de conexão",
    });

    // Faz check no backend para obter dados do usuário autenticado.
    // Se NEXT_PUBLIC_API_URL estiver definida, espera endpoints REST:
    // POST /auth/login, POST /auth/signup, POST /auth/logout, GET /auth/me
    // Caso contrário, mantém compatibilidade com a rota interna /api/auth (action-based).
    const checkAuth = useCallback(async () => {
        const localUser = getUser();
        if (!localUser) return { success: false };

        try {
            let response;
            if (API_BASE) {
                // Se API_BASE aponta para algo como http://localhost:5000/api/usuarios
                // usamos endpoints relativos: /me
                response = await axiosInstance.get("/me");
                if (response.data?.success) {
                    saveUser(response.data.user);
                    return { success: true, user: response.data.user };
                }
            } else {
                response = await axios.get("/api/auth", axiosOpts);
                if (response.data?.success) {
                    saveUser(response.data.user);
                    return { success: true, user: response.data.user };
                }
            }
        } catch (error) {
            if (error.response?.status === 401) removeUser();
            return { success: false };
        }
        return { success: false };
    }, []);
    useEffect(() => {
        checkAuth().then((result) => {
            setUser(result.success ? result.user : null);
            setIsAuthenticated(result.success);
            setLoading(false);
        });
    }, [checkAuth]);
    const login = async (email, password) => {
        if (!email || !password) return { success: false, error: "Email e senha obrigatórios" };

        try {
            let response;
            if (API_BASE) {
                // Backend externo REST-style — espera que o backend set-cookie o token HttpOnly
                // API_BASE pode ser um path até /api/usuarios, então chamamos /login
                response = await axiosInstance.post("/login", { email, password });
            } else {
                // Rota interna legacy
                response = await axios.post("/api/auth", { action: "login", email, password }, axiosOpts);
            }

            const data = response.data;
            if (data?.success) {
                // Salvamos apenas dados públicos do usuário em cookie (não o token)
                saveUser(data.user);
                setUser(data.user);
                setIsAuthenticated(true);
            }
            return data;
        } catch (error) {
            return authError(error);
        }
    };

    const signup = async (name, email, password) => {
        if (!name || !email || !password) return { success: false, error: "Todos campos obrigatórios" };

        try {
            let response;
            if (API_BASE) {
                response = await axiosInstance.post("/signup", { name, email, password });
            } else {
                response = await axios.post("/api/auth", { action: "signup", name, email, password }, axiosOpts);
            }
            const data = response.data;
            if (data?.success) {
                saveUser(data.user);
                setUser(data.user);
                setIsAuthenticated(true);
            }
            return data;
        } catch (error) {
            return authError(error);
        }
    };

    const logout = async () => {
        try {
            if (API_BASE) {
                await axiosInstance.post("/logout");
            } else {
                await axios.post("/api/auth", { action: "logout" }, axiosOpts);
            }
        } catch (e) {
        }
        removeUser();
        setUser(null);
        setIsAuthenticated(false);
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            signup,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
};