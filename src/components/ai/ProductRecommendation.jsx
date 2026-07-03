import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../Button";
import useCartStore from "../../store/cartStore";
import useUiStore from "../../store/uiStore";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { showToast } from "../../store/toastStore";
import { trackAiProductClick } from "../../features/ai/api/aiApi";
import { normalizeProduct } from "../../utils/productNormalizer";

export default function ProductRecommendation({ products = [], onAdd }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCartModal = useUiStore((s) => s.openCartModal);
  const { requireAuth } = useRequireAuth();

  if (!products?.length) return null;

  const handleAdd = (raw) => {
    const product = normalizeProduct(raw);
    requireAuth(
      () => {
        addItem(product);
        openCartModal(product, 1);
        showToast("✓ Added to your cart");
        trackAiProductClick(product.id);
        onAdd?.(product);
      },
      { pendingAction: { type: "ADD_TO_CART", product, quantity: 1 } }
    );
  };

  return (
    <div className="mt-3 space-y-2">
      {products.map((product, index) => {
        const p = normalizeProduct(product);
        const image = p.image?.url || p.image || product.image;
        return (
          <motion.div
            key={p.id || index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-3 rounded-xl border border-gold/35 bg-cream/95 p-2.5"
          >
            {image && (
              <img
                src={image}
                alt={p.name}
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-forest">{p.name}</p>
              <p className="text-xs text-slate-500">₹{p.discountPrice ?? p.price}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <Link
                  to={`/products/${p.id}`}
                  className="text-[11px] font-medium text-gold hover:underline"
                  onClick={() => trackAiProductClick(p.id)}
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="text-[11px] font-medium text-forest hover:underline"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
