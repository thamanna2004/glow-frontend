import useAuthStore from "../store/authStore";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);

  const isAuthenticated = Boolean(token && user);
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "user";

  const hasRole = (...roles) => Boolean(user && roles.includes(user.role));

  return {
    user,
    token,
    login,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin,
    isCustomer,
    hasRole,
  };
}
