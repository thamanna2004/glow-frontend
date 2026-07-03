import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BackButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate(-1)}
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      title="Go Back"
      aria-label="Go Back"
      className={`group inline-flex h-10 w-10 items-center justify-center rounded-full border border-ice-200/80 bg-ivory/90 text-charcoal shadow-sm backdrop-blur-sm transition hover:border-gold/40 hover:bg-beige/60 hover:shadow-md ${className}`}
    >
      <span className="text-lg leading-none transition group-hover:text-gold">←</span>
    </motion.button>
  );
}
