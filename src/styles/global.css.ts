/** Global base styles — resets, body typography, grid backdrop, theme-axis overrides (D5). */
import { globalStyle } from '@vanilla-extract/css';
import { contract } from './contract.css';

// Box-sizing reset
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  scrollBehavior: 'smooth',
});

// Reduced motion: disable smooth scroll
globalStyle('html', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
    },
  },
});

globalStyle('body', {
  margin: 0,
  background: contract.color.bg,
  color: contract.color.ink,
  fontFamily: contract.font.body,
  fontSize: '16px',
  lineHeight: '1.6',
  fontWeight: '400',
  WebkitFontSmoothing: 'antialiased',
  textRendering: 'optimizeLegibility',
  overflowX: 'hidden',
});

// Grid backdrop — fixed, ultra-subtle dot + line grid
globalStyle('body::before', {
  content: '""',
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
  backgroundImage: [
    'linear-gradient(to right, oklch(100% 0 0 / 0.028) 1px, transparent 1px)',
    'linear-gradient(to bottom, oklch(100% 0 0 / 0.028) 1px, transparent 1px)',
    'radial-gradient(oklch(72% 0.16 var(--accent-hue, 205) / 0.05) 1px, transparent 1.5px)',
  ].join(', '),
  backgroundSize: '56px 56px, 56px 56px, 56px 56px',
  backgroundPosition: '-1px -1px, -1px -1px, 27px 27px',
  maskImage: 'radial-gradient(ellipse 120% 90% at 50% 0%, black 30%, transparent 90%)',
});

// Faint top-glow seam — powered panel motif
globalStyle('body::after', {
  content: '""',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '320px',
  zIndex: 0,
  pointerEvents: 'none',
  background:
    'radial-gradient(ellipse 80% 100% at 70% -20%, oklch(72% 0.16 var(--accent-hue, 205) / 0.10), transparent 70%)',
});

// ── Editorial theme overrides ─────────────────────────────────────────────
// Light warm paper: no dark grid, no cyan glow. Replace with a subtle margin
// rule and warm vignette instead.
globalStyle('[data-theme="editorial"] body::before', {
  backgroundImage: [
    // Faint left-margin tick rule (editorial convention)
    'linear-gradient(90deg, transparent 0, transparent calc(clamp(1.25rem, 5vw, 6rem) - 1px), oklch(82% 0.014 75 / 0.5) calc(clamp(1.25rem, 5vw, 6rem) - 1px), oklch(82% 0.014 75 / 0.5) clamp(1.25rem, 5vw, 6rem), transparent clamp(1.25rem, 5vw, 6rem))',
  ].join(', '),
  backgroundSize: '100% 100%',
  backgroundPosition: '0 0',
  maskImage: 'none',
  // Suppress on small viewports (margin rule doesn't make sense)
  '@media': {
    '(max-width: 720px)': {
      display: 'none',
    },
  },
});

globalStyle('[data-theme="editorial"] body::after', {
  // Warm paper vignette instead of cyan glow (uses user accent hue)
  background:
    'radial-gradient(ellipse 80% 60% at 30% -20%, oklch(62% 0.20 var(--accent-hue, 35) / 0.04), transparent 70%)',
});

// ── Kinetic theme overrides ───────────────────────────────────────────────
// Dark mono: replace cyan grid dots with faint violet gradient blobs.
globalStyle('[data-theme="kinetic"] body::before', {
  backgroundImage: [
    'radial-gradient(120% 80% at 78% -10%, oklch(70% 0.19 var(--accent-hue, 285) / 0.07), transparent 55%)',
    'radial-gradient(90% 70% at -10% 110%, oklch(60% 0.06 var(--accent-hue, 285) / 0.05), transparent 60%)',
  ].join(', '),
  backgroundSize: '100% 100%, 100% 100%',
  backgroundPosition: '0 0, 0 0',
  maskImage: 'none',
});

globalStyle('[data-theme="kinetic"] body::after', {
  background:
    'radial-gradient(ellipse 80% 100% at 70% -20%, oklch(70% 0.19 var(--accent-hue, 285) / 0.08), transparent 70%)',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

// Focus visibility
globalStyle(':focus-visible', {
  outline: `2px solid ${contract.color.accentBright}`,
  outlineOffset: '3px',
  borderRadius: '2px',
});

// Text selection
globalStyle('::selection', {
  background: `oklch(72% 0.16 var(--accent-hue, 205) / 0.3)`,
  color: contract.color.ink,
});

// ── View-Transition navigation: content appears instantly ──────────────────
// `.reveal` entrance animations (opacity/translate, ~0.6s + staggered delays)
// are a first-load flourish. On client-side View-Transition navigation, SiteHead
// flags the incoming document with `astro-navigated`, so content renders at once
// instead of re-staggering in (~0.6–1s) on every nav. Specificity (0,2,1) wins.
globalStyle('html.astro-navigated .reveal', {
  animation: 'none',
  transition: 'none',
  opacity: 1,
  transform: 'none',
});
