/** Preset D — Calm Console: dark indigo + soft indigo accent · rounded radii · Sora/Inter/JetBrains Mono · D5/D17. */
import { createTheme } from '@vanilla-extract/css';
import { contract } from '../contract.css';

export const calmConsoleTheme = createTheme(contract, {
  color: {
    bg: 'oklch(18% 0.012 270)',
    surface: 'oklch(22% 0.014 270)',
    surfaceRaised: 'oklch(25% 0.016 270)',
    surfaceInset: 'oklch(19.5% 0.013 270)',
    ink: 'oklch(94% 0.01 270)',
    inkDim: 'oklch(78% 0.012 270)',
    inkFaint: 'oklch(50% 0.012 270)',
    // accent hue is user-adjustable via --accent-hue (default 265 = soft indigo).
    // L and C stay fixed per preset; only the hue is parameterised.
    accent: 'oklch(70% 0.15 var(--accent-hue, 265))',
    accentBright: 'oklch(76% 0.155 var(--accent-hue, 265))',
    accentDeep: 'oklch(58% 0.16 var(--accent-hue, 265))',
    live: 'oklch(74% 0.13 160)',
    // overlay: modal scrims / palette backdrop (calm-console: deep indigo-tinted)
    overlay: 'oklch(11% 0.01 270 / 0.58)',
    // shadow: box-shadow colour for cards/sidebars (calm-console: deep indigo)
    shadow: 'oklch(9% 0.01 270 / 0.38)',
    line: 'oklch(30% 0.014 270)',
    hairline: 'oklch(27% 0.012 270)',
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
    sm: '9px',
    md: '12px',
    lg: '18px',
  },
  motion: {
    durFast: '160ms',
    durBase: '240ms',
    durSlow: '600ms',
    easing: 'cubic-bezier(.22, .61, .36, 1)',
  },
});
