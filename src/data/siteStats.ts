/**
 * Site stats derived from live data, so published numbers can't drift from what
 * they describe. The two axes are the single source of truth (src/lib/theme.ts):
 * add a theme or layout and the design matrix below updates automatically.
 *
 * Only genuinely build-derivable facts live here. Externally-measured facts
 * (gzipped JS budget, type-error count, test count) stay as honest constants in
 * caseStudies.ts, clearly labelled — they can't be self-measured at build time.
 */
import { LAYOUT_IDS, THEME_IDS } from '../lib/theme';

export const themeCount = THEME_IDS.length;
export const layoutCount = LAYOUT_IDS.length;

/** Switchable design combinations = themes × layouts (e.g. "4 × 4"). */
export const designMatrix = `${themeCount} × ${layoutCount}`;

/** Total theme⊥layout combinations (themes × layouts). */
export const designCombos = themeCount * layoutCount;
