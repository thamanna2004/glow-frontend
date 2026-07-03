import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import useUiStore from "../../store/uiStore";

export default function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const openAuthModal = useUiStore((state) => state.openAuthModal);

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal({ returnPath: location.pathname });
    }
  }, [isAuthenticated, location.pathname, openAuthModal]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ice-50 px-4">
        <div className="rounded-[28px] border border-ice-200/60 bg-white p-10 text-center shadow-lg">
          <p className="section-overline">Admin Access</p>
          <h1 className="display-heading mt-2 text-4xl text-navy-900">Sign in required</h1>
          <p className="mt-3 text-sm text-slate-500">
            Please sign in with an admin account to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/access-denied" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
