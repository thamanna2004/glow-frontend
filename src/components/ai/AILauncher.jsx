import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "../Logo";
import useUiStore from "../../store/uiStore";

const TEASER_KEY = "glow-ai-teaser-dismissed";
const TEASER_DELAY_MS = 2400;

const TEASER_TEXT =
  "Hi! I'm Glow AI ✨ — ask me about products, routines, or your skin type.";

function hasDismissedTeaser() {
  try {
    return Boolean(localStorage.getItem(TEASER_KEY));
  } catch {
    return false;
  }
}

export default function AILauncher({ open, onToggle }) {
  const introReady = useUiStore((s) => s.introReady);
  const [showTeaser, setShowTeaser] = useState(false);
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (!introReady || open || hasDismissedTeaser() || scheduledRef.current) return undefined;

    scheduledRef.current = true;
    const timer = window.setTimeout(() => {
      if (!hasDismissedTeaser() && !open) setShowTeaser(true);
    }, TEASER_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [introReady, open]);

  useEffect(() => {
    if (open) setShowTeaser(false);
  }, [open]);

  const dismissTeaser = () => {
    try {
      localStorage.setItem(TEASER_KEY, "true");
    } catch {
      /* ignore */
    }
    setShowTeaser(false);
  };

  const handleOpen = () => {
    dismissTeaser();
    onToggle();
  };

  if (open) return null;

  return (
    <div className="pointer-events-auto flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTeaser && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[min(300px,calc(100vw-3rem))]"
          >
            <div className="rounded-2xl border border-gold/45 bg-cream px-4 py-3.5 shadow-[0_20px_50px_-16px_rgba(36,52,42,0.35)]">
              <button
                type="button"
                onClick={dismissTeaser}
                className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-sand/40 hover:text-forest"
                aria-label="Dismiss"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-2">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <p className="pr-5 text-sm font-medium leading-snug text-forest">
                {TEASER_TEXT}
              </p>
              <button
                type="button"
                onClick={handleOpen}
                className="mt-2.5 text-xs font-semibold text-gold hover:text-forest"
              >
                Chat with Glow AI →
              </button>
            </div>
            <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-gold/45 bg-cream" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleOpen}
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          boxShadow: [
            "0 16px 40px -12px rgba(36,52,42,0.45), 0 0 0 0 rgba(184,148,94,0.4)",
            "0 20px 48px -12px rgba(36,52,42,0.5), 0 0 0 10px rgba(184,148,94,0)",
            "0 16px 40px -12px rgba(36,52,42,0.45), 0 0 0 0 rgba(184,148,94,0.4)",
          ],
        }}
        transition={{
          opacity: { delay: 0.3, duration: 0.5 },
          y: { delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          scale: { delay: 0.3, duration: 0.55 },
          boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group relative flex items-center gap-2.5 overflow-visible rounded-full border border-gold/55 bg-forest py-3 pl-3.5 pr-5 text-cream"
        aria-label="Open Glow AI assistant"
      >
        {/* Pulse rings */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-gold/50"
            animate={{ scale: [1, 1.35 + i * 0.15], opacity: [0.55, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.9,
            }}
          />
        ))}

        {/* Soft glow behind button */}
        <span className="pointer-events-none absolute -inset-1 rounded-full bg-gold/20 blur-md" />

        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-gold/15">
          <LogoIcon className="h-6 w-6" />
        </span>

        <span className="relative text-left">
          <span className="display-heading block text-sm leading-none">Glow AI</span>
          <span className="mt-0.5 hidden text-[10px] font-medium tracking-wide text-gold-light/90 sm:block">
            Skincare expert
          </span>
        </span>

        <motion.span
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative text-base leading-none"
          aria-hidden
        >
          ✨
        </motion.span>

        {/* Live indicator */}
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-forest bg-gold" />
        </span>
      </motion.button>
    </div>
  );
}
