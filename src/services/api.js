// src/services/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "https://networking-companion-backend.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

// Automatically attach token if it exists
API.interceptors.request.use((config) => {
    const token = "comp30022_G37_X2Nvbm5lY3Rpb25fbGlmZXRpbWU9MCZwb29sX3RpbW";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
