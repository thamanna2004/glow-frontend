import { motion, AnimatePresence } from "framer-motion";

const PARTICLES = [
  { x: -14, y: -18, delay: 0 },
  { x: 16, y: -12, delay: 0.04 },
  { x: -8, y: 14, delay: 0.08 },
  { x: 12, y: 10, delay: 0.06 },
  { x: 0, y: -22, delay: 0.02 },
];

export default function HeartBurst({ active }) {
  return (
    <AnimatePresence>
      {active &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={`${active}-${i}`}
            initial={{ opacity: 0.9, scale: 0.4, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: p.delay, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
          />
        ))}
    </AnimatePresence>
  );
}
