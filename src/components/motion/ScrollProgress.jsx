import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[160] h-[2px] origin-left bg-linear-to-r from-gold/20 via-gold to-sage/60"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
