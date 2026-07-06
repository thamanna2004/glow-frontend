<<<<<<< HEAD
import create from "zustand";

export const useAuthStore = create((set) => ({
  successMessage: "",
  setSuccessMessage: (message) => set({ successMessage: message }),
  clearSuccessMessage: () => set({ successMessage: "" }),
}));
=======
import { create } from "zustand";

function normalizeUser(raw) {
  if (!raw) return null;
  return {
    id: raw._id || raw.id,
    name: raw.name,
    email: raw.email,
    role: raw.role || "user",
    isBlocked: Boolean(raw.isBlocked),
  };
}

function readStoredUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored ? normalizeUser(JSON.parse(stored)) : null;
  } catch {
    return null;
  }
}

function readStoredToken() {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  if (!token || token === "undefined" || token === "null") {
    return null;
  }
  return token;
}

const useAuthStore = create((set) => ({
  user: readStoredUser(),
  token: readStoredToken(),

  login: (data) => {
    const token = data.accessToken || data.token;
    const refreshToken = data.refreshToken;
    const user = normalizeUser(data.user);

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("accessToken", token);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("accessToken", token);
    }
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  updateUser: (partial) =>
    set((state) => {
      if (!state.user) return state;
      const user = { ...state.user, ...partial };
      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    }),
}));

export default useAuthStore;
>>>>>>> b31e3968d3bdf0b3f07ca7f78c4aa3dcc0dd2e8d
