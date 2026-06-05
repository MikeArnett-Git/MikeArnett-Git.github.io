/** Preset B — Control-Plane (default): dark navy + cyan accent · Sora/Inter/JetBrains Mono · D5/D17. */
import { createTheme } from '@vanilla-extract/css';
import { contract } from '../contract.css';

export const controlPlaneTheme = createTheme(contract, {
  color: {
    bg: 'oklch(16% 0.02 260)',
    surface: 'oklch(20% 0.024 260)',
    surfaceRaised: 'oklch(20% 0.024 260)',
    surfaceInset: 'oklch(13% 0.018 262)',
    // One step above surfaceRaised — used for card hover bg.
    surfaceHover: 'oklch(23% 0.026 258)',
    // Near-transparent white overlay — hover bg on nav links / ghost buttons.
    surfaceSubtle: 'oklch(100% 0 0 / 0.04)',
    ink: 'oklch(92% 0.02 260)',
    inkDim: 'oklch(74% 0.022 258)',
    inkFaint: 'oklch(58% 0.022 258)',
    // accent hue is user-adjustable via --accent-hue (default 205 = cyan).
    // L and C stay fixed per preset; only the hue is parameterised.
    accent: 'oklch(72% 0.16 var(--accent-hue, 205))',
    accentBright: 'oklch(82% 0.15 var(--accent-hue, 205))',
    accentDeep: 'oklch(46% 0.10 var(--accent-hue, 205))',
    // Low-opacity accent fill — chip/button hover backgrounds.
    accentSubtle: 'oklch(72% 0.16 205 / 0.12)',
    // Low-opacity accent border — chipActive border.
    accentSubtleBorder: 'oklch(72% 0.16 205 / 0.35)',
    // Accent glow ring — kinetic brandGlyph halo.
    accentHalo: 'oklch(72% 0.16 205 / 0.16)',
    // Accent-hued bar fill — scopeviz bars (22% alpha = visible but not distracting).
    scopeFill: 'oklch(72% 0.16 205 / 0.22)',
    // Text colour for content sitting directly on the accent colour (skip link, primary btn text).
    onAccent: 'oklch(16% 0.02 260)',
    // Frosted nav backdrop.
    navBg: 'oklch(16% 0.02 260 / 0.78)',
    // Active dashboard nav-item highlight — accent at low alpha, tracks live --accent-hue.
    navActiveBg: 'oklch(72% 0.16 var(--accent-hue, 205) / 0.14)',
    // Hover border — card hover, ghost/navCta button borders.
    borderHover: 'oklch(48% 0.04 220)',
    // Featured card gradient background.
    featuredBg: 'linear-gradient(160deg, oklch(20% 0.024 260), oklch(18% 0.03 255))',
    // Semantic chip colours: live/shipped.
    tagLiveBg: 'oklch(60% 0.14 138 / 0.12)',
    tagLiveBorder: 'oklch(60% 0.14 138 / 0.35)',
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
