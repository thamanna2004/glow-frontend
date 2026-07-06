import { motion } from "framer-motion";

export default function AdminPage({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`space-y-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function AdminPageHeader({ overline, title, description, action }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {overline && <p className="section-overline">{overline}</p>}
        <h1 className="display-heading mt-2 text-4xl text-charcoal md:text-5xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
