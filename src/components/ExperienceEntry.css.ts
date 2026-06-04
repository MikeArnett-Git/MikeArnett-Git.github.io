/**
 * ExperienceEntry feature component styles.
 * Card shape is from primitives/Card.css.ts (articleCard).
 * Chip is from primitives/Tag.css.ts (chip-live).
 */

import { style, globalStyle } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';

export const expRail = style({
  background: contract.color.surfaceInset,
  borderRight: `1px solid ${contract.color.line}`,
  padding: '1.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.9rem',
  '@media': {
    '(max-width: 720px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      borderRight: 'none',
      borderBottom: `1px solid ${contract.color.line}`,
    },
  },
});

export const expOrg = style({
  fontFamily: contract.font.display,
  fontWeight: 600,
  fontSize: '1.05rem',
  letterSpacing: '-0.01em',
  '@media': {
    '(max-width: 720px)': {
      width: '100%',
    },
  },
});

export const expRow = style({
  fontFamily: contract.font.mono,
  fontSize: '0.74rem',
  color: contract.color.inkDim,
  letterSpacing: '0.03em',
});

export const expRowLabel = style({
  color: contract.color.inkFaint,
  display: 'block',
  fontSize: '0.64rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '2px',
});

export const expBody = style({
  padding: '1.8rem',
});

export const expBodyH3 = style({
  fontFamily: contract.font.display,
  fontWeight: 600,
  fontSize: '1.2rem',
  letterSpacing: '-0.01em',
  margin: '0 0 0.9rem',
  color: contract.color.ink,
});

export const expBodyP = style({
  color: contract.color.inkDim,
  margin: '0 0 1.4rem',
  maxWidth: '68ch',
  fontSize: '1rem',
});

// Emphasis inside the data-driven body — set:html marks highlights with <b>.
globalStyle(`${expBodyP} b`, {
  color: contract.color.ink,
  fontWeight: 500,
});

export const expHighlights = style({
  listStyle: 'none',
  margin: '0 0 1.4rem',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.65rem',
  maxWidth: '68ch',
});

export const expHighlightItem = style({
  position: 'relative',
  paddingLeft: '1.25rem',
  color: contract.color.inkDim,
  fontSize: '0.95rem',
  lineHeight: 1.55,
  selectors: {
    '&::before': {
      content: '"▸"',
      position: 'absolute',
      left: 0,
      top: 0,
      color: contract.color.accent,
    },
  },
});

// Emphasis inside highlight bullets — set:html marks key phrases with <b>.
globalStyle(`${expHighlightItem} b`, {
  color: contract.color.ink,
  fontWeight: 500,
});

export const expMetrics = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.6rem',
});

export const expMetric = style({
  fontFamily: contract.font.mono,
  fontSize: '0.78rem',
  background: contract.color.surfaceInset,
  border: `1px solid ${contract.color.hairline}`,
  borderRadius: contract.radius.sm,
  padding: '0.45rem 0.75rem',
  color: contract.color.inkDim,
});

export const expMetricBold = style({
  color: contract.color.accent,
  fontWeight: 600,
});
