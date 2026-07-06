import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import ProductState from "../components/ProductState";
import CategoryBreadcrumb from "../components/category/CategoryBreadcrumb";
import { useProducts } from "../hooks/useStoreProducts";
import { findGroupBySlug } from "../features/category/utils/categoryUtils";

const collectionConfig = {
  "new-arrivals": {
    tag: "newArrival",
    title: "New Arrivals",
    overline: "Just Landed",
    description: "Fresh skincare drops — the latest formulas for your glow ritual.",
    path: "/new-arrivals",
  },
  "best-sellers": {
    tag: "bestSeller",
    title: "Best Sellers",
    overline: "Most Loved",
    description: "Customer favorites and top-rated products across every category.",
    path: "/best-sellers",
  },
};

export default function CollectionPage({ collection }) {
  const { groupSlug } = useParams();
  const config = collectionConfig[collection];
  const group = useMemo(() => findGroupBySlug(groupSlug), [groupSlug]);
  const { data: allProducts = [], isLoading, isError, error } = useProducts();

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter((product) => product.tags?.includes(config.tag));
    if (groupSlug) {
      list = list.filter((product) => product.groupSlug === groupSlug);
    }
    return list.sort((a, b) => (b.popularity || b.rating) - (a.popularity || a.rating));
  }, [allProducts, config.tag, groupSlug]);

  const pageTitle = group ? `${config.title} — ${group.name}` : config.title;
  const breadcrumbs = [
    { label: config.title, path: config.path },
    ...(group ? [{ label: group.name, path: `${config.path}/${group.slug}` }] : []),
  ];

  return (
    <section className="pb-12">
      <CategoryBreadcrumb crumbs={breadcrumbs} />
      <p className="section-overline">{config.overline}</p>
      <h1 className="display-heading mt-2 text-5xl text-navy-900 md:text-6xl">{pageTitle}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{config.description}</p>

      <div className="mt-10">
        {isLoading || isError ? (
          <ProductState loading={isLoading} error={isError ? error : null} />
        ) : filteredProducts.length === 0 ? (
          <ProductState
            empty
            emptyMessage="No products in this collection yet. Check back soon for new drops."
          />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </section>
  );
}
