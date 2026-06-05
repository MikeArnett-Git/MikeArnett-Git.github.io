/**
 * ProjectGrid feature component styles.
 * Card base shape + chip variants are from primitives (Card.css.ts, Tag.css.ts).
 * This file owns: grid layout, span helpers, card content typography, scopeviz.
 * [data-layout] selectors (globalStyle) vary the grid structure (layout axis).
 */

import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';

export const projGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '1rem',
  '@media': {
    '(max-width: 880px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(max-width: 560px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const span7 = style({
  gridColumn: 'span 7',
  '@media': {
    '(max-width: 880px)': { gridColumn: 'span 1' },
  },
});

export const span5 = style({
  gridColumn: 'span 5',
  '@media': {
    '(max-width: 880px)': { gridColumn: 'span 1' },
  },
});

export const span6 = style({
  gridColumn: 'span 6',
  '@media': {
    '(max-width: 880px)': { gridColumn: 'span 1' },
  },
});

export const span12 = style({
  gridColumn: 'span 12',
  '@media': {
    '(max-width: 880px)': { gridColumn: 'span 2' },
    '(max-width: 560px)': { gridColumn: 'span 1' },
  },
});

/** Span class lookup by 12-col width — lets ProjectGrid render spans from data. */
export const spanClass: Record<5 | 6 | 7 | 12, string> = {
  5: span5,
  6: span6,
  7: span7,
  12: span12,
};

export const cardTop = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
});

export const cardName = style({
  fontFamily: contract.font.mono,
  fontSize: '0.95rem',
  fontWeight: 600,
  color: contract.color.accentBright,
  letterSpacing: '0.01em',
  '::before': {
    content: '"› "',
    color: contract.color.inkFaint,
  },
});

export const cardNameFeatured = style({
  fontFamily: contract.font.mono,
  fontSize: '0.95rem',
  fontWeight: 600,
  color: contract.color.accent,
  letterSpacing: '0.01em',
  '::before': {
    content: '"› "',
    color: contract.color.inkFaint,
  },
});

export const cardH3 = style({
  fontFamily: contract.font.display,
  fontWeight: 600,
  fontSize: '1.12rem',
  letterSpacing: '-0.01em',
  margin: 0,
  color: contract.color.ink,
});

export const cardP = style({
  color: contract.color.inkDim,
  margin: 0,
  fontSize: '0.94rem',
  lineHeight: 1.55,
  flex: 1,
});

export const cardFlag = style({
  fontFamily: contract.font.mono,
  fontSize: '0.72rem',
  color: contract.color.inkFaint,
  paddingTop: '0.6rem',
  borderTop: `1px solid ${contract.color.hairline}`,
  letterSpacing: '0.03em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const cardLink = style({
  color: contract.color.accent,
});

/**
 * Body wrapper around name + headline + description (+ scopeviz).
 * `display: contents` by default so control-plane and editorial layouts see the
 * children as direct article children exactly as before (zero structural impact).
 * In the kinetic layout it becomes a real grid cell (col 2) so the row's large
 * column-gap separates num/body/arrow — NOT the lines within the body. (Mirrors
 * the kinetic mockup's single `.body` cell; without it the body elements
 * auto-placed into the 3.5rem and `auto` columns and the text squished.)
 */
export const cardBody = style({
  display: 'contents',
});

/** Decorative project index ("001", "002" …) — col 1 in the kinetic list only. */
export const projNum = style({
  display: 'none',
});

export const scopeviz = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'flex-end',
  height: '38px',
  marginTop: '0.2rem',
});

export const scopevizBar = style({
  flex: 1,
  background: contract.color.scopeFill,
  borderTop: `2px solid ${contract.color.accent}`,
  borderRadius: '1px',
});

// ── LAYOUT axis: editorial — asymmetric 2-up editorial grid ───────────────
// Structure: flat hairline-rule grid (no card surfaces), 2-column editorial layout.
// Odd/even items separated by a hairline; last item spans full-width (feature).
// This mirrors direction-A's .projects grid structure.
globalStyle(`[data-layout="editorial"] .${projGrid}`, {
  display: 'grid',
  gridTemplateColumns: '1fr',
  borderTop: `1px solid ${contract.color.hairline}`,
  gap: '0',
  '@media': {
    '(min-width: 800px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

// All cards in editorial layout become flat borderless rows
globalStyle(`[data-layout="editorial"] .${projGrid} article`, {
  gridColumn: 'auto',
  borderRadius: '0',
  background: 'transparent',
  border: 'none',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: contract.color.hairline,
  padding: 'clamp(1.6rem, 3vw, 2.4rem) 0',
});

globalStyle(`[data-layout="editorial"] .${projGrid} article:hover`, {
  transform: 'none',
  background: 'transparent',
});

globalStyle(`[data-layout="editorial"] .${projGrid} article::after`, {
  content: 'none',
});

// Odd-column cards get a right hairline; even get no right border + no left padding
globalStyle(`[data-layout="editorial"] .${projGrid} article:nth-child(odd)`, {
  '@media': {
    '(min-width: 800px)': {
      borderRight: `1px solid ${contract.color.hairline}`,
      paddingRight: 'clamp(1.4rem, 2.5vw, 2.4rem)',
    },
  },
});

globalStyle(`[data-layout="editorial"] .${projGrid} article:nth-child(even)`, {
  '@media': {
    '(min-width: 800px)': {
      paddingLeft: 'clamp(1.4rem, 2.5vw, 2.4rem)',
    },
  },
});

// The last (span12 "this-site") card goes full-width in editorial too,
// displayed as a feature row: split 5fr/6fr columns
globalStyle(`[data-layout="editorial"] .${projGrid} article.${span12}`, {
  gridColumn: '1 / -1',
  borderRight: 'none',
  paddingInline: '0',
  '@media': {
    '(min-width: 800px)': {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)',
      gap: 'clamp(1.5rem, 3vw, 3rem)',
      alignItems: 'center',
    },
  },
});

// Scopeviz is a control-plane metaphor; hide in editorial layout
globalStyle(`[data-layout="editorial"] .${scopeviz}`, {
  display: 'none',
});

// cardName "› " prefix: editorial drops the terminal prefix
globalStyle(`[data-layout="editorial"] .${cardName}::before`, {
  content: 'none',
});
globalStyle(`[data-layout="editorial"] .${cardNameFeatured}::before`, {
  content: 'none',
});

// ── LAYOUT axis: kinetic — minimal stacked list ───────────────────────────
// Structure: flat borderless list; each project is a row with num / body / arrow.
// All cards collapsed to single-column list rows separated by thin border-bottom lines.
globalStyle(`[data-layout="kinetic"] .${projGrid}`, {
  display: 'block',
  borderTop: `1px solid ${contract.color.line}`,
  gap: '0',
});

// Each card: a full-width row, no card chrome
globalStyle(`[data-layout="kinetic"] .${projGrid} article`, {
  gridColumn: 'auto',
  display: 'grid',
  gridTemplateColumns: '3.5rem minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: 'clamp(1rem, 3vw, 2.4rem)',
  padding: 'clamp(1.6rem, 3.4vh, 2.6rem) 0.5rem',
  borderRadius: '0',
  background: 'transparent',
  border: 'none',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: contract.color.line,
  '@media': {
    '(max-width: 600px)': {
      gridTemplateColumns: '2.4rem 1fr',
    },
  },
});

globalStyle(`[data-layout="kinetic"] .${projGrid} article:hover`, {
  background: contract.color.surfaceRaised,
});

globalStyle(`[data-layout="kinetic"] .${projGrid} article`, {
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: `transform 220ms ease, background 220ms ease`,
    },
  },
});

globalStyle(`[data-layout="kinetic"] .${projGrid} article:hover`, {
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transform: 'translateX(6px)',
    },
  },
});

globalStyle(`[data-layout="kinetic"] .${projGrid} article::after`, {
  content: 'none',
});

// Kinetic list row: [projNum | cardBody | cardFlag] = [num | body | arrow].
// cardBody is the real grid cell (col 2) holding the stacked name/headline/desc;
// the row's column-gap separates the three columns, not the lines inside the body.
globalStyle(`[data-layout="kinetic"] .${cardBody}`, {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  gridColumn: '2',
  minWidth: 0,
  alignSelf: 'center',
});

// Decorative index in col 1.
globalStyle(`[data-layout="kinetic"] .${projNum}`, {
  display: 'block',
  gridColumn: '1',
  alignSelf: 'center',
  fontFamily: contract.font.mono,
  fontSize: '0.78rem',
  letterSpacing: '0.02em',
  color: contract.color.inkFaint,
  '@media': {
    '(max-width: 600px)': {
      fontSize: '0.72rem',
    },
  },
});

// The card header row (project name + status chip) sits at the top of the body.
globalStyle(`[data-layout="kinetic"] .${cardTop}`, {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

// The card name becomes a large display-font project name in the body slot
globalStyle(`[data-layout="kinetic"] .${cardName}`, {
  fontSize: 'clamp(1.55rem, 1.2rem + 1.8vw, 2.9rem)',
  lineHeight: '1.04',
  letterSpacing: '-0.02em',
  fontFamily: contract.font.display,
  fontWeight: '400',
});

globalStyle(`[data-layout="kinetic"] .${cardName}::before`, {
  content: 'none',
});

globalStyle(`[data-layout="kinetic"] .${cardNameFeatured}`, {
  fontSize: 'clamp(1.55rem, 1.2rem + 1.8vw, 2.9rem)',
  lineHeight: '1.04',
  letterSpacing: '-0.02em',
  fontFamily: contract.font.display,
  fontWeight: '400',
});

globalStyle(`[data-layout="kinetic"] .${cardNameFeatured}::before`, {
  content: 'none',
});

// h3 moves under the name as description (spacing handled by cardBody gap)
globalStyle(`[data-layout="kinetic"] .${cardH3}`, {
  fontSize: 'clamp(0.95rem, 0.9rem + 0.3vw, 1.1rem)',
  lineHeight: '1.5',
  letterSpacing: '0',
  fontWeight: '400',
  color: contract.color.inkDim,
  marginTop: '0',
});

// cardP and cardFlag: reduced emphasis in list view
globalStyle(`[data-layout="kinetic"] .${cardP}`, {
  fontSize: '0.9rem',
  color: contract.color.inkFaint,
});

// scopeviz: hide in kinetic list (pure minimal)
globalStyle(`[data-layout="kinetic"] .${scopeviz}`, {
  display: 'none',
});

// cardFlag: category + go-link cluster in col 3, right-aligned, vertically centred
globalStyle(`[data-layout="kinetic"] .${cardFlag}`, {
  gridColumn: '3',
  alignSelf: 'center',
  justifySelf: 'end',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.4rem',
  borderTop: 'none',
  paddingTop: '0',
  '@media': {
    '(max-width: 600px)': {
      display: 'none',
    },
  },
});
