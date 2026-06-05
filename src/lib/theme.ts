/**
 * Theme store + controller (framework-agnostic — no React import).
 * D15 / D17: single source of truth for global presentation state.
 * Applied pre-paint via inline script in BaseLayout; also callable at runtime
 * by the control-panel island.
 *
 * D17 — TWO INDEPENDENT AXES:
 *   • theme  = pure styling (colours, fonts, type scale, radius, accent,
 *              background treatment, borders, shadows)
 *   • layout = pure structure (DOM arrangement/composition — hero layout,
 *              grid columns, section-heading structure, which blocks appear
 *              and where, nav style, page-scroll vs app-shell)
 *
 * Theme registry: maps Theme name → vanilla-extract theme class string.
 * Populated lazily so this module stays SSR-safe (no direct VE CSS imports here;
 * BaseLayout registers the classes via registerThemeClasses() on mount).
 */

import { persistentMap } from '@nanostores/persistent';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Styling axis: colours, fonts, type scale, radius, accent, background
 * treatment (grid dots vs paper vs blobs), border style, shadows.
 */
export const THEME_IDS = ['control-plane', 'editorial', 'kinetic', 'calm-console'] as const;
export type Theme = (typeof THEME_IDS)[number];

/**
 * Structure axis: DOM arrangement/composition — hero layout (centred vs
 * off-centre), grid columns, section-heading structure, which blocks/elements
 * appear and where, nav style, page-scroll vs app-shell shell.
 *
 * THEME_IDS / LAYOUT_IDS are the single source of truth for the two axes — the
 * union types derive from them, and stats (e.g. the design matrix) count them,
 * so adding an axis value updates the type, the presets it must fill, and the
 * site's published numbers together.
 */
export const LAYOUT_IDS = ['control-plane', 'editorial', 'kinetic', 'dashboard'] as const;
export type Layout = (typeof LAYOUT_IDS)[number];

export type Mode = 'dark' | 'light';
export type Density = 'comfortable' | 'compact';

/** The rich typed state used by applyTheme and the control panel. */
export interface ThemeState {
  /** Styling axis (D17). */
  theme: Theme;
  /** Structure axis (D17). */
  layout: Layout;
  mode: Mode;
  /** Accent hue in oklch (0–360). Control-plane cyan ≈ 205. */
  accentHue: number;
  /** Font-set identifier — 'default' = Sora/Inter/JetBrains Mono. */
  fontSet: string;
  /** Whether motion/animation is enabled (complements prefers-reduced-motion). */
  motion: boolean;
  density: Density;
}

/**
 * Storage representation: all fields are strings so nanostores persistentMap
 * can serialise them directly to localStorage.
 * applyTheme() accepts ThemeState (parsed); the store holds PersistentThemeState.
 */
export interface PersistentThemeState extends Record<string, string | undefined> {
  theme: string;
  layout: string;
  mode: string;
  accentHue: string;
  fontSet: string;
  motion: string; // 'true' | 'false'
  density: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

// Default design = D3 (calm-console theme + dashboard layout). The bare homepage
// sends dashboard-default visitors to /app (see ThemeScript). Supersedes D11's
// control-plane default. (D23)
export const THEME_DEFAULTS: ThemeState = {
  theme: 'calm-console',
  layout: 'dashboard',
  mode: 'dark',
  accentHue: 265,
  fontSet: 'default',
  motion: true,
  density: 'comfortable',
};

const PERSISTENT_DEFAULTS: PersistentThemeState = {
  theme: THEME_DEFAULTS.theme,
  layout: THEME_DEFAULTS.layout,
  mode: THEME_DEFAULTS.mode,
  accentHue: String(THEME_DEFAULTS.accentHue),
  fontSet: THEME_DEFAULTS.fontSet,
  motion: String(THEME_DEFAULTS.motion),
  density: THEME_DEFAULTS.density,
};

// ─── Store ────────────────────────────────────────────────────────────────────

/** localStorage key prefix shared by the persistent store + any inline scripts. */
export const STORAGE_PREFIX = 'mikearnett.theme:';

/**
 * Persistent nanostores map keyed 'mikearnett.theme:'.
 * Each field is serialised as an individual localStorage key under that prefix.
 * SSR-safe: reads/writes only on the client; server always sees defaults.
 */
export const themeStore = persistentMap<PersistentThemeState>(STORAGE_PREFIX, PERSISTENT_DEFAULTS);

// ─── Parser ───────────────────────────────────────────────────────────────────

/** Convert string-valued store state → typed ThemeState. */
export function parseThemeState(raw: PersistentThemeState): ThemeState {
  return {
    theme: (raw.theme as Theme) ?? THEME_DEFAULTS.theme,
    layout: (raw.layout as Layout) ?? THEME_DEFAULTS.layout,
    mode: (raw.mode as Mode) ?? THEME_DEFAULTS.mode,
    accentHue: Number(raw.accentHue) || THEME_DEFAULTS.accentHue,
    fontSet: raw.fontSet ?? THEME_DEFAULTS.fontSet,
    motion: raw.motion !== 'false',
    density: (raw.density as Density) ?? THEME_DEFAULTS.density,
  };
}

// ─── Theme (VE token class) registry ─────────────────────────────────────────

/**
 * Maps Theme name → vanilla-extract theme class string.
 * Populated by registerThemeClasses() called from BaseLayout's client script
 * or the control-panel island before applyTheme() is called at runtime.
 *
 * The VE createTheme classes are THEME classes (styling axis only).
 */
let _themeClasses: Partial<Record<Theme, string>> = {};

export function registerThemeClasses(map: Partial<Record<Theme, string>>): void {
  _themeClasses = { ..._themeClasses, ...map };
}

// ─── Applier ──────────────────────────────────────────────────────────────────

/**
 * Pure side-effect: maps ThemeState → data-* attributes + CSS custom property
 * overrides on `document.documentElement`. Also switches the vanilla-extract
 * theme class so the correct token values take effect.
 *
 * Sets BOTH data-theme (styling) and data-layout (structure) independently —
 * changing one must not affect the other (D17).
 *
 * This is the single applier the control panel calls; it is also
 * mirrored as a standalone inline script (no imports) in BaseLayout for
 * pre-paint FOUC prevention.
 *
 * Only call in browser context.
 */
export function applyTheme(state: ThemeState): void {
  const root = document.documentElement;

  // Switch VE theme class if registry is populated
  const allKnown = Object.values(_themeClasses);
  if (allKnown.length > 0) {
    allKnown.forEach((cls) => {
      root.classList.remove(cls);
    });
    const targetClass = _themeClasses[state.theme];
    if (targetClass) root.classList.add(targetClass);
  }

  // D17: theme axis → data-theme; layout axis → data-layout (independent)
  root.setAttribute('data-theme', state.theme);
  root.setAttribute('data-layout', state.layout);
  root.setAttribute('data-mode', state.mode);
  root.setAttribute('data-density', state.density);

  // Accent hue override — used by presets that expose --accent-hue
  root.style.setProperty('--accent-hue', String(state.accentHue));

  // Motion gate — complement to prefers-reduced-motion
  root.setAttribute('data-motion', state.motion ? 'ok' : 'reduce');
}

// ─── Design shortcut ─────────────────────────────────────────────────────────

/**
 * applyDesign — snaps BOTH theme + layout to a matched design in one call.
 * This is the "whole design shortcut" (D17 control panel: A/B/C row).
 * Also resets accent hue to the design's default.
 *
 * Does NOT persist to the store — callers are responsible for writing keys.
 * (ControlPanel calls themeStore.setKey for each field then calls applyTheme.)
 */
export const DESIGN_DEFAULTS: Record<Theme, { accentHue: number }> = {
  'control-plane': { accentHue: 205 },
  editorial: { accentHue: 35 },
  kinetic: { accentHue: 285 },
  'calm-console': { accentHue: 265 },
};
