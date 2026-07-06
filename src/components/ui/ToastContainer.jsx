import { AnimatePresence, motion } from "framer-motion";
import useToastStore from "../../store/toastStore";

const typeStyles = {
  success: "border-forest/20 bg-cream/95 text-forest shadow-[0_16px_40px_-16px_rgba(36,52,42,0.12)]",
  info: "border-sage/40 bg-sage-light/30 text-forest",
  error: "border-gold/40 bg-cream text-espresso",
};

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 right-4 z-[120] flex w-full max-w-sm flex-col gap-3 sm:right-6"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-[0_20px_50px_-24px_rgba(44,42,38,0.18)] backdrop-blur-xl ${typeStyles[toast.type] || typeStyles.success}`}
          >
            <p className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-400 transition hover:text-charcoal"
              aria-label="Dismiss"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
