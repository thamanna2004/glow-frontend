import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const iconMap = {
  users: (
    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 8a8 8 0 0 1 16 0" />
  ),
  products: (
    <path d="M4 7l8-4 8 4v10l-8 4-8-4V7zm8 2.2L6.5 12 12 14.8 17.5 12 12 9.2z" />
  ),
  orders: (
    <path d="M6 6h15l-2 9H8L6 6zm0 0L5 3H2M9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  ),
  revenue: <path d="M4 19V9M10 19V5M16 19v-6M22 19V3" />,
  pending: <path d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
  inventory: <path d="M12 3 3 8l9 5 9-5-9-5zm0 8L3 16l9 5 9-5-9-5z" />,
};

const accentMap = {
  users: "from-sage-light/60 to-sage/30 text-forest",
  products: "from-cream to-sand/40 text-forest",
  orders: "from-sand/50 to-champagne text-forest",
  revenue: "from-gold-light/40 to-gold/25 text-forest",
  pending: "from-sage/25 to-sand/30 text-forest",
  inventory: "from-gold/15 to-sand/30 text-forest",
};

export default function StatsCard({
  label,
  value,
  hint,
  to,
  icon = "products",
  index = 0,
  loading = false,
}) {
  const content = (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    whileHover={to ? { y: -4, transition: { duration: 0.25 } } : undefined}
    className={`group relative overflow-hidden rounded-[24px] border border-sand/50 bg-linear-to-br from-cream to-sand/35 p-6 shadow-[0_20px_48px_-24px_rgba(36,52,42,0.14)] backdrop-blur-sm transition ${
      to ? "cursor-pointer hover:border-gold/50 hover:shadow-[0_28px_60px_-20px_rgba(36,52,42,0.18)]" : ""
    }`}
  >
    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent opacity-0 transition group-hover:opacity-100" />
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <p className="display-heading mt-3 truncate text-3xl text-forest md:text-4xl">
          {loading ? "—" : value}
        </p>
        {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
      </div>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${accentMap[icon] || accentMap.products}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.75]">
          {iconMap[icon]}
        </svg>
      </div>
    </div>
  </motion.article>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }

  return content;
}
