import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/inventory", label: "Inventory" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      <Link
        to="/admin/dashboard"
        className="hidden rounded-full bg-navy-900 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-navy-800 md:inline-flex"
      >
        Admin Dashboard
      </Link>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex flex-col items-center gap-1.5 text-navy-900"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ice-200 transition group-hover:bg-ice-50">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 group-hover:text-navy-900">
          Admin
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-56 rounded-[20px] border border-ice-200/80 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(26,43,74,0.25)]">
          {adminLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-ice-50 hover:text-navy-900"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
