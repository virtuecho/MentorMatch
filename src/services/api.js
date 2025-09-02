
import axios from "axios";

const API = axios.create({
    baseURL: "https://networking-companion-backend.onrender.com", // should hide the api in an .env
    headers: {
        "Content-Type": "application/json"
    }
});

// Automatically attach token if it exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Catch backend error globally
API.interceptors.response.use(
    response => response,
    error => {
        console.error("API error:", error.response?.data || error.message);
        // Optionally redirect to login or show toast
        return Promise.reject(error);
    }
);

export default API;
