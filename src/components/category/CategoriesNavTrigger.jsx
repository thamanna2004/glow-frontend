import { useState } from "react";
import { Link } from "react-router-dom";
import { SKIN_ROOT, skinCategoryGroups } from "../../data/skinCategories";
import { buildCategoryPath } from "../../features/category/utils/categoryUtils";
import CategoryLink from "./CategoryLink";

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

function MobileGroupAccordion({ group, onNavigate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-ice-50 first:border-t-0">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between py-2.5 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-600"
      >
        {group.name}
        <ChevronDownIcon className={expanded ? "rotate-180" : ""} />
      </button>
      {expanded && (
        <ul className="space-y-0.5 pb-2 pl-1">
          {group.items.map((item) => (
            <li key={item.slug}>
              <CategoryLink
                groupSlug={group.slug}
                itemSlug={item.slug}
                name={item.name}
                onClick={onNavigate}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileSkinMenuInline({ onNavigate }) {
  return (
    <div className="rounded-2xl border border-ice-100 bg-white p-3">
      <Link
        to={buildCategoryPath()}
        onClick={onNavigate}
        className="mb-3 block text-sm font-medium text-navy-900"
      >
        All {SKIN_ROOT.name}
      </Link>
      {skinCategoryGroups.map((group) => (
        <MobileGroupAccordion key={group.slug} group={group} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

export default function CategoriesNavTrigger({
  mobile = false,
  onNavigate,
  open = false,
  onOpenChange,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (mobile) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500"
        >
          Categories
          <ChevronDownIcon className={mobileOpen ? "rotate-180" : ""} />
        </button>
        {mobileOpen && (
          <div className="pl-2">
            <MobileSkinMenuInline
              onNavigate={() => {
                setMobileOpen(false);
                onNavigate?.();
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onMouseEnter={() => onOpenChange?.(true)}
      onClick={() => onOpenChange?.(!open)}
      className={[
        "group relative inline-flex items-center gap-1 font-medium uppercase tracking-[0.18em] transition-colors duration-300",
        "text-[11px]",
        open ? "text-navy-900" : "text-slate-500 hover:text-navy-900",
      ].join(" ")}
      aria-expanded={open}
      aria-haspopup="true"
    >
      Categories
      <ChevronDownIcon className={open ? "rotate-180" : ""} />
      <span
        className={`absolute -bottom-3.5 left-0 h-0.5 bg-navy-900 transition-all duration-300 ${
          open ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </button>
  );
}
