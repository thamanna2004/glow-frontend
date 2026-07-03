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
