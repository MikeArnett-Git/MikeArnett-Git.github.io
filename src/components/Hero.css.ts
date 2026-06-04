/**
 * Hero feature component styles.
 * Button styles (btn, btnPrimary, btnGhost, btnArrow) are from primitives/Button.css.ts.
 * [data-theme] selectors at the bottom adapt typography + chrome per design.
 */

import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';
// Import shared wrap for use in globalStyle selectors; re-export for backward-compat with index.astro.
import { wrap } from '../styles/layout.css';
export { wrap };

const rise = keyframes({
  from: { opacity: 0, transform: 'translateY(14px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const blink = keyframes({
  '50%': { opacity: 0.15 },
});

const pulse = keyframes({
  '0%':   { boxShadow: `0 0 0 0   ${contract.color.live}` },
  '70%':  { boxShadow: '0 0 0 7px transparent' },
  '100%': { boxShadow: '0 0 0 0   transparent' },
});

export const hero = style({
  paddingTop: 'clamp(3rem, 8vw, 6rem)',
  paddingBottom: 'clamp(2.5rem, 6vw, 4.5rem)',
});

export const heroStatus = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontFamily: contract.font.mono,
  fontSize: '0.74rem',
  letterSpacing: '0.08em',
  color: contract.color.inkDim,
  background: contract.color.surface,
  border: `1px solid ${contract.color.line}`,
  borderRadius: '100px',
  padding: '0.32rem 0.85rem 0.32rem 0.6rem',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${rise} 700ms ${contract.motion.easing} both`,
    },
  },
});

export const liveDot = style({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: contract.color.live,
  flex: 'none',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${pulse} 2.6s ${contract.motion.easing} infinite`,
    },
  },
});

export const h1 = style({
  fontFamily: contract.font.display,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  lineHeight: 1.02,
  fontSize: contract.type.h1,
  margin: '1.4rem 0 0.4rem',
  maxWidth: '16ch',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${rise} 700ms ${contract.motion.easing} 60ms both`,
    },
  },
});

export const cursor = style({
  display: 'inline-block',
  width: '0.07em',
  height: '0.82em',
  background: contract.color.accent,
  marginLeft: '0.12em',
  verticalAlign: '-0.04em',
  borderRadius: '1px',
  transform: 'translateY(0.05em)',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${blink} 1.15s steps(2, jump-none) infinite`,
    },
  },
});

export const positioning = style({
  fontFamily: contract.font.display,
  fontSize: 'clamp(1.05rem, 2.6vw, 1.45rem)',
  fontWeight: 500,
  color: contract.color.accentBright,
  letterSpacing: '-0.005em',
  margin: '0 0 1.4rem',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${rise} 700ms ${contract.motion.easing} 120ms both`,
    },
  },
});

export const positioningPin = style({
  color: contract.color.inkFaint,
  fontFamily: contract.font.mono,
  fontSize: '0.78rem',
  fontWeight: 400,
  letterSpacing: 0,
  display: 'block',
  marginTop: '0.5rem',
});

export const summary = style({
  maxWidth: '64ch',
  color: contract.color.inkDim,
  fontSize: contract.type.body,
  lineHeight: 1.7,
  margin: '0 0 2.2rem',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${rise} 700ms ${contract.motion.easing} 180ms both`,
    },
  },
});

export const summaryStrong = style({
  color: contract.color.ink,
  fontWeight: 500,
});

export const heroCta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.85rem',
  alignItems: 'center',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${rise} 700ms ${contract.motion.easing} 240ms both`,
    },
  },
});

// ── THEME axis: editorial — left-border summary, no status chip ────────────
globalStyle(`[data-theme="editorial"] .${summary}`, {
  borderLeft: `2px solid ${contract.color.accent}`,
  paddingLeft: '1.25rem',
  fontFamily: contract.font.body,
  lineHeight: '1.55',
});

globalStyle(`[data-theme="editorial"] .${heroStatus}`, {
  display: 'none',
});

// ── THEME axis: kinetic — no cursor blink, no status chip, left-border summary
globalStyle(`[data-theme="kinetic"] .${cursor}`, {
  display: 'none',
});

globalStyle(`[data-theme="kinetic"] .${heroStatus}`, {
  display: 'none',
});

globalStyle(`[data-theme="kinetic"] .${summary}`, {
  borderLeft: `2px solid oklch(70% 0.19 285 / 0.34)`,
  paddingLeft: 'clamp(1.1rem, 2.2vw, 1.8rem)',
});

// ── LAYOUT axis: editorial — asymmetric 2-col hero (7fr lede / 4fr aside) ──
// Structure: hero becomes a 2-column grid; aside column appears beside lede.
// heroStatus chip re-hidden by theme but the aside div is structurally visible.
globalStyle(`[data-layout="editorial"] .${hero}`, {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: 'clamp(2rem, 4vw, 3.5rem)',
  '@media': {
    '(min-width: 900px)': {
      gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 4fr)',
      alignItems: 'end',
    },
  },
});

// In editorial layout the wrap (lede column) needs no extra wrappermax so it
// flows as a grid cell; override the default max-width / margin constraints.
globalStyle(`[data-layout="editorial"] .${wrap}`, {
  maxWidth: 'none',
  marginInline: '0',
  paddingInline: '0',
});

// The hero shell itself gets the outer padding in editorial layout.
globalStyle(`[data-layout="editorial"] .${hero}`, {
  maxWidth: '1320px',
  marginInline: 'auto',
  paddingInline: 'clamp(1.25rem, 5vw, 6rem)',
});

// hero-aside: hidden by default, becomes a flex column in editorial layout.
// In non-editorial layouts display:none keeps it inert.
globalStyle(`:not([data-layout="editorial"]) .hero-aside`, {
  display: 'none',
});

globalStyle(`[data-layout="editorial"] .hero-aside`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  borderTop: `1px solid ${contract.color.line}`,
  paddingTop: '1.4rem',
  '@media': {
    '(min-width: 900px)': {
      borderTop: 'none',
      paddingTop: '0',
      paddingBottom: '0.6rem',
    },
  },
});

globalStyle(`[data-layout="editorial"] .hero-aside .locale`, {
  fontFamily: contract.font.mono,
  fontSize: '0.82rem',
  lineHeight: '1.7',
  color: contract.color.inkDim,
});

globalStyle(`[data-layout="editorial"] .hero-aside .locale-label`, {
  color: contract.color.inkFaint,
  display: 'block',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  marginBottom: '0.4rem',
});

// h1 in editorial layout: oversized tight headline
globalStyle(`[data-layout="editorial"] .${h1}`, {
  fontSize: 'clamp(3rem, 11vw, 8.5rem)',
  lineHeight: '0.92',
  letterSpacing: '-0.04em',
  maxWidth: 'none',
});

// Summary in editorial layout: constrained measure
globalStyle(`[data-layout="editorial"] .${summary}`, {
  maxWidth: '62ch',
});

// ── LAYOUT axis: kinetic — large centred headline, generous vertical space ──
// Structure: hero centred via flex, generous padding, headline unconstrained.
globalStyle(`[data-layout="kinetic"] .${hero}`, {
  minHeight: 'min(92svh, 60rem)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingTop: 'clamp(4rem, 11vh, 8rem)',
  paddingBottom: 'clamp(4rem, 9vh, 7rem)',
});

// kinetic: hero-aside not used (minimal chrome — stays hidden)
globalStyle(`[data-layout="kinetic"] .hero-aside`, {
  display: 'none',
});

// h1 in kinetic layout: very large, optical sizing
globalStyle(`[data-layout="kinetic"] .${h1}`, {
  fontSize: 'clamp(3.2rem, 12.5vw, 12rem)',
  lineHeight: '0.94',
  letterSpacing: '-0.028em',
  maxWidth: '16ch',
  margin: '0 0 clamp(2.2rem, 5vh, 3.4rem)',
});

// Kinetic wrap: generous side padding
globalStyle(`[data-layout="kinetic"] .${wrap}`, {
  paddingInline: 'clamp(1.25rem, 5vw, 7rem)',
});

// positioning line: becomes an eyebrow style in kinetic layout
globalStyle(`[data-layout="kinetic"] .${positioning}`, {
  fontSize: 'clamp(0.78rem, 0.7rem + 0.4vw, 0.95rem)',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  marginBottom: 'clamp(1.6rem, 4vh, 2.8rem)',
});

// heroCta in kinetic layout: generous top margin
globalStyle(`[data-layout="kinetic"] .${heroCta}`, {
  marginTop: 'clamp(2.4rem, 5.5vh, 3.4rem)',
});
