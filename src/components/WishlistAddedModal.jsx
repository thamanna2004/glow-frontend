import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import ProductImage from "./ProductImage";
import useUiStore from "../store/uiStore";

export default function WishlistAddedModal() {
  const product = useUiStore((state) => state.wishlistModalProduct);
  const closeWishlistModal = useUiStore((state) => state.closeWishlistModal);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && product) closeWishlistModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [product, closeWishlistModal]);

  const displayPrice = product?.salePrice ?? product?.discountPrice ?? product?.price;
  const hasDiscount = product?.discount > 0;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
        >
          <motion.button
            type="button"
            aria-label="Close wishlist popup"
            className="absolute inset-0 bg-forest/40 backdrop-blur-md"
            onClick={closeWishlistModal}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishlist-modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="premium-modal-panel relative w-full max-w-lg overflow-hidden"
          >
            <button
              type="button"
              onClick={closeWishlistModal}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-cream/90 text-forest transition hover:bg-cream"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="border-b border-gold/30 bg-sand/20 px-6 py-5">
              <p className="section-overline">Added to Wishlist</p>
              <h2 id="wishlist-modal-title" className="display-heading mt-1 text-3xl text-forest">
                Saved for later ♡
              </h2>
            </div>

            <div className="p-6">
              <div className="flex gap-5">
                <motion.div
                  initial={{ scale: 0.8, rotate: -8 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <ProductImage
                    product={product}
                    className="h-32 w-32 shrink-0"
                    roundedClass="rounded-2xl"
                  />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="inline-flex rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-forest">
                    {product.category}
                  </p>
                  <h3 className="display-heading mt-2 text-2xl text-forest">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {product.shortDescription || product.description}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-forest">₹{displayPrice}</span>
                    {hasDiscount && (
                      <span className="text-sm text-slate-400 line-through">₹{product.price}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to={`/products/${product.id}`} className="flex-1" onClick={closeWishlistModal}>
                  <Button className="w-full" variant="outline">
                    View Product
                  </Button>
                </Link>
                <Link to="/wishlist" className="flex-1" onClick={closeWishlistModal}>
                  <Button className="w-full">Go to Wishlist</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
