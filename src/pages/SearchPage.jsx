import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import ProductState from "../components/ProductState";
import { searchProducts } from "../services/searchService";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    searchProducts(query)
      .then((data) => {
        if (!cancelled) {
          setProducts(data.products);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setProducts([]);
          setLoading(false);
          setError(err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <section className="pb-12">
      <div className="mb-8 max-w-xl">
        <SearchBar key={query} defaultQuery={query} />
      </div>

      <header className="mb-8">
        <p className="section-overline">Search Results</p>
        <h1 className="display-heading mt-2 text-5xl text-navy-900 md:text-6xl">
          {query ? `"${query}"` : "Search Products"}
        </h1>
        {query && !loading && (
          <p className="mt-3 text-sm text-slate-600">
            {products.length} product{products.length === 1 ? "" : "s"} found
          </p>
        )}
      </header>

      <SearchResults query={query} products={products} loading={loading} />

      {error && !loading && (
        <div className="mt-6">
          <ProductState error={error} />
        </div>
      )}
    </section>
  );
}
