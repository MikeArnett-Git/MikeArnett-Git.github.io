/**
 * SectionHeading primitive — the idx / h2 / meta row used in every section.
 * [data-theme] selectors adapt typography + rule style (styling axis).
 * [data-layout] selectors adapt DOM arrangement / grid structure (layout axis).
 * D17: theme ⊥ layout — selectors keyed independently.
 */

import { style, globalStyle } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

export const sectionHead = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '1rem',
  marginBottom: '2.2rem',
  borderBottom: `1px solid ${contract.color.hairline}`,
  paddingBottom: '1rem',
});

export const sectionIdx = style({
  fontFamily: contract.font.mono,
  fontSize: '0.78rem',
  color: contract.color.accent,
  fontWeight: 500,
});

export const sectionH2 = style({
  fontFamily: contract.font.display,
  fontWeight: 600,
  fontSize: contract.type.h2,
  letterSpacing: '-0.02em',
  margin: 0,
  color: contract.color.ink,
});

export const sectionMeta = style({
  marginLeft: 'auto',
  fontFamily: contract.font.mono,
  fontSize: contract.type.eyebrow,
  color: contract.color.inkFaint,
  letterSpacing: '0.06em',
  whiteSpace: 'nowrap',
  '@media': {
    '(max-width: 600px)': {
      display: 'none',
    },
  },
});

// ── THEME axis: editorial — bolder hairline rule, section number more prominent ─
// Styling: border weight/colour, padding, margin, font-size/weight, letter-spacing.
globalStyle(`[data-theme="editorial"] .${sectionHead}`, {
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: contract.color.line,
  paddingBottom: '1.6rem',
  marginBottom: 'clamp(2rem, 4vw, 3.2rem)',
});

globalStyle(`[data-theme="editorial"] .${sectionIdx}`, {
  fontSize: '0.82rem',
  fontWeight: '500',
  letterSpacing: '0.08em',
});

globalStyle(`[data-theme="editorial"] .${sectionH2}`, {
  letterSpacing: '-0.03em',
  lineHeight: '1',
  fontWeight: '700',
});

// ── LAYOUT axis: editorial — 3-column grid arrangement (num · heading · meta) ─
// Structure: DOM arrangement of sectionHead columns.
// Applied only when the editorial layout is active (independent of theme).
globalStyle(`[data-layout="editorial"] .${sectionHead}`, {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: '0.4rem 2rem',
  alignItems: 'baseline',
  '@media': {
    '(max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

// ── THEME axis: kinetic — Fraunces display h2 (font is a styling token) ──────
globalStyle(`[data-theme="kinetic"] .${sectionH2}`, {
  fontWeight: '380',
  letterSpacing: '-0.022em',
  lineHeight: '1',
});

// Kinetic section idx gets de-emphasised (just a meta label)
globalStyle(`[data-theme="kinetic"] .${sectionIdx}`, {
  fontFamily: contract.font.mono,
  letterSpacing: '0.08em',
  fontSize: '0.74rem',
});

// ── LAYOUT axis: kinetic — stripped minimal heading, generous bottom space ──
// Structure: flex row (baseline), large h2, bottom border-only, very generous margin.
// The sec-title in the kinetic mockup is very large and the row is minimal chrome.
globalStyle(`[data-layout="kinetic"] .${sectionHead}`, {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '1.5rem',
  flexWrap: 'wrap',
  marginBottom: 'clamp(2.4rem, 5vh, 3.6rem)',
  paddingBottom: '1.4rem',
  borderBottom: `1px solid ${contract.color.line}`,
});

// In kinetic layout the h2 gets the large display treatment from the mockup
globalStyle(`[data-layout="kinetic"] .${sectionH2}`, {
  fontSize: 'clamp(2.1rem, 1.4rem + 3vw, 4.2rem)',
  lineHeight: '1',
  letterSpacing: '-0.022em',
});

// idx label pushed to meta position (right side) in kinetic
globalStyle(`[data-layout="kinetic"] .${sectionIdx}`, {
  order: '2',
  marginLeft: 'auto',
  letterSpacing: '0.08em',
  fontSize: '0.74rem',
  color: contract.color.inkFaint,
});

// Meta label aligns end in kinetic
globalStyle(`[data-layout="kinetic"] .${sectionMeta}`, {
  order: '3',
  alignSelf: 'flex-end',
});
