/**
 * Preset A — Editorial Brutalist
 * Light warm paper · Space Grotesk display · Newsreader serif body ·
 * JetBrains Mono labels · hairline rules · single vermilion accent.
 * Reference: reference/design-explorations/direction-A-editorial-brutalist.html
 */

import { createTheme } from '@vanilla-extract/css';
import { contract } from '../contract.css';

export const editorialTheme = createTheme(contract, {
  color: {
    // Warm off-white paper ground, near-black ink
    bg: 'oklch(97% 0.012 85)',
    surface: 'oklch(95% 0.014 84)',
    surfaceRaised: 'oklch(93% 0.016 84)',
    surfaceInset: 'oklch(95% 0.014 84)',
    // Card hover bg: one step brighter than surface on a light theme.
    surfaceHover: 'oklch(97% 0.012 85)',
    // Near-transparent dark overlay on light paper bg — subtle hover tint.
    surfaceSubtle: 'oklch(0% 0 0 / 0.04)',
    ink: 'oklch(22% 0.02 70)',
    inkDim: 'oklch(40% 0.018 70)',
    inkFaint: 'oklch(56% 0.016 72)',
    // Sole accent: vermilion by default (hue 35). Hue is user-adjustable via
    // --accent-hue (default 35). L and C stay fixed for the editorial identity.
    accent: 'oklch(62% 0.20 var(--accent-hue, 35))',
    accentBright: 'oklch(70% 0.20 var(--accent-hue, 35))',
    accentDeep: 'oklch(52% 0.19 var(--accent-hue, 35))',
    // Low-opacity accent fill on light bg — chip/button hover backgrounds.
    accentSubtle: 'oklch(62% 0.20 35 / 0.10)',
    // Low-opacity accent border — chipActive border.
    accentSubtleBorder: 'oklch(62% 0.20 35 / 0.30)',
    // Accent glow ring — kinetic brandGlyph halo (muted on light bg).
    accentHalo: 'oklch(62% 0.20 35 / 0.14)',
    // Accent-hued bar fill — scopeviz bars on editorial.
    scopeFill: 'oklch(62% 0.20 35 / 0.18)',
    // Text on accent: near-white works on vermilion.
    onAccent: 'oklch(97% 0.012 85)',
    // Frosted nav backdrop: warm paper with high opacity.
    navBg: 'oklch(97% 0.012 85 / 0.86)',
    // Active dashboard nav-item highlight — accent at low alpha, tracks live --accent-hue.
    navActiveBg: 'oklch(62% 0.20 var(--accent-hue, 35) / 0.14)',
    // Hover border: use editorial's `line` value (warm grey).
    borderHover: 'oklch(70% 0.016 72)',
    // Featured card: warm paper surface (no gradient on editorial).
    featuredBg: 'oklch(95% 0.014 84)',
    // Semantic chip colours: live/shipped (editorial maps to accent, no live-green).
    tagLiveBg: 'oklch(62% 0.20 35 / 0.10)',
    tagLiveBorder: 'oklch(62% 0.20 35 / 0.30)',
    // No live-green concept in editorial — use accent
    live: 'oklch(62% 0.20 var(--accent-hue, 35))',
    // overlay: modal scrims / palette backdrop (editorial: warm paper-tone, light)
    overlay: 'oklch(30% 0.012 75 / 0.45)',
    // shadow: box-shadow colour for cards/sidebars (editorial: warm dark)
    shadow: 'oklch(25% 0.010 75 / 0.18)',
    line: 'oklch(70% 0.016 72)',
    hairline: 'oklch(82% 0.014 75)',
  },
  font: {
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "'Newsreader', Georgia, 'Times New Roman', serif",
    mono: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace",
  },
  type: {
    // Oversized editorial scale
    display: 'clamp(3rem, 11vw, 8.5rem)',
    h1: 'clamp(3rem, 11vw, 8.5rem)',
    h2: 'clamp(1.5rem, 1rem + 2.4vw, 2.6rem)',
    h3: 'clamp(1.3rem, 1rem + 1.4vw, 1.9rem)',
    body: 'clamp(1rem, 0.96rem + 0.2vw, 1.125rem)',
    small: '0.82rem',
    eyebrow: '0.72rem',
  },
  space: {
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '6': '1.5rem',
    '8': '2rem',
    '12': '3rem',
    '16': '4rem',
    '24': '6rem',
  },
  radius: {
    // Editorial: sharp, no rounded corners
    sm: '0px',
    md: '0px',
    lg: '0px',
  },
  motion: {
    durFast: '180ms',
    durBase: '220ms',
    durSlow: '600ms',
    easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  },
});
