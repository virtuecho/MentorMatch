import API from "./api";

// Toggle role between 'mentee' and 'mentor'
export const updateRole = () => API.post("/role/update");