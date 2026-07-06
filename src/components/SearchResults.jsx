import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹500", value: "0-500" },
  { label: "₹500 – ₹999", value: "500-999" },
  { label: "₹1000 – ₹1499", value: "1000-1499" },
  { label: "₹1500+", value: "1500+" },
];

const ratingFilters = [
  { label: "All Ratings", value: "all" },
  { label: "4.5+ Stars", value: "4.5" },
  { label: "4.0+ Stars", value: "4.0" },
  { label: "3.5+ Stars", value: "3.5" },
];

function matchesPrice(product, range) {
  if (range === "all") return true;
  const price = Number(product.price);
  if (range === "0-500") return price < 500;
  if (range === "500-999") return price >= 500 && price <= 999;
  if (range === "1000-1499") return price >= 1000 && price <= 1499;
  if (range === "1500+") return price >= 1500;
  return true;
}

export default function SearchResults({ query, products, loading }) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return unique.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        categoryFilter === "all" || product.category === categoryFilter;
      const priceMatch = matchesPrice(product, priceFilter);
      const ratingMatch =
        ratingFilter === "all" || Number(product.rating) >= Number(ratingFilter);
      return categoryMatch && priceMatch && ratingMatch;
    });
  }, [products, categoryFilter, priceFilter, ratingFilter]);

  if (loading) {
    return (
      <div className="rounded-[24px] glass-panel p-12 text-center text-sm text-slate-500">
        Searching for &ldquo;{query}&rdquo;...
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="rounded-[24px] glass-panel p-12 text-center">
        <p className="section-overline">Search</p>
        <h2 className="display-heading mt-2 text-3xl text-navy-900">Find your glow</h2>
        <p className="mt-3 text-sm text-slate-500">
          Type a product name, category, or ingredient in the search bar above.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[24px] glass-panel p-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-ice-50 text-ice-400">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4.5-4.5" />
          </svg>
        </div>
        <p className="section-overline">No Results</p>
        <h2 className="display-heading mt-2 text-3xl text-navy-900">No products found</h2>
        <p className="mt-3 text-sm text-slate-500">
          We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try a different keyword like
          serum, moisturizer, or vitamin c.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-[24px] p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-slate-600">
            <span className="font-medium text-navy-900">{filteredProducts.length}</span> of{" "}
            <span className="font-medium text-navy-900">{products.length}</span> results
          </p>
          <div className="flex flex-wrap gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-full border border-ice-200 bg-white px-4 py-2 text-sm text-navy-900 outline-none focus:border-ice-300"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="rounded-full border border-ice-200 bg-white px-4 py-2 text-sm text-navy-900 outline-none focus:border-ice-300"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rounded-full border border-ice-200 bg-white px-4 py-2 text-sm text-navy-900 outline-none focus:border-ice-300"
            >
              {ratingFilters.map((rating) => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-[24px] glass-panel p-10 text-center text-sm text-slate-500">
          No products match your filters. Try adjusting category, price, or rating.
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}
