import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductImage from "./ProductImage";

function highlightMatch(text, query) {
  if (!query?.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-gold/25 px-0.5 text-forest">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function SuggestionImage({ product }) {
  return (
    <ProductImage
      product={product}
      className="h-12 w-12 shrink-0"
      roundedClass="rounded-xl"
    />
  );
}

export default function SearchSuggestions({
  results,
  loading,
  query,
  visible,
  onSelect,
  onViewAll,
}) {
  if (!visible || !query.trim()) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-[calc(100%+8px)] z-60 overflow-hidden rounded-[20px] border border-gold/40 bg-cream/98 shadow-[0_24px_60px_-20px_rgba(36,52,42,0.28)] backdrop-blur-xl"
      >
        {loading ? (
          <div className="space-y-2 px-5 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-shimmer h-12 rounded-xl" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="px-5 py-6 text-center text-sm text-slate-500">
            No products found for &ldquo;{query}&rdquo;
          </div>
        ) : (
          <>
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.slice(0, 6).map((product, index) => (
                <motion.li
                  key={product.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    onClick={onSelect}
                    className="flex items-center gap-3 px-4 py-3 transition duration-200 hover:bg-sand/30"
                  >
                    <SuggestionImage product={product} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-forest">
                        {highlightMatch(product.name, query)}
                      </p>
                      <p className="truncate text-xs text-slate-500">{product.category}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-forest">
                      ₹{product.salePrice ?? product.price}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            {results.length > 0 && (
              <button
                type="button"
                onClick={onViewAll}
                className="w-full border-t border-gold/25 px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.14em] text-forest transition hover:bg-sand/25"
              >
                View all {results.length} results
              </button>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
