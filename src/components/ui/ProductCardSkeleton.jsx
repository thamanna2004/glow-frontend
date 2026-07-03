import { motion } from "framer-motion";

export default function ProductCardSkeleton({ index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="premium-card-border overflow-hidden rounded-[28px]"
    >
      <div className="luxury-card overflow-hidden rounded-[27px]">
        <div className="skeleton-shimmer aspect-[4/5] w-full" />
        <div className="space-y-3 p-6">
          <div className="skeleton-shimmer h-5 w-20 rounded-full" />
          <div className="skeleton-shimmer h-7 w-3/4 rounded-lg" />
          <div className="skeleton-shimmer h-4 w-full rounded-lg" />
          <div className="skeleton-shimmer h-4 w-2/3 rounded-lg" />
          <div className="flex items-center justify-between pt-2">
            <div className="skeleton-shimmer h-6 w-16 rounded-lg" />
            <div className="skeleton-shimmer h-4 w-12 rounded-lg" />
          </div>
          <div className="skeleton-shimmer mt-2 h-11 w-full rounded-full" />
        </div>
      </div>
    </motion.article>
  );
}

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={`skeleton-${index}`} index={index} />
      ))}
    </div>
  );
}
