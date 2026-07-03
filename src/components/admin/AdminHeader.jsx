import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Button from "../Button";

export default function AdminHeader({
  onMenuOpen,
  notificationCount = 0,
  showMobileMenu = false,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const q = search.trim();
    if (!q) return;
    navigate(`/admin/products?search=${encodeURIComponent(q)}`);
  };

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AD";

  return (
    <header className="luxury-glass sticky top-0 z-40 border-b border-sand/40 shadow-[0_8px_32px_-16px_rgba(43,36,32,0.12)]">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {showMobileMenu && (
            <button
              type="button"
              onClick={onMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ice-200/80 bg-ivory text-charcoal lg:hidden"
              aria-label="Open admin menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          )}
          <div className="hidden lg:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
              Administration
            </p>
            <p className="text-sm text-slate-600">
              Signed in as <span className="font-medium text-charcoal">{user?.name}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="hidden flex-1 px-4 md:block md:max-w-md lg:max-w-lg">
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 stroke-slate-400 fill-none stroke-2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, orders..."
              className="w-full rounded-full border border-sand/45 bg-cream/80 py-2.5 pl-10 pr-4 text-sm text-charcoal outline-none transition focus:border-gold/60 focus:bg-cream focus:ring-2 focus:ring-gold/12"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/admin/orders")}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand/45 bg-cream/80 text-espresso transition hover:border-gold/45 hover:bg-champagne/60 hover:text-gold"
            aria-label="Notifications"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.75]">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-charcoal">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </motion.button>

          <div className="hidden items-center gap-2 rounded-full border border-sand/45 bg-cream/80 py-1 pl-1 pr-3 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-gold-light to-gold text-xs font-semibold text-charcoal">
              {initials}
            </span>
            <div className="hidden md:block">
              <p className="text-xs font-medium text-charcoal">{user?.name}</p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
          </div>

          <Link to="/" className="hidden sm:block">
            <Button variant="outline" className="!px-4 !py-2 text-xs">
              View Storefront
            </Button>
          </Link>
          <Button variant="soft" onClick={logout} className="!px-4 !py-2 text-xs">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
