"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import apiClient, { getDefaultHeaders } from "./apiClient";

const CACHE_KEY = "edpro_cursos_cache";
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutos

function normalizeItem(item) {
  if (!item) return null;
  if (typeof item === "string") {
    const title = item;
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return { id, title, raw: item };
  }
  const id = item.id || item._id || item.nome || item.name || item.codigo || JSON.stringify(item);
  const title = item.titulo || item.title || item.name || item.nome || item.nomeCurso || item.courseName || JSON.stringify(item);
  return { id: String(id), title: String(title), raw: item };
}

async function tryFetchUrls(urlsToTry) {
  for (const url of urlsToTry) {
    try {
      const headers = getDefaultHeaders();
      // fetch better handles relative/absolute here
      const resp = await fetch(url, { headers });
      if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText} for ${url}`);
      const data = await resp.json();
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data.cursos)) list = data.cursos;
      else if (Array.isArray(data.data)) list = data.data;
      else if (Array.isArray(data.results)) list = data.results;
      else if (data && typeof data === "object") {
        const arr = Object.values(data).find((v) => Array.isArray(v));
        if (arr) list = arr;
      }
      // normalize
      const normalized = list.map(normalizeItem).filter(Boolean);
      if (normalized.length === 0) throw new Error(`Nenhum curso retornado de ${url}`);
      return { url, list: normalized };
    } catch (err) {
      // try next
      // eslint-disable-next-line no-console
      console.debug("useCourses: tentativa falhou para", url, err.message);
      continue;
    }
  }
  throw new Error("Nenhum endpoint disponível para cursos");
}

export default function useCourses({ forceReload = false } = {}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // check cache
      if (!forceReload) {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (parsed?.ts && Date.now() - parsed.ts < CACHE_TTL_MS && Array.isArray(parsed.list)) {
              setCourses(parsed.list);
              setLoading(false);
              return { from: "cache", list: parsed.list };
            }
          } catch {}
        }
      }

      // build urls to try (same strategy as before)
      const baseRaw = process.env.NEXT_PUBLIC_API_URL || apiClient.defaults.baseURL || "";
      const base = baseRaw.replace(/\/$/, "");
      const urlsToTry = [];
      if (base) {
        urlsToTry.push(`${base}/course`);
        urlsToTry.push(`${base}/courses`);
        urlsToTry.push(`${base}/api/course`);
        urlsToTry.push(`${base}/api/courses`);
      }
      urlsToTry.push("/api/course");
      urlsToTry.push("/api/courses");
      urlsToTry.push("/course");
      urlsToTry.push("/courses");
      urlsToTry.push("http://localhost:5000/api/course");
      urlsToTry.push("http://localhost:5000/api/courses");
      urlsToTry.push("http://localhost:4000/api/course");
      urlsToTry.push("http://localhost:4000/api/courses");

      const result = await tryFetchUrls(urlsToTry);
      if (!mounted.current) return;
      setCourses(result.list);
      // cache
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), list: result.list }));
      } catch {}
      setLoading(false);
      return { from: result.url, list: result.list };
    } catch (err) {
      if (!mounted.current) return;
      setError(err.message || String(err));
      setLoading(false);
      return { error: err };
    }
  }, [forceReload]);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  const reload = useCallback(() => load(), [load]);

  return { courses, loading, error, reload };
}
