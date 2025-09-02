// src/services/auth.js
import API from "./api";

// Register
export const register = (fullName, email, password, role = "mentee") =>
    API.post("/auth/register", { fullName, email, password, role });

// Login
export const login = (email, password) =>
    API.post("/auth/login", { email, password });

// Profile
export const getProfile = () => API.get("/auth/profile");
