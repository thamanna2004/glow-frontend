import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import { BRAND_NAME, INTRO_TAGLINE, SMOOTH_EASE } from "../utils/introConstants";

/**
 * Reusable branded logo loader — fade, scale reveal, soft glow pulse.
 * Used in intro, page loaders, order success, and inline loading states.
 */
export default function LogoLoader({
  title = BRAND_NAME,
  subtitle = INTRO_TAGLINE,
  message,
  size = "lg",
  compact = false,
  onDark = false,
  exiting = false,
  showTitle = true,
  showSubtitle = !compact,
  fast = false,
}) {
  const reduceMotion = useReducedMotion();

  const enterDuration = fast ? 0.55 : 1.25;
  const exitDuration = fast ? 0.35 : 0.85;
  const subtitleDelay = fast ? 0.2 : 0.65;
  const subtitleDuration = fast ? 0.45 : 1;

  const glowPulse = reduceMotion
    ? { opacity: 0.4, scale: 1 }
    : { opacity: [0.26, 0.5, 0.26], scale: [0.97, 1.04, 0.97] };

  const titleClass = onDark ? "text-cream" : "text-forest";
  const subtitleClass = onDark ? "text-cream/85" : "text-slate-600";

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="relative">
        <motion.div
          className="absolute inset-0 -m-10 rounded-full bg-gold/20 blur-3xl"
          animate={exiting ? { opacity: 0, scale: 1.12 } : glowPulse}
          transition={
            exiting
              ? { duration: 0.8, ease: SMOOTH_EASE }
              : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
          }
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 -m-5 rounded-full bg-gold/16 blur-2xl"
          animate={
            exiting
              ? { opacity: 0 }
              : reduceMotion
                ? undefined
                : { opacity: [0.12, 0.36, 0.12], scale: [1, 1.06, 1] }
          }
          transition={
            exiting
              ? { duration: 0.7, ease: SMOOTH_EASE }
              : { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
          }
          aria-hidden
        />
        <motion.div
          animate={
            exiting
              ? { opacity: 0, rotate: 0 }
              : reduceMotion
                ? undefined
                : { rotate: 360 }
          }
          transition={
            exiting
              ? { duration: 0.65, ease: SMOOTH_EASE }
              : { duration: 16, repeat: Infinity, ease: "linear" }
          }
          className="absolute inset-0 -m-3 rounded-full border border-dashed border-gold/28"
          aria-hidden
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.82, y: 24 }}
          animate={
            exiting
              ? { opacity: 0, scale: 0.92, y: -12, filter: "blur(4px)" }
              : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
          }
          transition={
            exiting
              ? { duration: exitDuration, ease: SMOOTH_EASE }
              : { duration: enterDuration, ease: SMOOTH_EASE }
          }
          className="relative"
        >
          <Logo size={size} light={onDark} className="justify-center" />
        </motion.div>
      </div>

      {showTitle && title && compact && (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={exiting ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
          transition={
            exiting
              ? { duration: 0.6, ease: SMOOTH_EASE }
              : { delay: 0.35, duration: 0.9, ease: SMOOTH_EASE }
          }
          className={`display-heading text-lg tracking-[0.08em] md:text-xl ${titleClass}`}
        >
          {title}
        </motion.p>
      )}

      {showSubtitle && subtitle && (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={exiting ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          transition={
            exiting
              ? { duration: subtitleDuration * 0.8, ease: SMOOTH_EASE }
              : { delay: subtitleDelay, duration: subtitleDuration, ease: SMOOTH_EASE }
          }
          className={`display-heading text-lg tracking-[0.06em] md:text-2xl ${subtitleClass}`}
        >
          {subtitle}
        </motion.p>
      )}

      {message && (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={exiting ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
          transition={
            exiting
              ? { duration: 0.55, ease: SMOOTH_EASE }
              : { delay: compact ? 0.3 : 0.85, duration: 0.8, ease: SMOOTH_EASE }
          }
          className={`text-sm font-medium tracking-[0.14em] ${onDark ? "text-cream/70" : "text-slate-500"}`}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
