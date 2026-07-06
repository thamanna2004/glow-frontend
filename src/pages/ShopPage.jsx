import { useMemo, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";
import { useCategories, useProducts } from "../hooks/useStoreProducts";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const productsQuery = useProducts({ search, category });
  const categoriesQuery = useCategories();

  const categoryOptions = useMemo(
    () => [{ id: "all", name: "All" }, ...(categoriesQuery.data || [])],
    [categoriesQuery.data]
  );

  if (productsQuery.isLoading || categoriesQuery.isLoading) {
    return <Loader label="Loading your skincare experience..." />;
  }

  return (
    <section className="pb-10">
      <header className="rounded-[30px] border border-white/35 bg-white/55 p-6 backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
          Shop Products
        </p>
        <h1 className="display-heading mt-3 text-5xl text-navy-900 md:text-6xl">
          Premium skincare collection
        </h1>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="Search by product name or concern"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-full border border-ice-200 bg-white px-5 py-3 text-sm outline-none placeholder:text-slate-600/60 focus:border-ice-300"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-full border border-ice-200 bg-white px-5 py-3 text-sm outline-none focus:border-ice-300"
          >
            {categoryOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="mt-8">
        {productsQuery.data?.length ? (
          <ProductGrid products={productsQuery.data} />
        ) : (
          <div className="rounded-[24px] glass-panel p-10 text-center text-slate-600">
            No products matched your filters.
          </div>
        )}
      </div>
    </section>
  );
}
