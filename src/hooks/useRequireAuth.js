import { useAuth } from "../features/auth/hooks/useAuth";
import useUiStore from "../store/uiStore";

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const openAuthModal = useUiStore((state) => state.openAuthModal);

  const requireAuth = (onAuthorized, options = {}) => {
    if (isAuthenticated) {
      onAuthorized?.();
      return true;
    }

    openAuthModal({
      tab: options.tab || "login",
      returnPath: options.returnPath ?? null,
      pendingAction: options.pendingAction ?? null,
    });
    return false;
  };

  return { requireAuth, isAuthenticated };
}
