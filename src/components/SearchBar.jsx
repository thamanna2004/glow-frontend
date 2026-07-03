import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { searchProducts } from "../services/searchService";
import SearchSuggestions from "./SearchSuggestions";

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 fill-none stroke-current stroke-[1.75] ${className}`}
    >
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </svg>
  );
}

export default function SearchBar({ className = "", inputClassName = "", defaultQuery = "" }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    searchProducts(debouncedQuery)
      .then((data) => {
        if (!cancelled) {
          setResults(data.products);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResults([]);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSearchPage = (value = query) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setShowSuggestions(false);
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    goToSearchPage();
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      role="search"
    >
      <label className="relative block">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for products..."
          className={`w-full rounded-full border border-gold/40 bg-cream/95 py-2.5 pl-11 pr-4 text-sm text-forest outline-none transition placeholder:text-slate-400 focus:border-gold/65 focus:bg-cream focus:shadow-[0_0_0_3px_rgba(184,148,94,0.12)] ${inputClassName}`}
          aria-label="Search products"
          aria-autocomplete="list"
          aria-expanded={showSuggestions && Boolean(query.trim())}
        />
      </label>

      <SearchSuggestions
        results={results}
        loading={loading}
        query={query}
        visible={showSuggestions}
        onSelect={() => {
          setShowSuggestions(false);
          setQuery("");
        }}
        onViewAll={() => goToSearchPage()}
      />
    </form>
  );
}
