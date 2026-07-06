import { motion, useReducedMotion } from "framer-motion";
import { SMOOTH_EASE } from "../utils/introConstants";

function initials(name = "Glow") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "G";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Stars({ value = 5 }) {
  const filled = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < filled ? "text-gold" : "text-sand/80"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewCard({ review, index = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: index * 0.06 }}
      className="group relative h-full overflow-hidden rounded-[26px] border border-gold/30 bg-linear-to-br from-cream via-sand/15 to-champagne/35 p-6 shadow-[0_18px_50px_-26px_rgba(36,52,42,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/55 hover:shadow-[0_30px_72px_-26px_rgba(36,52,42,0.26)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-sage/18 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/35 bg-cream/80 text-sm font-semibold text-forest shadow-sm">
              {initials(review.author)}
            </div>
            <div>
              <p className="text-sm font-semibold text-forest">{review.author}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                Verified customer
              </p>
            </div>
          </div>

          <div className="text-right">
            <Stars value={review.rating} />
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">Glow ritual</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-start gap-3">
            <span className="mt-1 text-2xl leading-none text-gold/70" aria-hidden>
              “
            </span>
            <div className="min-w-0">
              <h3 className="display-heading text-2xl text-forest md:text-3xl">{review.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gold/20 pt-4">
          <p className="text-xs font-medium text-slate-500">Loved for visible glow</p>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            4.8 average
          </span>
        </div>
      </div>
    </motion.article>
  );
}
