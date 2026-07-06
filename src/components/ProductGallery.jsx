import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProductImage from "./ProductImage";
import ImagePlaceholder from "./ImagePlaceholder";
import { getProductImageUrls } from "../utils/productNormalizer";

export default function ProductGallery({ product }) {
  const images = getProductImageUrls(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const activeSrc = images[activeIndex];

  return (
    <div className="space-y-4">
      <div className="premium-card-border overflow-hidden rounded-[28px]">
        <div className="luxury-card overflow-hidden rounded-[27px] p-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSrc || "placeholder"}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[22px]"
            >
              {activeSrc ? (
                <ProductImage
                  product={{ ...product, image: activeSrc }}
                  className="w-full"
                  roundedClass="rounded-[22px]"
                  aspectClass="aspect-[4/5] lg:aspect-[5/6]"
                  priority
                />
              ) : (
                <ImagePlaceholder
                  label={product?.name}
                  className="w-full rounded-[22px]"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((url, index) => (
            <motion.button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className={`relative shrink-0 overflow-hidden rounded-xl border-2 transition ${
                index === activeIndex
                  ? "border-gold shadow-[0_0_20px_rgba(184,148,94,0.25)]"
                  : "border-gold/25 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={url}
                alt={`${product.name} view ${index + 1}`}
                loading="lazy"
                className="h-20 w-16 object-cover sm:h-24 sm:w-20"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
