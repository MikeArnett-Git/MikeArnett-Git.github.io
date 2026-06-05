/**
 * Static metadata arrays for the ControlPanel.
 * Pure consts — no state, no side-effects, no imports from Preact/React.
 * Types are imported from the authoritative store module (no redefinition).
 */

import { DESIGN_DEFAULTS, type Layout, THEME_DEFAULTS, type Theme } from '../../lib/theme';

// ── Design shortcut row (A / B / C / D3) ─────────────────────────────────────

export interface DesignMeta {
  /** The theme name for this design shortcut. */
  name: Theme;
  /** Layout to snap to — for D3 this is 'dashboard', rest match theme name. */
  layoutName: Layout;
  /** Single letter/label shortcut. */
  shortcut: 'A' | 'B' | 'C' | 'D3';
  label: string;
}

export const DESIGNS: DesignMeta[] = [
  { name: 'editorial', layoutName: 'editorial', shortcut: 'A', label: 'Editorial' },
  { name: 'control-plane', layoutName: 'control-plane', shortcut: 'B', label: 'Control Plane' },
  { name: 'kinetic', layoutName: 'kinetic', shortcut: 'C', label: 'Kinetic' },
  { name: 'calm-console', layoutName: 'dashboard', shortcut: 'D3', label: 'Calm Console' },
];

// ── Theme axis metadata ───────────────────────────────────────────────────────

export interface ThemeMeta {
  id: Theme;
  label: string;
}

export const THEMES: ThemeMeta[] = [
  { id: 'control-plane', label: 'Control Plane' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'kinetic', label: 'Kinetic' },
  { id: 'calm-console', label: 'Calm Console' },
];

// ── Layout axis metadata ──────────────────────────────────────────────────────

export interface LayoutMeta {
  id: Layout;
  label: string;
}

export const LAYOUTS: LayoutMeta[] = [
  { id: 'control-plane', label: 'Control Plane' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'kinetic', label: 'Kinetic' },
  { id: 'dashboard', label: 'Dashboard' },
];

// ── Derived helpers ───────────────────────────────────────────────────────────

/** Default accent hue for a given theme, falling back to THEME_DEFAULTS. */
export function defaultHueForTheme(theme: Theme): number {
  return DESIGN_DEFAULTS[theme]?.accentHue ?? THEME_DEFAULTS.accentHue;
}

/** Representative swatch colour for a theme — derived from its accent hue. */
export function designDot(theme: Theme): string {
  return `oklch(70% 0.18 ${defaultHueForTheme(theme)})`;
}

/** True when the current route is a dashboard app-shell route (/app or /app/*). */
export function isOnApp(): boolean {
  return (
    typeof window !== 'undefined' &&
    (window.location.pathname === '/app' || window.location.pathname.startsWith('/app/'))
  );
}
