import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LogoLoader from "./LogoLoader";
import useUiStore from "../store/uiStore";
import {
  EXIT_DURATION_MS,
  FULL_INTRO_MS,
  GOLD,
  GOLD_LIGHT,
  INTRO_TAGLINE,
  SAFETY_MAX_MS,
  SHORT_INTRO_MS,
  SMOOTH_EASE,
  hasVisitedIntro,
  markIntroVisited,
} from "../utils/introConstants";

const WAVE_PATH =
  "M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,320 L0,320 Z";

function GoldenWaves({ exiting }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute bottom-0 left-0 w-[200%]"
        animate={exiting ? { opacity: 0, y: 20 } : { x: ["0%", "-50%"], opacity: 1, y: 0 }}
        transition={
          exiting
            ? { duration: 0.3, ease: SMOOTH_EASE }
            : { x: { duration: 6, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
        }
      >
        <svg viewBox="0 0 1440 320" className="block w-full" preserveAspectRatio="none">
          <path d={WAVE_PATH} fill={GOLD} fillOpacity="0.22" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 w-[200%]"
        animate={exiting ? { opacity: 0, y: 24 } : { x: ["-25%", "-75%"], opacity: 1, y: 0 }}
        transition={
          exiting
            ? { duration: 0.3, ease: SMOOTH_EASE }
            : { x: { duration: 8, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
        }
      >
        <svg viewBox="0 0 1440 320" className="block w-full -translate-y-6" preserveAspectRatio="none">
          <path
            d="M0,192 C320,120 520,240 720,192 C920,144 1120,264 1440,192 L1440,320 L0,320 Z"
            fill={GOLD_LIGHT}
            fillOpacity="0.16"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 w-[200%]"
        animate={exiting ? { opacity: 0 } : { x: ["-10%", "-60%"], opacity: 1 }}
        transition={
          exiting
            ? { duration: 0.25, ease: SMOOTH_EASE }
            : { x: { duration: 10, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }
        }
      >
        <svg viewBox="0 0 1440 320" className="block w-full translate-y-2" preserveAspectRatio="none">
          <path
            d="M0,224 C360,180 540,260 720,224 C900,188 1080,268 1440,224 L1440,320 L0,320 Z"
            fill={GOLD}
            fillOpacity="0.1"
          />
        </svg>
      </motion.div>
    </div>
  );
}

function GoldenParticles({ exiting }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const particles = [
    { left: "20%", top: "28%", size: 3 },
    { left: "70%", top: "22%", size: 2 },
    { left: "82%", top: "55%", size: 2 },
    { left: "15%", top: "62%", size: 3 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: GOLD_LIGHT,
            boxShadow: `0 0 10px ${GOLD}55`,
          }}
          animate={exiting ? { opacity: 0 } : { y: [0, -8, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={
            exiting
              ? { duration: 0.25, ease: SMOOTH_EASE }
              : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }
          }
        />
      ))}
    </div>
  );
}

function IntroBackdrop({ exiting, isFirstVisit }) {
  const reduceMotion = useReducedMotion();

  if (isFirstVisit) {
    return (
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-forest via-[#1e2d24] to-espresso"
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.3, ease: SMOOTH_EASE }}
        aria-hidden
      >
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(184,148,94,0.18), transparent 52%)",
            }}
            animate={{ opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {!reduceMotion && (
          <motion.div
            className="absolute inset-0 bg-linear-to-tr from-gold/12 via-transparent to-gold-light/8"
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 bg-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.25, ease: SMOOTH_EASE }}
      aria-hidden
    />
  );
}

/**
 * Full-screen entry overlay — blocks scroll, clicks, and hides site content until complete.
 */
export default function IntroLoader() {
  const location = useLocation();
  const setIntroReady = useUiStore((state) => state.setIntroReady);
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [isFirstVisit] = useState(() => !hasVisitedIntro());
  const finishedRef = useRef(false);

  const isAdmin = location.pathname.startsWith("/admin");
  const totalMs = isFirstVisit ? FULL_INTRO_MS : SHORT_INTRO_MS;
  const exitMs = reduceMotion ? 150 : EXIT_DURATION_MS;

  const finishIntro = useCallback(
    (persistVisit = false) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setVisible(false);
      setIntroReady(true);
      if (persistVisit) markIntroVisited();
    },
    [setIntroReady]
  );

  useEffect(() => {
    if (isAdmin) {
      finishIntro(false);
      return undefined;
    }

    const exitTimer = window.setTimeout(() => setExiting(true), totalMs - exitMs);
    const safetyTimer = window.setTimeout(() => finishIntro(isFirstVisit), SAFETY_MAX_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [isAdmin, isFirstVisit, totalMs, exitMs, finishIntro]);

  useEffect(() => {
    if (!visible || isAdmin) return undefined;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [visible, isAdmin]);

  const handleExitComplete = () => {
    if (exiting) finishIntro(isFirstVisit);
  };

  if (!visible || isAdmin) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <motion.div
        key="glow-entry"
        id="glow-skin-smooth-entry-animation"
        role="dialog"
        aria-modal="true"
        aria-label="Glow Skin entry"
        initial={{ opacity: 1 }}
        animate={
          exiting
            ? { opacity: 0, filter: reduceMotion ? "none" : "blur(8px)" }
            : { opacity: 1, filter: "blur(0px)" }
        }
        exit={{ opacity: 0, filter: reduceMotion ? "none" : "blur(10px)" }}
        transition={{ duration: exitMs / 1000, ease: SMOOTH_EASE }}
        onAnimationComplete={() => {
          if (exiting) finishIntro(isFirstVisit);
        }}
        className="fixed inset-0 z-[200] touch-none select-none overflow-hidden"
        style={{ pointerEvents: "auto" }}
      >
        <IntroBackdrop exiting={exiting} isFirstVisit={isFirstVisit} />
        {isFirstVisit && <GoldenWaves exiting={exiting} />}
        {isFirstVisit && <GoldenParticles exiting={exiting} />}

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <LogoLoader
            onDark={isFirstVisit}
            exiting={exiting}
            subtitle={isFirstVisit ? INTRO_TAGLINE : null}
            showSubtitle={isFirstVisit}
            compact={!isFirstVisit}
            showTitle={false}
            size="lg"
            fast
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
