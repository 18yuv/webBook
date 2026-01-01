import api from "./axios.js";

// Auth 
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
export const logout = () => api.post("/auth/logout");

// Resends 
export const resendVerification = (data) => api.post("/auth/resend-verification", data);
export const requestPasswordReset = (data) => api.post("/auth/request-password-reset", data);
export const resetPassword = (token, data) => api.post(`/auth/reset-password/${token}`, data);

// User 
export const getMe = () => api.get("/home/me");