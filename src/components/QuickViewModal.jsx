import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import ProductImage from "./ProductImage";
import useUiStore from "../store/uiStore";
import useCartStore from "../store/cartStore";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useCartAnimation } from "../hooks/useCartAnimation";
import { showToast } from "../store/toastStore";
import { formatPrice, getProductUnitPrice } from "../utils/helpers";

function inferSkinType(product) {
  const text = `${product?.subCategory || ""} ${product?.category || ""} ${product?.description || ""}`.toLowerCase();
  if (/oily|acne|oil-control/.test(text)) return "Oily & combination skin";
  if (/dry|hydrat|moistur/.test(text)) return "Dry & dehydrated skin";
  if (/sensitive|calm|gentle/.test(text)) return "Sensitive skin";
  return "All skin types";
}

export default function QuickViewModal() {
  const product = useUiStore((s) => s.quickViewProduct);
  const closeQuickView = useUiStore((s) => s.closeQuickView);
  const openCartModal = useUiStore((s) => s.openCartModal);
  const addItem = useCartStore((s) => s.addItem);
  const { requireAuth } = useRequireAuth();
  const { animateAddToCart } = useCartAnimation();

  useEffect(() => {
    if (!product) return undefined;
    const onKey = (e) => e.key === "Escape" && closeQuickView();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, closeQuickView]);

  const ingredients = product?.ingredients || [
    "Botanical Extract Blend",
    "Hyaluronic Complex",
    "Green Tea Antioxidants",
  ];
  const benefits = product?.benefits || [
    "Deeply nourishes and hydrates",
    "Supports smoother skin texture",
    "Enhances natural radiance",
  ];

  const handleAddToCart = () => {
    if (!product) return;
    requireAuth(
      () => {
        const el = document.getElementById("quick-view-image");
        animateAddToCart(product, el);
        addItem(product, 1);
        openCartModal(product, 1);
        showToast("✓ Added to your cart");
        closeQuickView();
      },
      { pendingAction: { type: "ADD_TO_CART", product, quantity: 1 } }
    );
  };

  const unitPrice = product ? getProductUnitPrice(product) : 0;
  const hasDiscount = product?.discount > 0;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-110 flex items-center justify-center p-4"
        >
          <motion.button
            type="button"
            aria-label="Close quick view"
            className="absolute inset-0 bg-forest/50 backdrop-blur-md"
            onClick={closeQuickView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="premium-modal-panel relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden lg:flex-row"
          >
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-cream/95 text-forest"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="shrink-0 bg-sand/15 p-4 lg:w-[45%]">
              <div id="quick-view-image" className="overflow-hidden rounded-[24px]">
                <ProductImage
                  product={product}
                  className="w-full"
                  roundedClass="rounded-[24px]"
                  aspectClass="aspect-[4/5]"
                  priority
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <p className="inline-flex rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-forest">
                {product.category}
              </p>
              <h2 id="quick-view-title" className="display-heading mt-3 text-3xl text-forest md:text-4xl">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-gold">★ {product.rating} / 5</p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {product.description || product.shortDescription}
              </p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-forest">{formatPrice(unitPrice)}</span>
                {hasDiscount && (
                  <span className="text-sm text-slate-400 line-through">{formatPrice(product.price)}</span>
                )}
                {hasDiscount && (
                  <span className="rounded-full bg-forest px-2.5 py-0.5 text-[10px] font-semibold uppercase text-cream">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-gold/25 bg-cream/60 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Skin type</p>
                  <p className="mt-1 text-sm text-forest">{inferSkinType(product)}</p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Key ingredients</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {ingredients.slice(0, 4).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Benefits</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {benefits.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="flex-1 btn-ripple" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Link to={`/products/${product.id}`} className="flex-1" onClick={closeQuickView}>
                  <Button variant="outline" className="w-full">
                    Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
