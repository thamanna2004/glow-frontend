import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "glow-offer-dismissed";

export default function WelcomeOfferModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-end justify-center p-4 sm:items-center"
        >
          <button
            type="button"
            aria-label="Close offer"
            className="absolute inset-0 bg-forest/35 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-sand/50 bg-linear-to-b from-cream to-sand/30 shadow-[0_32px_80px_-24px_rgba(36,52,42,0.2)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-gold to-transparent" />
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-ice-200 text-slate-500 transition hover:bg-beige hover:text-charcoal"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="px-8 pb-8 pt-10 text-center">
              <span className="inline-flex rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-forest">
                Exclusive Offer
              </span>
              <p className="mt-5 text-2xl">✨</p>
              <h2 className="display-heading mt-2 text-3xl text-forest md:text-4xl">
                Welcome to Glow Skin
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Get <span className="font-semibold text-forest">15% OFF</span> on your first order
              </p>

              <div className="mt-6 rounded-2xl border border-dashed border-gold/40 bg-beige/50 px-5 py-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Use code
                </p>
                <p className="display-heading mt-1 text-2xl tracking-[0.12em] text-forest">GLOW15</p>
              </div>

              <button
                type="button"
                onClick={dismiss}
                className="mt-6 w-full rounded-full bg-forest px-6 py-3 text-sm font-semibold tracking-wide text-cream transition duration-500 hover:bg-forest-deep hover:shadow-[0_12px_32px_-10px_rgba(184,148,94,0.3)]"
              >
                Start Shopping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
