import { memo, useState } from "react";
import { motion } from "framer-motion";
import { getFallbackProductImage, resolveProductImageUrl } from "../utils/productImageFallback";

function ProductImageInner({
  product,
  alt,
  className = "",
  roundedClass = "rounded-t-[24px]",
  aspectClass = "aspect-[4/5]",
  objectFit = "cover",
  priority = false,
}) {
  const label = alt || product?.name || "Product";
  const primarySrc = resolveProductImageUrl(product);
  const fallbackSrc = getFallbackProductImage(product);

  const [src, setSrc] = useState(primarySrc);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc);
      setLoaded(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-cream ${aspectClass} ${roundedClass} ${className}`}
    >
      {!loaded && <div className="skeleton-shimmer absolute inset-0 z-0" aria-hidden />}
      <motion.img
        key={src}
        src={src}
        alt={label}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 h-full w-full ${objectFit === "contain" ? "object-contain p-4" : "object-cover"}`}
      />
    </div>
  );
}

export default memo(ProductImageInner);
