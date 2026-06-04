/**
 * Icon registry — inner SVG path markup for icons used 2+ times (D14).
 * Each value is the inner content of a 24×24 viewBox SVG (paths/circles/rects).
 * Render via <Icon name="…" /> (Icon.astro) which wraps in a consistent <svg>.
 * Icons in src/data/nav.ts are kept as-is (already deduplicated via that module).
 * Do NOT import this from React/TSX — use inline SVG there (no Astro components in TSX).
 */
export const icons = {
  /** Right-pointing arrow: "→" used for CTAs and view-all links */
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',

  /** Layers/stack icon used in focus items and project list */
  layers: '<path d="M3 9 12 4l9 5-9 5-9-5Z"/><path d="m3 14 9 5 9-5"/>',

  /** Search / magnifying glass used in topbar and command palette */
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
} as const;

export type IconName = keyof typeof icons;
