import { useMemo, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import FilterBar from "../components/FilterBar";
import ProductState from "../components/ProductState";
import { useProducts } from "../hooks/useStoreProducts";

function SectionHeader({ overline, title, description }) {
  return (
    <header className="mb-8">
      <p className="section-overline">{overline}</p>
      <h2 className="display-heading mt-3 text-4xl text-navy-900 md:text-5xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>}
    </header>
  );
}

export default function Products({ compact = false }) {
  const { data: allProducts = [], isLoading, isError, error } = useProducts();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = useMemo(() => {
    const byFilter =
      selectedFilter === "All"
        ? allProducts
        : allProducts.filter(
            (product) => product.category.toLowerCase() === selectedFilter.toLowerCase()
          );

    const sorted = [...byFilter];
    if (sortBy === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted.sort((a, b) => (b.popularity || b.rating) - (a.popularity || a.rating));
    }

    return sorted;
  }, [allProducts, selectedFilter, sortBy]);

  const featuredProducts = useMemo(
    () => allProducts.filter((item) => item.tags?.includes("featured")),
    [allProducts]
  );
  const bestSellers = useMemo(
    () => allProducts.filter((item) => item.tags?.includes("bestSeller")),
    [allProducts]
  );
  const newArrivals = useMemo(
    () => allProducts.filter((item) => item.tags?.includes("newArrival")),
    [allProducts]
  );

  if (isLoading || isError) {
    return (
      <section className={compact ? "mt-16" : "pb-12"}>
        <ProductState loading={isLoading} error={isError ? error : null} />
      </section>
    );
  }

  return (
    <section className={compact ? "mt-16" : "pb-12"}>
      <SectionHeader
        overline="Products"
        title="Premium hydration collection"
        description="Clinical clarity meets calm luxury — curated for glass-skin radiance."
      />

      <FilterBar
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filteredProducts.length === 0 ? (
        <ProductState empty emptyMessage="No products match this filter yet." />
      ) : (
        <ProductGrid products={filteredProducts} />
      )}

      {!compact && (
        <div className="mt-16 space-y-16">
          <div>
            <SectionHeader
              overline="Featured Products"
              title="Editorial favorites"
              description="Signature formulas for luminous, hydrated skin."
            />
            {featuredProducts.length === 0 ? (
              <ProductState empty emptyMessage="No featured products yet." />
            ) : (
              <ProductGrid products={featuredProducts} />
            )}
          </div>

          <div>
            <SectionHeader
              overline="Best Sellers"
              title="Most loved by customers"
              description="Top-rated essentials in daily glow rituals."
            />
            {bestSellers.length === 0 ? (
              <ProductState empty emptyMessage="No best sellers yet." />
            ) : (
              <ProductGrid products={bestSellers} />
            )}
          </div>

          <div>
            <SectionHeader
              overline="New Arrivals"
              title="Fresh hydration launches"
              description="New textures, soothing actives, and weightless finish."
            />
            {newArrivals.length === 0 ? (
              <ProductState empty emptyMessage="No new arrivals yet." />
            ) : (
              <ProductGrid products={newArrivals} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
