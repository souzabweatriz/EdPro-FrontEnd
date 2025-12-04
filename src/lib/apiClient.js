"use client";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const axiosOpts = { timeout: 10000, withCredentials: true };
const axiosInstance = axios.create({ baseURL: API_BASE, ...axiosOpts });

export function getDefaultHeaders(extra = {}) {
  const headers = {};
  if (API_KEY) headers["x-api-key"] = API_KEY;
  return { ...headers, ...extra };
}

export default axiosInstance;
