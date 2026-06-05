/**
 * Nav feature component styles.
 * CTA button uses primitives/Button.css.ts (btnNavCta).
 * [data-theme="editorial"] / [data-theme="kinetic"] selectors adapt the nav
 * to each design without forking components.
 */

import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';

export const topbar = style({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: contract.color.navBg,
  backdropFilter: 'blur(12px) saturate(1.2)',
  WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
  borderBottom: `1px solid ${contract.color.hairline}`,
});

export const cmdbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: contract.space['4'],
  height: '60px',
  maxWidth: '1180px',
  marginInline: 'auto',
  paddingInline: 'clamp(1.25rem, 4vw, 4rem)',
  position: 'relative',
  zIndex: 1,
  '@media': {
    '(max-width: 760px)': {
      height: '56px',
    },
  },
});

// Editorial LAYOUT: the nav shares the wider 1320px editorial shell + matching
// gutter so the brand/links align to the same left edge as the hero + sections
// (the editorial mockup frames everything in one shell — avoids a nav/content offset).
globalStyle(`[data-layout="editorial"] .${cmdbar}`, {
  maxWidth: '1320px',
  paddingInline: 'clamp(1.25rem, 5vw, 6rem)',
});

export const brandmark = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontFamily: contract.font.mono,
  fontSize: '0.86rem',
  fontWeight: 600,
  letterSpacing: '0.02em',
  whiteSpace: 'nowrap',
});

export const brandGlyph = style({
  width: '22px',
  height: '22px',
  border: `1.5px solid ${contract.color.accent}`,
  borderRadius: '5px',
  display: 'grid',
  placeItems: 'center',
  color: contract.color.accent,
  position: 'relative',
  flex: 'none',
  '::before': {
    content: '""',
    width: '7px',
    height: '7px',
    background: contract.color.accent,
    borderRadius: '1px',
    boxShadow: `0 0 8px ${contract.color.accent}`,
  },
});

export const brandSep = style({
  color: contract.color.inkFaint,
  fontWeight: 400,
});

export const brandRole = style({
  color: contract.color.inkDim,
  fontWeight: 400,
  '@media': {
    '(max-width: 760px)': {
      display: 'none',
    },
  },
});

export const cmdspacer = style({
  flex: 1,
});

export const primaryNav = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.15rem',
  fontFamily: contract.font.mono,
  fontSize: '0.8rem',
  '@media': {
    '(max-width: 760px)': {
      display: 'none',
    },
  },
});

export const navLink = style({
  color: contract.color.inkDim,
  padding: '0.4rem 0.7rem',
  borderRadius: contract.radius.sm,
  transition: `color ${contract.motion.durBase} ${contract.motion.easing}, background ${contract.motion.durBase} ${contract.motion.easing}`,
  position: 'relative',
  '::before': {
    content: '"/"',
    color: contract.color.inkFaint,
    marginRight: '1px',
    opacity: 0.7,
  },
  ':hover': {
    color: contract.color.ink,
    background: contract.color.surfaceSubtle,
  },
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
    },
  },
});

// ── Editorial: warm paper header, hairline border, serif-friendly spacing ─
// topbar gets the warm paper bg; nav links lose the "/" prefix (editorial uses
// numerical indices instead — rendered by Nav.astro's markup).
globalStyle(`[data-theme="editorial"] .${topbar}`, {
  background: contract.color.navBg,
  backdropFilter: 'saturate(140%) blur(8px)',
  WebkitBackdropFilter: 'saturate(140%) blur(8px)',
});

globalStyle(`[data-theme="editorial"] .${navLink}::before`, {
  content: 'none',
});

// ── Kinetic: nearly transparent header, minimal chrome, no "/" prefix ─────
globalStyle(`[data-theme="kinetic"] .${topbar}`, {
  background: contract.color.navBg,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
});

globalStyle(`[data-theme="kinetic"] .${navLink}::before`, {
  content: 'none',
});

// Kinetic brand glyph: simple dot instead of the square+glyph
globalStyle(`[data-theme="kinetic"] .${brandGlyph}`, {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: contract.color.accent,
  border: 'none',
  boxShadow: `0 0 0 4px ${contract.color.accentHalo}`,
});

globalStyle(`[data-theme="kinetic"] .${brandGlyph}::before`, {
  content: 'none',
});
