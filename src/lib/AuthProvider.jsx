"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const cookieOpts = {
    expires: 1, // 1 dia
    secure: false,
    sameSite: "lax",
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""; // exemplo: http://localhost:3000/api/auth
const axiosOpts = { timeout: 10000, withCredentials: true };
const axiosInstance = axios.create({ baseURL: API_BASE, ...axiosOpts });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Utilidades para cookies do lado do client (apenas nome/email/id/role)
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
    const removeUser = () => ["user", "isLoggedIn"].forEach((c) => Cookies.remove(c));
    const authError = (error) => ({
        success: false,
        error: error?.response?.data?.error || error?.message || "Erro de conexão",
    });

    // Checa se o usuário está autenticado consultando o backend (/me), não usando só os cookies "user".
    const checkAuth = useCallback(async () => {
        try {
            let response;
            if (API_BASE) {
                response = await axiosInstance.get("/me");
            } else {
                response = await axios.get("/api/auth", axiosOpts);
            }
            if (response.data?.success) {
                saveUser(response.data.user);
                return { success: true, user: response.data.user };
            }
        } catch (error) {
            removeUser();
            return { success: false };
        }
        return { success: false };
    }, []);

    useEffect(() => {
        // Garantia de atualização do estado a cada mount/refresh
        checkAuth().then((result) => {
            setUser(result.success ? result.user : null);
            setIsAuthenticated(result.success);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, [checkAuth]);

    // Login
    const login = async (email, password) => {
        if (!email || !password) return { success: false, error: "Email e senha obrigatórios" };
        try {
            let response;
            if (API_BASE) {
                response = await axiosInstance.post("/login", { email, password });
            } else {
                response = await axios.post("/api/auth", { action: "login", email, password }, axiosOpts);
            }
            const data = response.data;
            console.log("[AuthProvider] Login response:", data);
            if (data?.success) {
                saveUser(data.user);
                setUser(data.user);
                setIsAuthenticated(true);
            }
            return data;
        } catch (error) {
            console.error("[AuthProvider] Login error:", error.response?.data || error.message);
            return authError(error);
        }
    };

    // Cadastro
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

    // Logout
    const logout = async () => {
        try {
            if (API_BASE) {
                await axiosInstance.post("/logout");
            } else {
                await axios.post("/api/auth", { action: "logout" }, axiosOpts);
            }
        } catch { /* Silenciar erros de logout */ }
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
            logout,
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