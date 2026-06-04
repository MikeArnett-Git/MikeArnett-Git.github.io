/**
 * Preset C — Kinetic Minimal
 * Dark near-monochrome · Fraunces expressive serif display · Inter body ·
 * single violet accent · motion-led · minimal chrome.
 * Reference: reference/design-explorations/direction-C-kinetic-minimal.html
 */

import { createTheme } from '@vanilla-extract/css';
import { contract } from '../contract.css';

export const kineticTheme = createTheme(contract, {
  color: {
    // Near-black with faint violet undertone
    bg: 'oklch(14% 0 0)',
    surface: 'oklch(17.5% 0.004 285)',
    surfaceRaised: 'oklch(21% 0.006 285)',
    surfaceInset: 'oklch(13% 0.003 285)',
    ink: 'oklch(95% 0 0)',
    inkDim: 'oklch(78% 0.004 285)',
    inkFaint: 'oklch(46% 0.006 285)',
    // Sole accent: violet by default (hue 285). Hue is user-adjustable via
    // --accent-hue (default 285). L and C stay fixed for the kinetic identity.
    accent: 'oklch(70% 0.19 var(--accent-hue, 285))',
    accentBright: 'oklch(78% 0.17 var(--accent-hue, 285))',
    accentDeep: 'oklch(55% 0.14 var(--accent-hue, 285))',
    live: 'oklch(70% 0.19 var(--accent-hue, 285))',
    // overlay: modal scrims / palette backdrop (kinetic: near-black, neutral)
    overlay: 'oklch(8% 0 0 / 0.60)',
    // shadow: box-shadow colour for cards/sidebars (kinetic: near-black, neutral)
    shadow: 'oklch(6% 0 0 / 0.40)',
    line: 'oklch(28% 0.005 285)',
    hairline: 'oklch(28% 0.005 285)',
  },
  font: {
    display: "'Fraunces', 'Times New Roman', serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  type: {
    // Large, expressive — kinetic headline scale
    display: 'clamp(3.2rem, 12.5vw, 12rem)',
    h1: 'clamp(3.2rem, 12.5vw, 12rem)',
    h2: 'clamp(2.1rem, 1.4rem + 3vw, 4.2rem)',
    h3: 'clamp(1.55rem, 1.2rem + 1.8vw, 2.9rem)',
    body: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
    small: '0.82rem',
    eyebrow: '0.76rem',
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
    // Kinetic: minimal, near-zero radii
    sm: '2px',
    md: '2px',
    lg: '4px',
  },
  motion: {
    durFast: '220ms',
    durBase: '600ms',
    durSlow: '1100ms',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
});
