import { memo, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProductImage from "./ProductImage";
import HeartBurst from "./motion/HeartBurst";
import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import useWishlistStore from "../store/wishlistStore";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useCartAnimation } from "../hooks/useCartAnimation";
import { showToast } from "../store/toastStore";
import { SMOOTH_EASE } from "../utils/introConstants";

function WishlistHeart({ filled, bursting }) {
  return (
    <>
      <HeartBurst active={bursting} />
      <motion.svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5 stroke-current stroke-2"
        initial={false}
        animate={{
          scale: bursting ? [1, 1.3, 1] : 1,
          fill: filled ? "#b8945e" : "transparent",
          color: filled ? "#b8945e" : "currentColor",
        }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE }}
      >
        <path d="M12 21s-7.2-4.6-9-8.5A5.5 5.5 0 0 1 12 6.7a5.5 5.5 0 0 1 9 5.8C19.2 16.4 12 21 12 21Z" />
      </motion.svg>
    </>
  );
}

function ProductCard({ product, index = 0 }) {
  const imageRef = useRef(null);
  const [heartBurst, setHeartBurst] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const openWishlistModal = useUiStore((state) => state.openWishlistModal);
  const openCartModal = useUiStore((state) => state.openCartModal);
  const openQuickView = useUiStore((state) => state.openQuickView);
  const { requireAuth } = useRequireAuth();
  const { animateAddToCart } = useCartAnimation();
  const reduceMotion = useReducedMotion();

  const stars = useMemo(() => Math.round(product.rating || 0), [product.rating]);
  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = product.discount > 0;

  const handleWishlistClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      return;
    }
    requireAuth(
      () => {
        addToWishlist(product);
        setHeartBurst(true);
        window.setTimeout(() => setHeartBurst(false), 650);
        openWishlistModal(product);
        showToast("♡ Added to wishlist");
      },
      { pendingAction: { type: "ADD_TO_WISHLIST", product } }
    );
  };

  const handleAddToCart = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    requireAuth(
      () => {
        animateAddToCart(product, imageRef.current);
        addItem(product);
        openCartModal(product, 1);
        showToast("✓ Added to your cart");
      },
      { pendingAction: { type: "ADD_TO_CART", product, quantity: 1 } }
    );
  };

  const handleQuickView = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openQuickView(product);
  };

  return (
    <motion.article
      id={index === 0 ? "premium-animated-product-cards" : undefined}
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: SMOOTH_EASE, delay: (index % 4) * 0.08 }}
      className="group relative h-full"
    >
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -10 }}
        transition={{ duration: 0.4, ease: SMOOTH_EASE }}
        className="flex h-full flex-col overflow-hidden rounded-[24px] border border-gold/35 bg-cream shadow-[0_16px_40px_-20px_rgba(36,52,42,0.12)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_28px_60px_-20px_rgba(36,52,42,0.2)]"
      >
        {/* Image showcase */}
        <div className="relative overflow-hidden bg-sand/20">
          <Link to={`/products/${product.id}`} className="block">
            <div ref={imageRef}>
              <motion.div
                className="origin-center"
                whileHover={
                  reduceMotion
                    ? undefined
                    : { scale: 1.06, rotate: 1, transition: { duration: 0.45, ease: SMOOTH_EASE } }
                }
              >
                <ProductImage
                  product={product}
                  className="w-full"
                  roundedClass="rounded-none"
                  aspectClass="aspect-[4/5]"
                />
              </motion.div>
            </div>
          </Link>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-forest/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

          {hasDiscount && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-forest px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
              -{product.discount}%
            </span>
          )}

          <button
            type="button"
            onClick={handleWishlistClick}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-cream/90 text-forest shadow-sm backdrop-blur-md transition hover:border-gold hover:text-gold lg:opacity-0 lg:group-hover:opacity-100"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <WishlistHeart filled={isInWishlist} bursting={heartBurst} />
          </button>

          {/* Single action row — always visible on mobile, slides up on desktop hover */}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-0 p-3 transition-transform duration-500 lg:translate-y-full lg:group-hover:translate-y-0">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleQuickView}
                className="flex-1 rounded-full border border-cream/60 bg-cream/95 py-2 text-[11px] font-semibold uppercase tracking-wide text-forest backdrop-blur-sm transition hover:bg-cream"
              >
                Quick View
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded-full bg-forest py-2 text-[11px] font-semibold uppercase tracking-wide text-cream transition hover:bg-forest-deep"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
            {product.category}
          </span>

          <Link to={`/products/${product.id}`}>
            <h3 className="display-heading mt-2 line-clamp-2 text-lg leading-tight text-forest transition-colors duration-300 group-hover:text-gold md:text-xl">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-0.5 text-xs text-gold">
            {Array.from({ length: stars }).map((_, i) => (
              <span key={`${product.id}-s-${i}`}>★</span>
            ))}
            <span className="ml-1 text-slate-500">({product.rating})</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-semibold text-forest">₹{displayPrice}</span>
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through">₹{product.price}</span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {product.shortDescription}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default memo(ProductCard, (prev, next) => prev.product.id === next.product.id);
