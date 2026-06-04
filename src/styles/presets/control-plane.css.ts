/** Preset B — Control-Plane (default): dark navy + cyan accent · Sora/Inter/JetBrains Mono · D5/D17. */
import { createTheme } from '@vanilla-extract/css';
import { contract } from '../contract.css';

export const controlPlaneTheme = createTheme(contract, {
  color: {
    bg: 'oklch(16% 0.02 260)',
    surface: 'oklch(20% 0.024 260)',
    surfaceRaised: 'oklch(20% 0.024 260)',
    surfaceInset: 'oklch(13% 0.018 262)',
    ink: 'oklch(92% 0.02 260)',
    inkDim: 'oklch(74% 0.022 258)',
    inkFaint: 'oklch(58% 0.022 258)',
    // accent hue is user-adjustable via --accent-hue (default 205 = cyan).
    // L and C stay fixed per preset; only the hue is parameterised.
    accent: 'oklch(72% 0.16 var(--accent-hue, 205))',
    accentBright: 'oklch(82% 0.15 var(--accent-hue, 205))',
    accentDeep: 'oklch(46% 0.10 var(--accent-hue, 205))',
    live: 'oklch(82% 0.18 135)',
    // overlay: modal scrims / palette backdrop (control-plane: dark navy-tinted)
    overlay: 'oklch(12% 0.01 270 / 0.58)',
    // shadow: box-shadow colour for cards/sidebars (control-plane: dark navy)
    shadow: 'oklch(10% 0.01 270 / 0.35)',
    line: 'oklch(34% 0.02 258)',
    hairline: 'oklch(27% 0.018 260)',
  },
  font: {
    display: "'Sora', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  type: {
    display: 'clamp(2.6rem, 8vw, 5.4rem)',
    h1: 'clamp(2.6rem, 8vw, 5.4rem)',
    h2: 'clamp(1.5rem, 3.4vw, 2.1rem)',
    h3: 'clamp(1.1rem, 2vw, 1.3rem)',
    body: 'clamp(1rem, 1.5vw, 1.12rem)',
    small: '0.86rem',
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
    sm: '4px',
    md: '6px',
    lg: '10px',
  },
  motion: {
    durFast: '140ms',
    durBase: '220ms',
    durSlow: '600ms',
    easing: 'cubic-bezier(.22, .61, .36, 1)',
  },
});
