/**
 * Section layout styles + Practices band.
 * SectionHeading styles (sectionHead/sectionIdx/sectionH2/sectionMeta) have
 * been extracted to primitives/SectionHeading.css.ts and are re-exported
 * here for backward-compatibility with index.astro imports.
 * [data-theme] selectors adapt band/tag styles (styling axis).
 * [data-layout] selectors adapt section spacing + divider structure (layout axis).
 */

import { style, globalStyle } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';
// Re-export the shared wrap so src/pages/index.astro can import it from here (backward-compat).
export { wrap } from '../styles/layout.css';

// Re-export from primitive so existing index.astro imports keep working.
export { sectionHead, sectionIdx, sectionH2, sectionMeta } from './primitives/SectionHeading.css';

export const section = style({
  paddingBlock: 'clamp(3.5rem, 8vw, 6rem)',
  position: 'relative',
});

// Practices band
export const band = style({
  background: contract.color.surface,
  border: `1px solid ${contract.color.line}`,
  borderRadius: contract.radius.lg,
  padding: 'clamp(1.6rem, 4vw, 2.4rem)',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.6rem',
});

export const practicesLine = style({
  fontFamily: contract.font.display,
  fontWeight: 500,
  fontSize: 'clamp(1.15rem, 2.6vw, 1.6rem)',
  letterSpacing: '-0.015em',
  lineHeight: 1.35,
  color: contract.color.ink,
  maxWidth: '40ch',
});

export const practicesEm = style({
  color: contract.color.accent,
});

export const practiceTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export const tag = style({
  fontFamily: contract.font.mono,
  fontSize: '0.74rem',
  letterSpacing: '0.03em',
  color: contract.color.inkDim,
  background: contract.color.surfaceInset,
  border: `1px solid ${contract.color.hairline}`,
  borderRadius: contract.radius.sm,
  padding: '0.4rem 0.7rem',
  '::before': {
    content: '"# "',
    color: contract.color.accentDeep,
  },
});

export const beyond = style({
  borderTop: `1px dashed ${contract.color.line}`,
  paddingTop: '1.4rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  flexWrap: 'wrap',
  fontFamily: contract.font.mono,
  fontSize: '0.82rem',
  color: contract.color.inkDim,
});

export const beyondLabel = style({
  color: contract.color.inkFaint,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontSize: '0.7rem',
});

export const beyondPipe = style({
  color: contract.color.accentDeep,
});

// ── Editorial: practices band loses rounded card styling; tags become hairline borders
globalStyle(`[data-theme="editorial"] .${band}`, {
  background: contract.color.surfaceInset,
  border: 'none',
  borderTop: `1px solid ${contract.color.line}`,
  borderBottom: `1px solid ${contract.color.line}`,
  borderRadius: '0',
  padding: 'clamp(1.6rem, 4vw, 2.4rem) 0',
});

globalStyle(`[data-theme="editorial"] .${tag}`, {
  borderRadius: '0',
  background: 'transparent',
  border: `1px solid ${contract.color.line}`,
});

// "# " prefix is a control-plane code convention; remove in editorial
globalStyle(`[data-theme="editorial"] .${tag}::before`, {
  content: 'none',
});

// ── Kinetic: practices band is flat — border-top/bottom only, no filled surface
globalStyle(`[data-theme="kinetic"] .${band}`, {
  background: 'transparent',
  border: 'none',
  borderTop: `1px solid ${contract.color.line}`,
  borderBottom: `1px solid ${contract.color.line}`,
  borderRadius: '0',
});

globalStyle(`[data-theme="kinetic"] .${practicesLine}`, {
  fontSize: 'clamp(1.7rem, 1.1rem + 3.4vw, 3.6rem)',
  lineHeight: '1.18',
  letterSpacing: '-0.02em',
  fontWeight: '340',
});

// Kinetic tags: near-invisible border only
globalStyle(`[data-theme="kinetic"] .${tag}`, {
  background: 'transparent',
  border: `1px solid ${contract.color.line}`,
  borderRadius: '2px',
});

globalStyle(`[data-theme="kinetic"] .${tag}::before`, {
  content: 'none',
});

// ── LAYOUT axis: editorial — hairline divider between sections, tighter padding ──
// Structure: sections are separated by a single hairline rule (borderTop).
// The section spacing is pulled in slightly — editorial uses rhythm, not generous air.
globalStyle(`[data-layout="editorial"] .${section}`, {
  paddingBlock: 'clamp(3.5rem, 8vw, 7rem)',
  borderTop: `1px solid ${contract.color.hairline}`,
});

// ── LAYOUT axis: kinetic — generous spacing, no inter-section divider ──────
// Structure: sections breathe with very generous padding (5–11vh cadence),
// no decorative rules between them — whitespace IS the separator.
globalStyle(`[data-layout="kinetic"] .${section}`, {
  paddingBlock: 'clamp(5rem, 11vh, 10rem)',
});
