import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { buildCategoryPath } from "../features/category/utils/categoryUtils";
import { categoryVisuals, defaultCategoryVisual } from "../data/categoryVisuals";
import CategoryProductIcon from "./CategoryProductIcon";

export default function CategoryCard({ category, index = 0 }) {
  const to = category.slug
    ? buildCategoryPath(category.slug)
    : `/categories/skin/${category.id}`;

  const visual = categoryVisuals[category.slug] || defaultCategoryVisual;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={to} className="group relative block overflow-hidden rounded-[28px]">
        <motion.article
          whileHover={reduceMotion ? undefined : { y: -10, scale: 1.01 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-gold/45 bg-cream shadow-[0_24px_56px_-28px_rgba(43,36,32,0.18)] transition-shadow duration-500 hover:border-gold/70 hover:shadow-[0_36px_72px_-24px_rgba(36,52,42,0.2)]"
        >
          <div className={`relative h-72 overflow-hidden bg-linear-to-br ${visual.gradient} transition-all duration-700 group-hover:brightness-105`}>
            <motion.div
              className="absolute inset-0 scale-100 transition-transform duration-700 group-hover:scale-110"
            />
            {/* Soft radial glow behind product icon */}
            <motion.div
              className="pointer-events-none absolute right-4 top-6 h-40 w-40 rounded-full blur-2xl"
              style={{ background: visual.glow }}
              animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Animated product icon */}
            <motion.div
              className="absolute right-2 top-4 z-10 h-36 w-36 md:right-4 md:top-6 md:h-40 md:w-40"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -6, 0], rotate: [0, 2, -2, 0] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            >
              <CategoryProductIcon
                type={visual.iconType}
                className="h-full w-full drop-shadow-[0_12px_24px_rgba(36,52,42,0.12)]"
              />
            </motion.div>

            {/* Floating sparkle accents */}
            {!reduceMotion && (
              <>
                <motion.span
                  className="absolute right-16 top-10 h-1.5 w-1.5 rounded-full bg-gold/50"
                  animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="absolute right-8 top-20 h-1 w-1 rounded-full bg-gold/40"
                  animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
                />
              </>
            )}

            {/* Bottom gradient for text legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-forest/92 via-forest/45 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 p-6 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne/85 transition-transform duration-500 group-hover:-translate-y-1">
              Shop category
            </p>
            <motion.h3
              className="display-heading mt-2 text-3xl md:text-4xl"
              whileHover={reduceMotion ? undefined : { x: 4 }}
            >
              {category.name}
            </motion.h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/90">
              {category.description}
            </p>
            {category.itemCount && (
              <p className="mt-3 inline-flex rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-champagne backdrop-blur-sm">
                {category.itemCount} subcategories
              </p>
            )}
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-light transition duration-300 group-hover:gap-3 group-hover:text-gold">
              Explore
              <span aria-hidden>→</span>
            </span>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
