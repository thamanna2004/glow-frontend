import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import CategoryBreadcrumb from "../components/category/CategoryBreadcrumb";
import ProductGrid from "../components/ProductGrid";
import ProductState from "../components/ProductState";
import Products from "./Products";
import { SKIN_ROOT, skinGroupCards } from "../data/skinCategories";
import { useProducts } from "../hooks/useStoreProducts";
import {
  filterProductsByCategory,
  findGroupBySlug,
  findItemBySlug,
  getCategoryBreadcrumb,
  buildCategoryPath,
} from "../features/category/utils/categoryUtils";

export default function CategoryPage() {
  const { groupSlug, itemSlug } = useParams();
  const { data: allProducts = [], isLoading, isError, error } = useProducts();

  const group = useMemo(() => findGroupBySlug(groupSlug), [groupSlug]);
  const item = useMemo(() => findItemBySlug(groupSlug, itemSlug), [groupSlug, itemSlug]);

  const categoryProducts = useMemo(
    () => filterProductsByCategory(allProducts, { groupSlug, itemSlug }),
    [allProducts, groupSlug, itemSlug]
  );

  const breadcrumbs = useMemo(
    () => getCategoryBreadcrumb(groupSlug, itemSlug),
    [groupSlug, itemSlug]
  );

  const pageTitle = item?.name || group?.name || SKIN_ROOT.name;
  const pageDescription =
    item
      ? `Shop ${item.name} — curated Glow Skin formulas for your ritual.`
      : group
        ? `Explore our ${group.name.toLowerCase()} collection.`
        : SKIN_ROOT.description;

  const productContent = (() => {
    if (isLoading || isError) {
      return <ProductState loading={isLoading} error={isError ? error : null} />;
    }
    if (categoryProducts.length === 0) {
      return (
        <ProductState
          empty
          emptyMessage="No products in this category yet. Add products from the admin panel."
        />
      );
    }
    return <ProductGrid products={categoryProducts} />;
  })();

  if (!groupSlug) {
    return (
      <section className="pb-10">
        <CategoryBreadcrumb crumbs={[{ label: SKIN_ROOT.name, path: buildCategoryPath() }]} />
        <h1 className="display-heading text-5xl text-navy-900 md:text-6xl">{SKIN_ROOT.name}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          {SKIN_ROOT.description}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skinGroupCards.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
        <Products compact />
      </section>
    );
  }

  if (group && !item) {
    return (
      <section className="pb-10">
        <CategoryBreadcrumb crumbs={breadcrumbs} />
        <h1 className="display-heading text-5xl text-navy-900 md:text-6xl">{pageTitle}</h1>
        <p className="mt-3 text-sm text-slate-600">{pageDescription}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {group.items.map((sub) => (
            <Link
              key={sub.slug}
              to={buildCategoryPath(group.slug, sub.slug)}
              className="rounded-full border border-ice-200 bg-white px-4 py-2 text-sm text-slate-600 transition duration-300 hover:border-ice-300 hover:bg-ice-50 hover:text-navy-900"
            >
              {sub.name}
            </Link>
          ))}
        </div>

        <div className="mt-10">{productContent}</div>
      </section>
    );
  }

  if (group && item) {
    return (
      <section className="pb-10">
        <CategoryBreadcrumb crumbs={breadcrumbs} />
        <h1 className="display-heading text-5xl text-navy-900 md:text-6xl">{pageTitle}</h1>
        <p className="mt-3 text-sm text-slate-600">{pageDescription}</p>
        <div className="mt-8">{productContent}</div>
      </section>
    );
  }

  return (
    <section className="pb-10 text-center">
      <h1 className="display-heading text-4xl text-navy-900">Category not found</h1>
      <Link to="/categories" className="mt-4 inline-block text-sm text-navy-900 underline">
        Browse Skin categories
      </Link>
    </section>
  );
}
