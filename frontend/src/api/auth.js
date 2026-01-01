import api from "./axios.js";

export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
export const resendVerification = (data) => api.post("/auth/resend-verification", data);
export const logout = () => api.post("/auth/logout");
export const getMe = () => api.get("/home/me");