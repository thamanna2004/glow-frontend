import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function isBrowserReload() {
  const [entry] = performance.getEntriesByType("navigation");
  if (entry?.type === "reload") return true;
  return performance.navigation?.type === 1;
}

function shouldRedirectOnRefresh(pathname) {
  if (!pathname || pathname === "/") return false;
  if (pathname.startsWith("/admin")) return false;
  return true;
}

/**
 * On a full browser refresh (F5), send users to Home.
 * Client-side Link / useNavigate navigation is not affected.
 */
export default function RefreshRedirect() {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const pathname = window.location.pathname;
    if (!shouldRedirectOnRefresh(pathname)) return;
    if (!isBrowserReload()) return;

    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
