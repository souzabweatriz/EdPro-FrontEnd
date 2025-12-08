"use client";
import { useState, useEffect, useCallback } from "react";

const CACHE_KEY = "edpro_courses_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export default function useCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourses = useCallback(async (forceRefresh = false) => {
        setLoading(true);
        setError(null);

        // Verifica cache no sessionStorage
        if (!forceRefresh && typeof window !== "undefined") {
            try {
                const cached = sessionStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_TTL) {
                        setCourses(data);
                        setLoading(false);
                        return;
                    }
                }
            } catch (e) {
                console.warn("[useCourses] Erro ao ler cache:", e);
            }
        }

        const baseRaw = process.env.NEXT_PUBLIC_API_URL || "";
        const base = baseRaw.replace(/\/$/, "");
        const urlsToTry = [];
        
        if (base) {
            urlsToTry.push(`${base}/courses`);
            urlsToTry.push(`${base}/api/courses`);
        }
        urlsToTry.push("/api/courses");
        urlsToTry.push("/courses");
        urlsToTry.push("http://localhost:5000/api/courses");
        urlsToTry.push("http://localhost:5000/courses");
        // Removido localhost:4000/api/courses pois não existe no projeto

        let lastError = null;

        for (const url of urlsToTry) {
            try {
                console.debug("[useCourses] GET ->", url);
                const resp = await fetch(url, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!resp.ok) {
                    lastError = new Error(`HTTP ${resp.status} ${resp.statusText}`);
                    console.warn("[useCourses] tentativa falhou:", url, lastError);
                    continue;
                }

                const data = await resp.json();
                const coursesList = Array.isArray(data) ? data : (data.courses || []);
                
                // Salva no cache
                if (typeof window !== "undefined") {
                    try {
                        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
                            data: coursesList,
                            timestamp: Date.now()
                        }));
                    } catch (e) {
                        console.warn("[useCourses] Erro ao salvar cache:", e);
                    }
                }

                setCourses(coursesList);
                setLoading(false);
                return;
            } catch (err) {
                lastError = err;
                console.error("[useCourses] erro ao buscar em", url, err);
                continue;
            }
        }

        console.error("[useCourses] falha ao buscar cursos; tentadas:", urlsToTry, lastError);
        setError(lastError?.message || "Erro ao carregar cursos");
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const reload = useCallback(() => {
        fetchCourses(true);
    }, [fetchCourses]);

    return { courses, loading, error, reload };
}
