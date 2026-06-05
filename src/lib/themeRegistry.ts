/**
 * Theme class registry — single source of truth for the theme-name →
 * vanilla-extract token-class map (D17 / D14).
 *
 * Both layouts (BaseLayout, AppShellLayout) import from here so that adding
 * a theme only requires one edit instead of two silent, drift-prone ones.
 */

import { calmConsoleTheme } from '../styles/presets/calm-console.css';
import { controlPlaneTheme } from '../styles/presets/control-plane.css';
import { editorialTheme } from '../styles/presets/editorial.css';
import { kineticTheme } from '../styles/presets/kinetic.css';
import { THEME_DEFAULTS } from './theme';

export type ThemeName = 'control-plane' | 'editorial' | 'kinetic' | 'calm-console';

/**
 * Maps every theme name to its vanilla-extract token class.
 * Typed as Record<ThemeName, string> so all four keys are provably present —
 * indexing by ThemeName never yields undefined (noUncheckedIndexedAccess safe).
 */
export const themeClasses: Record<ThemeName, string> = {
  'control-plane': controlPlaneTheme,
  editorial: editorialTheme,
  kinetic: kineticTheme,
  'calm-console': calmConsoleTheme,
};

/**
 * Returns the VE token class for `theme`, falling back to the configured
 * default theme's class (never hard-codes a specific fallback name).
 */
export function defaultThemeClass(theme: string): string {
  // Cast validated: themeClasses covers all ThemeName keys; unknown strings
  // fall back to THEME_DEFAULTS.theme which is always a valid ThemeName.
  const cls = themeClasses[theme as ThemeName] ?? themeClasses[THEME_DEFAULTS.theme];
  return cls;
}
