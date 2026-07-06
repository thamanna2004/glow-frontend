import { useState } from "react";
import { Link } from "react-router-dom";

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3 w-3 fill-none stroke-current stroke-2 transition duration-300 ${className}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function NavDropdownPanel({ menu, onClose }) {
  if (!menu) return null;

  return (
    <div className="absolute inset-x-0 top-full z-50 animate-[megaMenuIn_350ms_ease-out] border-t border-ice-100/80 bg-white/98 shadow-[0_24px_60px_-20px_rgba(26,43,74,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 md:px-8">
        <aside className="w-[220px] shrink-0 border-r border-ice-100 pr-6">
          <p className="section-overline">Glow Skin</p>
          <h3 className="display-heading mt-2 text-3xl text-navy-900">{menu.featured.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {menu.featured.description}
          </p>
          <Link
            to={menu.featured.to}
            onClick={onClose}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-navy-800"
          >
            {menu.featured.cta}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </Link>
        </aside>

        <div className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {menu.columns.map((column) => (
            <div key={column.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-900">
                {column.title}
              </p>
              <ul className="space-y-1">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block rounded-lg px-2 py-1.5 text-sm text-slate-600 transition duration-300 hover:translate-x-0.5 hover:bg-ice-50 hover:text-navy-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NavDropdownTrigger({
  menu,
  activeId,
  onOpenChange,
  mobile = false,
  onNavigate,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isOpen = activeId === menu.id;

  if (mobile) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500"
        >
          {menu.label}
          <ChevronDownIcon className={mobileOpen ? "rotate-180" : ""} />
        </button>
        {mobileOpen && (
          <div className="mb-2 rounded-2xl border border-ice-100 bg-white p-3">
            <Link
              to={menu.featured.to}
              onClick={() => {
                setMobileOpen(false);
                onNavigate?.();
              }}
              className="mb-3 block text-sm font-medium text-navy-900"
            >
              {menu.featured.cta}
            </Link>
            {menu.columns.map((column) => (
              <div key={column.title} className="border-t border-ice-50 py-2 first:border-t-0">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {column.title}
                </p>
                <ul className="space-y-0.5">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => {
                          setMobileOpen(false);
                          onNavigate?.();
                        }}
                        className="block rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-ice-50 hover:text-navy-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onMouseEnter={() => onOpenChange(menu.id)}
      onClick={() => onOpenChange(isOpen ? null : menu.id)}
      className={[
        "group relative inline-flex items-center gap-1 font-medium uppercase tracking-[0.18em] transition-colors duration-300",
        "text-[11px]",
        isOpen ? "text-navy-900" : "text-slate-500 hover:text-navy-900",
      ].join(" ")}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {menu.label}
      <ChevronDownIcon className={isOpen ? "rotate-180" : ""} />
      <span
        className={`absolute -bottom-3.5 left-0 h-0.5 bg-navy-900 transition-all duration-300 ${
          isOpen ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </button>
  );
}
