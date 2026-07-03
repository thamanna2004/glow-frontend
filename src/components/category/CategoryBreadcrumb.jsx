import { Link } from "react-router-dom";
import { buildCategoryPath } from "../../features/category/utils/categoryUtils";

export default function CategoryBreadcrumb({ crumbs }) {
  if (!crumbs?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm">
      <Link to="/" className="text-slate-400 transition hover:text-navy-900">
        Home
      </Link>
      {crumbs.map((crumb, index) => (
        <span key={crumb.path} className="inline-flex items-center gap-2">
          <span className="text-slate-300">/</span>
          {index === crumbs.length - 1 ? (
            <span className="font-medium text-navy-900">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="text-slate-500 transition hover:text-navy-900">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
