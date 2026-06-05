/**
 * ControlPanel styles — vanilla-extract.
 * Uses neutral contract tokens so the panel reads legibly across all presets.
 * D14: no preset-specific forks here; token system does the work.
 *
 * VE rule: @media queries must be top-level keys (not inside selectors).
 */

import { keyframes, style } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';

// Panel open animation
const slideUp = keyframes({
  from: { opacity: 0, transform: 'translateY(12px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

// ── Toggle button ────────────────────────────────────────────────────────────

export const toggleBtn = style({
  position: 'fixed',
  bottom: '1.5rem',
  right: '1.5rem',
  zIndex: 9999,
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: `1.5px solid ${contract.color.line}`,
  background: contract.color.surface,
  color: contract.color.ink,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  // Theme-agnostic neutral-black elevation for the floating overlay (intentional literal, not a theme token).
  boxShadow: '0 4px 24px oklch(0% 0 0 / 0.28)',
  transition: `background ${contract.motion.durFast} ${contract.motion.easing},
               border-color ${contract.motion.durFast} ${contract.motion.easing},
               transform ${contract.motion.durFast} ${contract.motion.easing}`,
  selectors: {
    '&:hover': {
      background: contract.color.surfaceRaised,
      borderColor: contract.color.accent,
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '3px',
    },
    '&[data-open="true"]': {
      background: contract.color.surfaceRaised,
      borderColor: contract.color.accent,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// ── Panel container ──────────────────────────────────────────────────────────

export const panel = style({
  position: 'fixed',
  bottom: '4.5rem',
  right: '1.5rem',
  zIndex: 9998,
  width: 'clamp(280px, 90vw, 340px)',
  background: contract.color.surface,
  border: `1.5px solid ${contract.color.line}`,
  borderRadius: contract.radius.lg,
  // Theme-agnostic neutral-black elevation for the floating panel (intentional literal, not a theme token).
  boxShadow: '0 8px 40px oklch(0% 0 0 / 0.36)',
  padding: `${contract.space['6']} ${contract.space['6']} ${contract.space['4']}`,
  display: 'flex',
  flexDirection: 'column',
  gap: contract.space['4'],
  animationName: slideUp,
  animationDuration: contract.motion.durBase,
  animationTimingFunction: contract.motion.easing,
  animationFillMode: 'both',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '1ms',
    },
    '(max-width: 400px)': {
      right: '0.75rem',
      left: '0.75rem',
      width: 'auto',
      bottom: '4rem',
    },
  },
});

// ── Panel header ─────────────────────────────────────────────────────────────

export const panelHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: contract.space['2'],
});

export const panelTitle = style({
  fontFamily: contract.font.mono,
  fontSize: contract.type.eyebrow,
  fontWeight: '600',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: contract.color.inkDim,
});

export const closeBtn = style({
  width: '28px',
  height: '28px',
  border: `1px solid ${contract.color.line}`,
  borderRadius: contract.radius.sm,
  background: 'transparent',
  color: contract.color.inkDim,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.85rem',
  transition: `color ${contract.motion.durFast}, border-color ${contract.motion.durFast}`,
  selectors: {
    '&:hover': {
      color: contract.color.ink,
      borderColor: contract.color.accent,
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// ── Section separator ────────────────────────────────────────────────────────

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: contract.space['2'],
});

export const sectionLabel = style({
  fontFamily: contract.font.mono,
  fontSize: '0.65rem',
  fontWeight: '600',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: contract.color.inkFaint,
});

export const divider = style({
  height: '1px',
  background: contract.color.hairline,
  margin: `${contract.space['1']} 0`,
  border: 'none', // rendered as <hr>; reset the default rule border
});

// ── Preset buttons (headline control) ────────────────────────────────────────

export const presetRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: contract.space['2'],
  // rendered as <fieldset> (groups the preset buttons) — reset its native chrome
  border: 'none',
  margin: 0,
  padding: 0,
  minInlineSize: 0,
});

export const presetBtn = style({
  padding: `${contract.space['2']} ${contract.space['2']}`,
  border: `1.5px solid ${contract.color.line}`,
  borderRadius: contract.radius.md,
  background: contract.color.surfaceInset,
  color: contract.color.inkDim,
  fontFamily: contract.font.mono,
  fontSize: '0.7rem',
  fontWeight: '500',
  letterSpacing: '0.04em',
  cursor: 'pointer',
  textAlign: 'center',
  minHeight: '44px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3px',
  transition: `background ${contract.motion.durFast} ${contract.motion.easing},
               border-color ${contract.motion.durFast} ${contract.motion.easing},
               color ${contract.motion.durFast} ${contract.motion.easing}`,
  selectors: {
    '&:hover': {
      background: contract.color.surface,
      color: contract.color.ink,
      borderColor: contract.color.accent,
    },
    '&[aria-pressed="true"]': {
      background: contract.color.surface,
      color: contract.color.accent,
      borderColor: contract.color.accent,
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const presetDot = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  flexShrink: 0,
});

// ── Accent hue ────────────────────────────────────────────────────────────────

export const accentRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: contract.space['2'],
});

export const accentSliderRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: contract.space['2'],
});

export const accentSlider = style({
  flex: 1,
  height: '4px',
  appearance: 'none',
  WebkitAppearance: 'none',
  borderRadius: '2px',
  // Functional full-spectrum hue wheel for the accent-hue picker — every hue 0–360
  // by design, so these are literal (not theme tokens).
  background:
    'linear-gradient(to right, oklch(65% 0.18 0), oklch(65% 0.18 60), oklch(65% 0.18 120), oklch(65% 0.18 180), oklch(65% 0.18 240), oklch(65% 0.18 300), oklch(65% 0.18 360))',
  cursor: 'pointer',
  outline: 'none',
  selectors: {
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: contract.color.ink,
      border: `2px solid ${contract.color.surface}`,
      boxShadow: '0 0 0 1.5px currentColor',
      cursor: 'pointer',
    },
    '&::-moz-range-thumb': {
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: contract.color.ink,
      border: `2px solid ${contract.color.surface}`,
      cursor: 'pointer',
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '4px',
      borderRadius: '4px',
    },
  },
});

export const accentPreview = style({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: `1.5px solid ${contract.color.line}`,
  flexShrink: 0,
});

export const resetBtn = style({
  fontFamily: contract.font.mono,
  fontSize: '0.65rem',
  fontWeight: '500',
  letterSpacing: '0.06em',
  color: contract.color.inkFaint,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  alignSelf: 'flex-start',
  textDecoration: 'underline',
  textDecorationStyle: 'dotted',
  transition: `color ${contract.motion.durFast}`,
  selectors: {
    '&:hover': {
      color: contract.color.accent,
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
      borderRadius: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// ── Toggle rows (motion / density) ───────────────────────────────────────────

export const toggleRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '44px',
});

export const toggleLabel = style({
  fontFamily: contract.font.body,
  fontSize: contract.type.small,
  color: contract.color.inkDim,
});

export const toggleGroup = style({
  display: 'flex',
  gap: contract.space['1'],
  // rendered as <fieldset> (groups the toggle buttons) — reset its native chrome
  border: 'none',
  margin: 0,
  padding: 0,
  minInlineSize: 0,
});

export const toggleOptionBtn = style({
  padding: `${contract.space['1']} ${contract.space['3']}`,
  border: `1px solid ${contract.color.line}`,
  borderRadius: contract.radius.sm,
  background: contract.color.surfaceInset,
  color: contract.color.inkFaint,
  fontFamily: contract.font.mono,
  fontSize: '0.68rem',
  fontWeight: '500',
  letterSpacing: '0.04em',
  cursor: 'pointer',
  minHeight: '32px',
  transition: `background ${contract.motion.durFast}, border-color ${contract.motion.durFast}, color ${contract.motion.durFast}`,
  selectors: {
    '&[aria-pressed="true"]': {
      background: contract.color.surface,
      color: contract.color.accent,
      borderColor: contract.color.accent,
    },
    '&:hover:not([aria-pressed="true"])': {
      color: contract.color.ink,
      borderColor: contract.color.inkFaint,
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});
