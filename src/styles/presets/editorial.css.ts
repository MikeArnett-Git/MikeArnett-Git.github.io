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
    ink: 'oklch(22% 0.02 70)',
    inkDim: 'oklch(40% 0.018 70)',
    inkFaint: 'oklch(56% 0.016 72)',
    // Sole accent: vermilion by default (hue 35). Hue is user-adjustable via
    // --accent-hue (default 35). L and C stay fixed for the editorial identity.
    accent: 'oklch(62% 0.20 var(--accent-hue, 35))',
    accentBright: 'oklch(70% 0.20 var(--accent-hue, 35))',
    accentDeep: 'oklch(52% 0.19 var(--accent-hue, 35))',
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
