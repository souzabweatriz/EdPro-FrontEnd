"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const cookieOpts = {
    expires: 1 / 1400,
    secure: false,
    sameSite: "lax",
};

const axiosOpts = { timeout: 10000, withCredentials: true };

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

    const authRequest = async (action, data = {}) => {
        try {
            // Faz requisição POST para /api/auth com a ação e dados
            const response = await axios.post("/api/auth", { action, ...data }, axiosOpts);
            return response.data;
        } catch (error) {
            // Padroniza tratamento de erros de todas as requisições
            return {
                success: false,
                error: error.response?.data?.error || "Erro de conexão",
            };
        }
    }; const checkAuth = useCallback(async () => {
        const localUser = getUser();
        if (!localUser) return { success: false };
        try {
            const response = await axios.get("/api/auth", axiosOpts);
            if (response.data.success) {
                saveUser(response.data.user);
                return { success: true, user: response.data.user };
            }
        } catch (error) {
            if (error.response?.status === 401) removeUser();
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
        const result = await authRequest("login", { email, password });
        if (result.success) {
            saveUser(result.user);
            setUser(result.user);
            setIsAuthenticated(true);
        }
        return result;
    };

    const signup = async (name, email, password) => {
        if (!name || !email || !password) return { success: false, error: "Todos campos obrigatórios" };
        const result = await authRequest("signup", { name, email, password });
        if (result.success) {
            saveUser(result.user);
            setUser(result.user);
            setIsAuthenticated(true);
        }
        return result;
    };

    const logout = async () => {
        await authRequest("logout");
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