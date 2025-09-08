
import API from "./api";

// Register
export const register = (fullName, email, password, role) => {
    const payload = { email, password };
    if (fullName) payload.fullName = fullName;
    if (role) payload.role = role;
    return API.post("/auth/register", payload);
};
    

// Login
export const login = (email, password) =>
    API.post("/auth/login", { email, password });

// Profile
export const getProfile = () => API.get("/auth/profile");
