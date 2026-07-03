import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AccessDeniedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    const timer = setTimeout(() => navigate("/", { replace: true }), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4 pb-10">
      <div className="w-full rounded-[28px] border border-ice-200/60 glass-panel p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-2">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 8l8 8M16 8l-8 8" />
          </svg>
        </div>
        <p className="section-overline">Access Denied</p>
        <h1 className="display-heading mt-2 text-5xl text-navy-900">Restricted Area</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          You don&apos;t have permission to access{" "}
          <span className="font-medium text-navy-900">{from}</span>. Admin privileges are required
          for this section.
        </p>
        <p className="mt-2 text-xs text-slate-400">Redirecting to home in 5 seconds...</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/">
            <Button>Back to Shop</Button>
          </Link>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
}
