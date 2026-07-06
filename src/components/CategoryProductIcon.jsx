import { motion, useReducedMotion } from "framer-motion";

const GOLD = "#b8945e";
const CREAM = "#f4efe6";
const SAGE = "#a8b09a";
const FOREST = "#24342a";

function floatTransition(reduceMotion, delay = 0) {
  if (reduceMotion) return undefined;
  return {
    y: [0, -8, 0],
    transition: { duration: 4 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay },
  };
}

function MoisturizerJar({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion)}>
      <rect x="38" y="52" width="44" height="56" rx="10" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <rect x="44" y="44" width="32" height="12" rx="4" fill={CREAM} stroke={GOLD} strokeWidth="1.2" />
      <path d="M48 68h24M48 78h18" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <motion.ellipse
        cx="60" cy="62" rx="14" ry="4" fill={GOLD}
        animate={reduceMotion ? undefined : { opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.g>
  );
}

function SerumDropper({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.2)}>
      <rect x="46" y="70" width="28" height="38" rx="6" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <path d="M52 48v22M68 48v22" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="44" r="6" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <motion.circle
        cx="60" cy="86" r="3" fill={GOLD}
        animate={reduceMotion ? undefined : { y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.g>
  );
}

function CleanserBottle({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.15)}>
      <path d="M44 52h32v54a8 8 0 0 1-8 8H52a8 8 0 0 1-8-8V52Z" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <rect x="50" y="42" width="20" height="12" rx="3" fill={CREAM} stroke={GOLD} strokeWidth="1.2" />
      <motion.path
        d="M52 72c6-4 12-4 16 0"
        stroke={SAGE}
        strokeWidth="1.5"
        fill="none"
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      />
    </motion.g>
  );
}

function MaskSheet({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.25)}>
      <path
        d="M36 58c8-12 40-12 48 0v40c0 8-40 8-48 0V58Z"
        fill={CREAM}
        stroke={GOLD}
        strokeWidth="1.5"
      />
      <ellipse cx="48" cy="72" rx="5" ry="7" fill="none" stroke={SAGE} strokeWidth="1.2" />
      <ellipse cx="72" cy="72" rx="5" ry="7" fill="none" stroke={SAGE} strokeWidth="1.2" />
      <path d="M54 88h12" stroke={SAGE} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </motion.g>
  );
}

function TonerMist({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.1)}>
      <rect x="42" y="58" width="36" height="50" rx="8" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <rect x="52" y="48" width="16" height="12" rx="4" fill={CREAM} stroke={GOLD} strokeWidth="1.2" />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={78 + i * 6}
          cy={50 + i * 8}
          r="2"
          fill={GOLD}
          opacity="0.5"
          animate={reduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </motion.g>
  );
}

function BodyLotion({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.3)}>
      <rect x="40" y="50" width="40" height="62" rx="12" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <rect x="48" y="42" width="24" height="10" rx="5" fill={CREAM} stroke={GOLD} strokeWidth="1.2" />
      <path d="M48 76h24" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M48 86h16" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </motion.g>
  );
}

function TreatmentTube({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.2)}>
      <path d="M46 48h28l-4 64H50L46 48Z" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <rect x="50" y="42" width="20" height="8" rx="2" fill={GOLD} opacity="0.35" />
      <motion.circle
        cx="60" cy="72" r="4" fill={GOLD}
        animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.g>
  );
}

function EyeCream({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.15)}>
      <ellipse cx="60" cy="88" rx="28" ry="10" fill={FOREST} opacity="0.08" />
      <rect x="34" y="68" width="52" height="28" rx="14" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <circle cx="48" cy="82" r="6" fill="none" stroke={SAGE} strokeWidth="1.2" />
      <circle cx="72" cy="82" r="6" fill="none" stroke={SAGE} strokeWidth="1.2" />
    </motion.g>
  );
}

function LipBalm({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.25)}>
      <rect x="44" y="72" width="32" height="36" rx="6" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      <rect x="50" y="52" width="20" height="22" rx="4" fill={GOLD} opacity="0.25" stroke={GOLD} strokeWidth="1.2" />
      <motion.path
        d="M52 62 Q60 58 68 62"
        stroke={GOLD}
        strokeWidth="1.5"
        fill="none"
        animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.g>
  );
}

function Sunscreen({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.1)}>
      <circle cx="60" cy="56" r="18" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="60"
          y1="56"
          x2={60 + 26 * Math.cos((deg * Math.PI) / 180)}
          y2={56 + 26 * Math.sin((deg * Math.PI) / 180)}
          stroke={GOLD}
          strokeWidth="1"
          opacity="0.35"
        />
      ))}
      <rect x="42" y="78" width="36" height="32" rx="6" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
    </motion.g>
  );
}

function SkinTool({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion, 0.2)}>
      <ellipse cx="60" cy="108" rx="22" ry="6" fill={FOREST} opacity="0.1" />
      <rect x="54" y="48" width="12" height="56" rx="6" fill={SAGE} opacity="0.5" stroke={GOLD} strokeWidth="1.2" />
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 44px", transformBox: "fill-box" }}
      >
        <circle cx="60" cy="44" r="14" fill={CREAM} stroke={GOLD} strokeWidth="1.5" />
      </motion.g>
    </motion.g>
  );
}

function DefaultGlow({ reduceMotion }) {
  return (
    <motion.g animate={floatTransition(reduceMotion)}>
      <circle cx="60" cy="72" r="28" fill={GOLD} opacity="0.12" stroke={GOLD} strokeWidth="1" />
      <path
        d="M60 48c-2 8-8 12-8 18a8 8 0 0 0 16 0c0-6-6-10-8-18Z"
        fill={SAGE}
        opacity="0.6"
        stroke={GOLD}
        strokeWidth="1"
      />
    </motion.g>
  );
}

const ICON_MAP = {
  moisturizers: MoisturizerJar,
  serums: SerumDropper,
  cleansers: CleanserBottle,
  masks: MaskSheet,
  toners: TonerMist,
  "body-care": BodyLotion,
  "acne-treatment": TreatmentTube,
  "eye-care": EyeCream,
  "lip-care": LipBalm,
  "sun-care": Sunscreen,
  "skin-tools": SkinTool,
};

export default function CategoryProductIcon({ type = "default", className = "" }) {
  const reduceMotion = useReducedMotion();
  const Icon = ICON_MAP[type] || DefaultGlow;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden
    >
      <Icon reduceMotion={reduceMotion} />
    </svg>
  );
}
