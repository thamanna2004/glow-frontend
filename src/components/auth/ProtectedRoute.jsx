import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import useUiStore from "../../store/uiStore";

export default function ProtectedRoute({ children, roles = ["user", "admin"] }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const openAuthModal = useUiStore((state) => state.openAuthModal);

  const hasRoleAccess =
    isAuthenticated && user && (roles.length === 0 || roles.includes(user.role));

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal({ returnPath: location.pathname });
    }
  }, [isAuthenticated, location.pathname, openAuthModal]);

  if (isAuthenticated && user && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/access-denied" replace state={{ from: location.pathname }} />;
  }

  if (!hasRoleAccess) {
    return (
      <div className="relative min-h-[50vh]">
        <div className="pointer-events-none select-none blur-[6px] opacity-40">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-[28px] border border-ice-200/90 bg-ivory/95 px-8 py-8 text-center shadow-[0_32px_80px_-24px_rgba(44,42,38,0.22)] backdrop-blur-md">
            <p className="section-overline">Join Glow Skin ✨</p>
            <h2 className="display-heading mt-2 text-2xl text-charcoal md:text-3xl">
              Login to continue
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Login to continue your skincare journey.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
