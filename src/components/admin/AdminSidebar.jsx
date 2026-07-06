import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { LogoIcon } from "../Logo";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/admin/products", label: "Products", icon: "box" },
  { to: "/admin/categories", label: "Categories", icon: "tag" },
  { to: "/admin/orders", label: "Orders", icon: "cart" },
  { to: "/admin/users", label: "Users", icon: "users" },
  { to: "/admin/inventory", label: "Inventory", icon: "layers" },
  { to: "/admin/analytics", label: "Analytics", icon: "chart" },
  { to: "/admin/ai-analytics", label: "AI Analytics", icon: "spark" },
  { to: "/admin/settings", label: "Settings", icon: "settings" },
];

function NavIcon({ type }) {
  const paths = {
    grid: <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />,
    box: <path d="M4 7l8-4 8 4v10l-8 4-8-4V7zm8 2.2L6.5 12 12 14.8 17.5 12 12 9.2z" />,
    tag: <path d="M3 12l9-9 9 9-9 9-9-9zm9-5.8L6.8 12 12 17.2 17.2 12 12 6.2z" />,
    cart: <path d="M6 6h15l-2 9H8L6 6zm0 0L5 3H2M9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
    users: <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 8a8 8 0 0 1 16 0" />,
    layers: <path d="M12 3 3 8l9 5 9-5-9-5zm0 8L3 16l9 5 9-5-9-5z" />,
    chart: <path d="M4 19V9M10 19V5M16 19v-6M22 19V3" />,
    spark: <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />,
    settings: <path d="M12 15.5A3.5 3.5 0 1 0 8.5 12 3.5 3.5 0 0 0 12 15.5zm8.4-3.5 1.6-1.2-1.5-2.6 1.9-1-1.9-1 1.5-2.6-1.6-1.2-2.6 1.5-1-1.9-1 1.9-2.6-1.5-1.6 1.2 1.5 2.6-1.9 1 1.9 1-1.5 2.6 1.6 1.2 2.6-1.5 1 1.9 1-1.9 2.6 1.5z" />,
  };

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-none stroke-current stroke-[1.75]">
      {paths[type]}
    </svg>
  );
}

export default function AdminSidebar({
  mobile = false,
  collapsed = false,
  onNavigate,
  onToggleCollapse,
}) {
  const { user } = useAuth();

  return (
    <aside
      className={`flex h-full flex-col border-r border-forest-deep/80 bg-forest transition-all duration-300 ${
        mobile ? "w-full" : `sticky top-0 h-screen shrink-0 ${collapsed ? "w-[76px]" : "w-64"}`
      }`}
    >
      <div className={`border-b border-cream/10 ${collapsed && !mobile ? "px-3 py-5" : "px-5 py-6"}`}>
        {collapsed && !mobile ? (
          <div className="flex justify-center text-gold">
            <LogoIcon className="h-8 w-8" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5">
              <LogoIcon className="h-8 w-8" />
              <span className="display-heading text-xl text-cream">Glow Skin</span>
            </div>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              Admin Panel
            </p>
            <p className="mt-1 truncate text-xs text-cream/50">{user?.email}</p>
          </>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            title={collapsed && !mobile ? item.label : undefined}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300",
                collapsed && !mobile ? "justify-center" : "",
                isActive
                  ? "border border-gold/35 bg-gold/15 text-gold-light shadow-[0_8px_24px_-8px_rgba(184,148,94,0.3)]"
                  : "text-cream/60 hover:bg-forest-deep hover:text-cream",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  className={isActive ? "text-gold" : "text-gold/50 group-hover:text-gold"}
                >
                  <NavIcon type={item.icon} />
                </motion.span>
                {(!collapsed || mobile) && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {!mobile && onToggleCollapse && (
        <div className="border-t border-cream/10 p-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cream/15 bg-forest-deep/60 px-3 py-2.5 text-xs font-medium text-cream/60 transition hover:border-gold/35 hover:text-gold"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 fill-none stroke-current stroke-2 transition ${collapsed ? "rotate-180" : ""}`}
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
