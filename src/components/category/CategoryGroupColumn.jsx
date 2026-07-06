import { Link } from "react-router-dom";
import CategoryLink from "./CategoryLink";
import { buildCategoryPath } from "../../features/category/utils/categoryUtils";

export default function CategoryGroupColumn({ group, onNavigate, compact = false }) {
  return (
    <div
      className={[
        "group/col animate-[fadeIn_400ms_ease-out]",
        compact ? "min-w-0" : "min-w-[148px]",
      ].join(" ")}
    >
      <Link
        to={buildCategoryPath(group.slug)}
        onClick={onNavigate}
        className="mb-2.5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-navy-900 transition duration-300 hover:text-ice-400"
      >
        {group.name}
        <svg
          viewBox="0 0 24 24"
          className="h-3 w-3 opacity-0 transition duration-300 group-hover/col:translate-x-0.5 group-hover/col:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      </Link>
      <ul className="space-y-0.5">
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
    </div>
  );
}
