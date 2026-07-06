import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestOtp = (payload) => apiClient.post("/auth/send-otp", payload);
export const verifyOtp = (payload) => apiClient.post("/auth/verify-otp", payload);
export const resetPassword = (payload) => apiClient.post("/auth/reset-password", payload);
export const login = (payload) => apiClient.post("/auth/login", payload);
export const register = (payload) => apiClient.post("/auth/register", payload);

export default apiClient;
