import { useRef } from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-forest text-cream border border-gold/35 hover:bg-forest-deep hover:border-gold/55 hover:shadow-[0_16px_40px_-14px_rgba(36,52,42,0.45)] shadow-[0_12px_32px_-12px_rgba(36,52,42,0.35)]",
  soft: "bg-cream text-forest border border-gold/50 hover:bg-champagne hover:border-gold/65 backdrop-blur-sm",
  outline:
    "bg-cream/80 text-forest border border-gold/50 hover:border-gold/75 hover:bg-cream hover:shadow-[0_8px_24px_-8px_rgba(184,148,94,0.2)]",
  gold: "bg-gold text-forest border border-gold-light/60 hover:bg-gold-light shadow-[0_14px_36px_-12px_rgba(184,148,94,0.4)]",
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
  loading = false,
}) {
  const isDisabled = disabled || loading;
  const ref = useRef(null);

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={
        isDisabled
          ? undefined
          : { y: -2, scale: 1.02, boxShadow: "0 20px 48px -16px rgba(184,148,94,0.35)" }
      }
      whileTap={isDisabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`btn-ripple relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] || variants.primary} ${className}`}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
      )}
      {children}
    </motion.button>
  );
}
