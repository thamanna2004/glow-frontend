import { motion, AnimatePresence } from "framer-motion";
import LogoLoader from "./LogoLoader";
import { SMOOTH_EASE } from "../utils/introConstants";

const overlayClass =
  "fixed inset-0 z-[130] flex items-center justify-center bg-cream/94 backdrop-blur-md";

const inlineClass = "flex min-h-[50vh] items-center justify-center py-16";

/**
 * Reusable page loader — overlay (login, checkout) or inline (route/data loading).
 */
export function PageLoaderContent({
  message = "Creating your glow...",
  compact = true,
  onDark = false,
}) {
  return (
    <LogoLoader
      message={message}
      subtitle={null}
      compact={compact}
      showSubtitle={false}
      size="lg"
      onDark={onDark}
    />
  );
}

export default function PageLoader({
  visible = false,
  message = "Creating your glow...",
  variant = "overlay",
}) {
  if (variant === "inline") {
    if (!visible) return null;
    return (
      <div className={inlineClass}>
        <PageLoaderContent message={message} />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          className={overlayClass}
          role="status"
          aria-live="polite"
          aria-label={message}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE }}
          >
            <PageLoaderContent message={message} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
