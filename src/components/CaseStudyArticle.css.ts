/**
 * CaseStudyArticle.css.ts — case study article layout + typography.
 * Token-driven only (no hardcoded oklch). Reuses the contract colour + font
 * tokens. Renders correctly in all 4 themes (layout-agnostic component).
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';

/** Centred content column — max ~70ch prose measure. */
export const article = style({
  maxWidth: '70ch',
  marginInline: 'auto',
  padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(1.8rem, 3vw, 2.6rem)',
});

/** "← Projects" back navigation link. */
export const backLink = style({
  fontFamily: contract.font.mono,
  fontSize: '0.82rem',
  color: contract.color.accentBright,
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  letterSpacing: '0.01em',
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
});

/** Eyebrow / kicker label above the title. */
export const kicker = style({
  fontFamily: contract.font.mono,
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  color: contract.color.accentBright,
  textTransform: 'uppercase',
  margin: 0,
});

/** Article h1 title. */
export const title = style({
  fontFamily: contract.font.display,
  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: contract.color.ink,
  margin: 0,
  lineHeight: 1.15,
});

/** Lead summary paragraph. */
export const lead = style({
  fontFamily: contract.font.body,
  fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
  lineHeight: 1.72,
  color: contract.color.inkDim,
  margin: 0,
});

/** Wrapper around all content sections. */
export const sections = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(1.4rem, 2.5vw, 2rem)',
});

/** Individual section block (h2 + body). */
export const sectionBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

/** Section h2 heading. */
export const sectionH2 = style({
  fontFamily: contract.font.display,
  fontSize: '1rem',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: contract.color.ink,
  margin: 0,
});

/** Section body prose. */
export const sectionBody = style({
  fontFamily: contract.font.body,
  fontSize: '0.94rem',
  lineHeight: 1.72,
  color: contract.color.inkDim,
  margin: 0,
});

globalStyle(`.${sectionBody} b`, {
  color: contract.color.ink,
  fontWeight: 600,
});

globalStyle(`.${sectionBody} code`, {
  fontFamily: contract.font.mono,
  fontSize: '0.88em',
  color: contract.color.accentBright,
  padding: '0.1em 0.35em',
  borderRadius: '3px',
});

/** Hairline divider between major article regions. */
export const divider = style({
  border: 'none',
  borderTop: `1px solid ${contract.color.hairline}`,
  margin: 0,
});

/** Proof-tile grid (mirrors Overview metricsGrid pattern). */
export const badgesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: '0.75rem',
});

/** Individual proof tile (mirrors metricItem). */
export const badgeTile = style({
  background: contract.color.surfaceInset,
  borderRadius: contract.radius.sm,
  padding: '0.8rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

/** Tile key label (mirrors metricKey). */
export const badgeKey = style({
  fontFamily: contract.font.mono,
  fontSize: '0.68rem',
  letterSpacing: '0.06em',
  color: contract.color.inkFaint,
  textTransform: 'uppercase',
});

/** Tile value (mirrors metricVal). */
export const badgeVal = style({
  fontFamily: contract.font.mono,
  fontSize: '1.05rem',
  fontWeight: 600,
  color: contract.color.accentBright,
  letterSpacing: '-0.01em',
});

/** "Stack" label above tech chips. */
export const stackLabel = style({
  fontFamily: contract.font.mono,
  fontSize: '0.72rem',
  letterSpacing: '0.06em',
  color: contract.color.inkFaint,
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
});

/** Row of tech Tag chips. */
export const stackRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  alignItems: 'center',
});

/** Section containing "Stack" label + chips. */
export const stackSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.1rem',
});

/** Row of link/button actions. */
export const linksRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
});

// ── Scannable section structure: number · heading → lede → details ──────────

/** Section header row: index + heading on one baseline. */
export const sectionHd = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.7rem',
});

/** Section index (01, 02 …) — mono, accent, tabular. */
export const sectionNum = style({
  fontFamily: contract.font.mono,
  fontSize: '0.78rem',
  fontWeight: 700,
  color: contract.color.accent,
  letterSpacing: '0.02em',
  fontVariantNumeric: 'tabular-nums',
  flexShrink: 0,
});

/** The scannable one-line takeaway under the heading (the "subheading summary"). */
export const sectionLede = style({
  fontFamily: contract.font.display,
  fontSize: 'clamp(1.05rem, 1.7vw, 1.24rem)',
  fontWeight: 500,
  lineHeight: 1.4,
  letterSpacing: '-0.012em',
  color: contract.color.ink,
  margin: '0.1rem 0 0.1rem',
  textWrap: 'balance',
});

globalStyle(`.${sectionLede} code`, {
  fontFamily: contract.font.mono,
  fontSize: '0.86em',
  color: contract.color.accentBright,
});
globalStyle(`.${sectionLede} b`, {
  color: contract.color.accentBright,
  fontWeight: 600,
});

/** Curated code excerpt — accent-edged inset panel. */
export const snippetBox = style({
  margin: '0.1rem 0 0',
  borderRadius: contract.radius.sm,
  overflow: 'hidden',
  background: contract.color.surfaceInset,
  borderLeft: `2px solid ${contract.color.accent}`,
});

export const snippetCap = style({
  fontFamily: contract.font.mono,
  fontSize: '0.66rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: contract.color.inkFaint,
  padding: '0.55rem 0.9rem 0',
});

export const snippetPre = style({
  margin: 0,
  padding: '0.5rem 0.9rem 0.8rem',
  overflowX: 'auto',
  fontFamily: contract.font.mono,
  fontSize: '0.8rem',
  lineHeight: 1.6,
  color: contract.color.inkDim,
  tabSize: 2,
});

/** Row of "view source on GitHub" deep links. */
export const sourceRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.35rem 1rem',
  marginTop: '0.15rem',
});

export const sourceLink = style({
  fontFamily: contract.font.mono,
  fontSize: '0.74rem',
  color: contract.color.accentBright,
  textDecoration: 'none',
  letterSpacing: '0.01em',
  '::after': {
    content: '" ↗"',
    color: contract.color.inkFaint,
  },
  selectors: {
    '&:hover': {
      color: contract.color.accent,
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
      borderRadius: '2px',
    },
  },
});
