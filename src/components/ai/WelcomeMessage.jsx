import { motion } from "framer-motion";
import { LogoIcon } from "../Logo";

const WELCOME_TEXT =
  "Hi! I'm Glow AI. I can help you find the perfect skincare products.";

const CAPABILITIES = [
  "Product recommendations",
  "Skincare routines",
  "Ingredient guides",
  "Order help",
];

export default function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-gold/35 bg-linear-to-br from-cream via-sand/20 to-cream p-4 text-center shadow-sm"
    >
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-forest/5"
      >
        <LogoIcon className="h-7 w-7" />
      </motion.span>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="display-heading mt-3 text-lg text-forest"
      >
        Glow AI ✨
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="mt-2 text-sm leading-relaxed text-espresso"
      >
        {WELCOME_TEXT}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-4 flex flex-wrap justify-center gap-1.5"
      >
        {CAPABILITIES.map((item) => (
          <span
            key={item}
            className="rounded-full border border-gold/30 bg-cream/80 px-2.5 py-1 text-[10px] font-medium text-forest/80"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
