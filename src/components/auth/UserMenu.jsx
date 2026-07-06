import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

const userLinks = [
  { to: "/account", label: "Profile" },
  { to: "/orders", label: "My Orders" },
  { to: "/wishlist", label: "Wishlist" },
];

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { user, logout } = useAuth();
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex flex-col items-center gap-1.5 text-navy-900"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ice-50 transition group-hover:bg-ice-100">
          <span className="text-xs font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </span>
        <span className="max-w-[72px] truncate text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 group-hover:text-navy-900">
          {user?.name?.split(" ")[0] || "Account"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-52 rounded-[20px] border border-ice-200/80 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(26,43,74,0.25)]">
          <p className="px-3 py-2 text-xs text-slate-400">{user?.email}</p>
          {userLinks.map((link) => (
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
