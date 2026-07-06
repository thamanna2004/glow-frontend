<<<<<<< HEAD
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
=======
import axiosClient from "../../../services/axiosClient";

export const registerUser = async (data) => {
  const response = await axiosClient.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axiosClient.post(
    "/auth/refresh",
    refreshToken ? { refreshToken } : {},
    { withCredentials: true }
  );
  return response.data.accessToken;
};

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    await axiosClient.post(
      "/auth/logout",
      refreshToken ? { refreshToken } : {},
      { withCredentials: true }
    );
  } catch {
    // ignore logout API errors
  }
};
>>>>>>> b31e3968d3bdf0b3f07ca7f78c4aa3dcc0dd2e8d
