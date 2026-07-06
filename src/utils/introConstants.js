export const INTRO_VISITED_KEY = "glow-intro-complete";

export const SMOOTH_EASE = [0.22, 1, 0.36, 1];

/** First visit: ~1.5s · Return: quick flash */
export const FULL_INTRO_MS = 1550;
export const SHORT_INTRO_MS = 480;
export const EXIT_DURATION_MS = 350;
export const SAFETY_MAX_MS = 2400;

/** Champagne gold — matches --color-gold / --color-gold-light */
export const GOLD = "#b8945e";
export const GOLD_LIGHT = "#d4b88a";

export const BRAND_NAME = "Glow Skin";
export const INTRO_TAGLINE = "Your glow begins here ✨";

/** @deprecated */
export const FULL_INTRO_MS_LEGACY = FULL_INTRO_MS;
export const CINEMATIC_DURATION_MS = FULL_INTRO_MS;
export const SHORT_LOADER_MS = SHORT_INTRO_MS;

export function hasVisitedIntro() {
  try {
    return Boolean(localStorage.getItem(INTRO_VISITED_KEY));
  } catch {
    return false;
  }
}

export function markIntroVisited() {
  try {
    localStorage.setItem(INTRO_VISITED_KEY, "true");
  } catch {
    /* ignore */
  }
}
