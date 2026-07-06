import { Link } from "react-router-dom";
import { buildCategoryPath } from "../../features/category/utils/categoryUtils";

export default function CategoryLink({
  groupSlug,
  itemSlug,
  name,
  className = "",
  onClick,
}) {
  const to = buildCategoryPath(groupSlug, itemSlug);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={[
        "block rounded-lg px-2 py-1.5 text-sm text-slate-600 transition duration-300",
        "hover:translate-x-0.5 hover:bg-ice-50 hover:text-navy-900",
        className,
      ].join(" ")}
    >
      {name}
    </Link>
  );
}
