import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useUiStore from "../store/uiStore";
import { SMOOTH_EASE } from "../utils/introConstants";
import Button from "./Button";
import Logo from "./Logo";

export const WELCOME_STORAGE_KEY = "glow-welcome-seen";

/** Delay after intro so page reveal finishes before the popup */
const WELCOME_DELAY_MS = 1100;

function SkincareIllustration() {
  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-linear-to-br from-beige via-gold-light/40 to-sage-light/50"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg viewBox="0 0 120 120" className="relative h-28 w-28" fill="none" aria-hidden>
        <ellipse cx="60" cy="95" rx="28" ry="6" fill="#C9A96E" opacity="0.2" />
        <rect x="44" y="30" width="32" height="58" rx="8" fill="#FAF8F4" stroke="#C9A96E" strokeWidth="1.5" />
        <rect x="48" y="24" width="24" height="10" rx="4" fill="#EDE3D7" stroke="#C9A96E" strokeWidth="1" />
        <path d="M52 48h16M52 58h12" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <motion.circle
          cx="72"
          cy="42"
          r="4"
          fill="#C9A96E"
          animate={{ y: [0, 6, 0], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <path
          d="M28 50c4-8 12-12 20-10s14 10 10 18"
          stroke="#C5D4C0"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function hasSeenWelcome() {
  try {
    return Boolean(localStorage.getItem(WELCOME_STORAGE_KEY));
  } catch {
    return false;
  }
}

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const introReady = useUiStore((state) => state.introReady);
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (!introReady || hasSeenWelcome() || scheduledRef.current) return undefined;

    scheduledRef.current = true;
    const timer = window.setTimeout(() => {
      if (!hasSeenWelcome()) setOpen(true);
    }, WELCOME_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [introReady]);

  const dismiss = () => {
    try {
      localStorage.setItem(WELCOME_STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[165] flex items-end justify-center p-4 sm:items-center"
          id="glow-skin-user-experience"
        >
          <button
            type="button"
            aria-label="Close welcome"
            className="absolute inset-0 bg-forest/35 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-gold/45 bg-linear-to-b from-cream to-sand/25 shadow-[0_40px_90px_-30px_rgba(36,52,42,0.22)] sm:max-w-md"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-gold to-transparent" />
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-cream/95 text-slate-500 transition hover:bg-beige hover:text-espresso"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="px-8 pb-8 pt-10 text-center">
              <SkincareIllustration />
              <h2 className="display-heading mt-6 text-3xl text-forest md:text-4xl">
                Welcome to Glow Skin ✨
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Discover skincare made to bring out your natural glow.
              </p>
              <Link to="/shop" onClick={dismiss} className="mt-8 block">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
