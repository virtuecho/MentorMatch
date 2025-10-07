
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

export const logout = () => {
    localStorage.removeItem("authToken");
    return Promise.resolve();
};

// See own profile
export const getProfile = () => API.get("/auth/profile");

// Update profile
export const updateProfile = (payload) => {
    const res = API.put("/auth/profile", payload);
    return res.data;
}

