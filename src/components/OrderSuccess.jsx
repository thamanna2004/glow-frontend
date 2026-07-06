import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import LogoLoader from "./LogoLoader";
import useUiStore from "../store/uiStore";

const CONFETTI = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 10 + (i * 7) % 80,
  delay: (i % 4) * 0.08,
  color: i % 3 === 0 ? "#b8945e" : i % 3 === 1 ? "#a8b09a" : "#24342a",
}));

export default function OrderSuccess() {
  const open = useUiStore((state) => state.orderSuccessOpen);
  const closeOrderSuccess = useUiStore((state) => state.closeOrderSuccess);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-115 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-forest/45 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="premium-modal-panel relative w-full max-w-md overflow-hidden px-8 py-10 text-center"
          >
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.12),transparent_65%)]"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {CONFETTI.map((c) => (
              <span
                key={c.id}
                className="confetti-particle pointer-events-none absolute top-8 h-2 w-2 rounded-full"
                style={{ left: `${c.left}%`, backgroundColor: c.color, animationDelay: `${c.delay}s` }}
              />
            ))}

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-light/80"
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-forest"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <motion.path d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>

              <div className="mb-2 scale-90">
                <LogoLoader compact size="sm" subtitle={null} showSubtitle={false} />
              </div>

              <h2 className="display-heading mt-6 text-3xl text-forest">
                Your order is confirmed ✨
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Thank you for choosing Glow Skin
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="flex-1" onClick={closeOrderSuccess}>
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
                <Link to="/orders" className="flex-1" onClick={closeOrderSuccess}>
                  <Button className="w-full">View Orders</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
