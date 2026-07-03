import axios from "axios";
import useAuthStore from "../features/auth/store/authStore";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
});

function getStoredToken() {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  if (!token || token === "undefined" || token === "null") {
    return null;
  }
  return token;
}

axiosClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Let the browser set multipart boundary automatically
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

let isRefreshing = false;
let refreshQueue = [];

function processQueue(error, token = null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  refreshQueue = [];
}

function forceLogout() {
  useAuthStore.getState().logout();
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  const { data } = await axios.post(
    `${baseURL}/auth/refresh`,
    refreshToken ? { refreshToken } : {},
    { withCredentials: true }
  );
  return data.accessToken;
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";

    const isAuthError =
      status === 401 &&
      (message.includes("Not authorized") ||
        message.includes("token") ||
        message.includes("User not found"));

    if (isAuthError && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          throw new Error("Unable to refresh session");
        }

        useAuthStore.getState().setToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        forceLogout();
        return Promise.reject(
          new Error("Session expired. Please log in again.")
        );
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
