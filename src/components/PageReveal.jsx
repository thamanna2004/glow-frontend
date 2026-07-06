import { motion, useReducedMotion } from "framer-motion";
import useUiStore from "../store/uiStore";
import { SMOOTH_EASE } from "../utils/introConstants";

/**
 * Reveals the main app after intro — opacity + slide only (no filter; filter breaks fixed modals).
 */
export default function PageReveal({ children, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.45,
        ease: SMOOTH_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Light fade for in-app route changes (after entry). */
export function RouteReveal({ children, className = "" }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={{ duration: 0.45, ease: SMOOTH_EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hides storefront routes until intro completes. Overlays/modals must render outside this.
 */
export function IntroGate({ children, className = "" }) {
  const introReady = useUiStore((state) => state.introReady);

  if (!introReady) {
    return (
      <div
        className={className}
        aria-hidden
        style={{ visibility: "hidden", pointerEvents: "none" }}
      />
    );
  }

  return <PageReveal className={className}>{children}</PageReveal>;
}
