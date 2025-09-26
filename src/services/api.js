import axios from "axios";

// Get API base URL from Vite environment variables
const BASE_URL = import.meta.env.VUE_API_BASE_URL;

// Create axios instance with default configuration
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, //add a timeout to avoid hanging requests
});

// Request interceptor: attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;

    console.error("[API Error]", status || "NETWORK_ERROR", message);

    // if token expired or unauthorized, redirect to login
    if (status === 401 && !window.location.pathname.includes("/login")) {
      localStorage.removeItem("authToken");
      const back = encodeURIComponent(
        window.location.pathname + window.location.search
      );
      window.location.href = `/login?next=${back}`;
    }

    return Promise.reject(error);
  }
);

export default API;

// Optional helper: build absolute URLs to the backend
export const apiUrl = (path = "") =>
  `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

