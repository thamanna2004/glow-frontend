import { Link } from "react-router-dom";
import { SKIN_ROOT, skinCategoryGroups } from "../../data/skinCategories";
import CategoryGroupColumn from "./CategoryGroupColumn";
import { buildCategoryPath } from "../../features/category/utils/categoryUtils";

export default function SkinMegaMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="absolute inset-x-0 top-full z-50 animate-[megaMenuIn_350ms_ease-out] border-t border-ice-100/80 bg-white/98 shadow-[0_24px_60px_-20px_rgba(26,43,74,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 md:px-8">
        {/* Featured Skin panel */}
        <aside className="w-[220px] shrink-0 border-r border-ice-100 pr-6">
          <p className="section-overline">Shop by concern</p>
          <h3 className="display-heading mt-2 text-4xl text-navy-900">{SKIN_ROOT.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {SKIN_ROOT.description}
          </p>
          <Link
            to={buildCategoryPath()}
            onClick={onClose}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-navy-800"
          >
            Shop All Skin
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </Link>
        </aside>

        {/* Category columns grid */}
        <div className="grid flex-1 grid-cols-3 gap-x-6 gap-y-8 xl:grid-cols-4 2xl:grid-cols-6">
          {skinCategoryGroups.map((group) => (
            <CategoryGroupColumn key={group.slug} group={group} onNavigate={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
}
