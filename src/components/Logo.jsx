import { motion } from "framer-motion";

export function LogoIcon({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="22" stroke="url(#glow-ring)" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M24 8c-2 8-8 12-8 18a8 8 0 0 0 16 0c0-6-6-10-8-18Z"
        fill="url(#glow-leaf)"
        stroke="#B8945E"
        strokeWidth="1"
      />
      <circle cx="24" cy="30" r="2.5" fill="#B8945E" opacity="0.8" />
      <defs>
        <linearGradient id="glow-leaf" x1="16" y1="8" x2="32" y2="36">
          <stop stopColor="#A8B09A" />
          <stop offset="1" stopColor="#24342A" />
        </linearGradient>
        <linearGradient id="glow-ring" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#B8945E" />
          <stop offset="1" stopColor="#A8B09A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({
  size = "md",
  showTagline = false,
  animated = false,
  light = false,
  className = "",
}) {
  const sizes = {
    sm: { icon: "h-7 w-7", title: "text-lg", tagline: "text-[10px]" },
    md: { icon: "h-9 w-9", title: "text-[1.55rem] md:text-[1.7rem]", tagline: "text-[11px] md:text-xs" },
    lg: { icon: "h-14 w-14", title: "text-4xl md:text-5xl", tagline: "text-sm" },
  };

  const s = sizes[size] || sizes.md;

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon className={s.icon} />
      <div>
        <span
          className={`display-heading block leading-none tracking-[0.04em] ${light ? "text-cream" : "text-forest"} ${s.title}`}
        >
          Glow Skin
        </span>
        {showTagline && (
          <span className={`mt-1 block text-slate-500 ${s.tagline}`}>
            Skincare that glows with you
          </span>
        )}
      </div>
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  );
}
