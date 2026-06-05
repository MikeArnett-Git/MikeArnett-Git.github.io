/**
 * StatTiles feature component — grid container only.
 * Individual tile internals live in primitives/MetricTile.css.ts.
 * [data-layout] selectors adapt structural arrangement (axis D17).
 */

import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';
import { tile, tileKey } from './primitives/MetricTile.css';

export const tiles = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  marginTop: 'clamp(2.5rem, 6vw, 4rem)',
  background: contract.color.hairline,
  border: `1px solid ${contract.color.hairline}`,
  borderRadius: contract.radius.lg,
  overflow: 'hidden',
  '@media': {
    '(max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

// ── LAYOUT axis: editorial — hairline-bordered stat row (flat strip, no raised tiles) ──
// Structure: remove the card-container chrome; tiles become a borderless strip separated
// by hairlines. Each tile sits in an open-rule row rather than a raised surface.
globalStyle(`[data-layout="editorial"] .${tiles}`, {
  background: 'transparent',
  border: 'none',
  borderTop: `1px solid ${contract.color.line}`,
  borderBottom: `1px solid ${contract.color.line}`,
  borderRadius: '0',
  gap: '0',
  marginTop: 'clamp(1rem, 3vw, 2rem)',
  overflow: 'visible',
  '@media': {
    '(max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

// Individual tiles in editorial: hairline dividers, no bg surface
globalStyle(`[data-layout="editorial"] .${tile}`, {
  background: 'transparent',
  minHeight: 'auto',
  padding: 'clamp(1.3rem, 2.5vw, 2rem) clamp(1.1rem, 2vw, 1.8rem)',
  borderLeft: `1px solid ${contract.color.hairline}`,
  '@media': {
    '(max-width: 720px)': {
      borderLeft: 'none',
      borderTop: `1px solid ${contract.color.hairline}`,
      padding: '1.3rem 0',
    },
  },
});

globalStyle(`[data-layout="editorial"] .${tile}:hover`, {
  background: 'transparent',
});

// First tile: no left border
globalStyle(`[data-layout="editorial"] .${tile}:first-child`, {
  borderLeft: 'none',
  paddingLeft: '0',
  '@media': {
    '(max-width: 720px)': {
      borderTop: 'none',
    },
  },
});

// Remove the "│ " pipe prefix on tileKey in editorial layout (not the code-terminal style)
globalStyle(`[data-layout="editorial"] .${tileKey}::before`, {
  content: 'none',
});

globalStyle(`[data-layout="editorial"] .${tileKey}`, {
  position: 'static',
  display: 'block',
  marginBottom: '0.55rem',
  letterSpacing: '0.04em',
  textTransform: 'none',
});

// ── LAYOUT axis: kinetic — minimal flat strip, open dividers ──────────────
// Structure: similar flat strip, no container chrome, generous padding, clean columns.
globalStyle(`[data-layout="kinetic"] .${tiles}`, {
  background: 'transparent',
  border: 'none',
  borderTop: `1px solid ${contract.color.line}`,
  borderBottom: `1px solid ${contract.color.line}`,
  borderRadius: '0',
  gap: '0',
  marginTop: 'clamp(2.6rem, 6vh, 4rem)',
  overflow: 'visible',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`[data-layout="kinetic"] .${tile}`, {
  background: 'transparent',
  padding: 'clamp(1.2rem, 2.6vw, 1.9rem) clamp(1rem, 2.4vw, 1.8rem) clamp(1.2rem, 2.6vw, 1.9rem) 0',
  borderLeft: `1px solid ${contract.color.line}`,
  minHeight: 'auto',
  '@media': {
    '(max-width: 640px)': {
      borderLeft: 'none',
      borderTop: `1px solid ${contract.color.line}`,
      padding: 'clamp(1.2rem, 2.6vw, 1.9rem) 0',
    },
  },
});

globalStyle(`[data-layout="kinetic"] .${tile}:hover`, {
  background: 'transparent',
});

globalStyle(`[data-layout="kinetic"] .${tile}:first-child`, {
  borderLeft: 'none',
  paddingLeft: '0',
  '@media': {
    '(max-width: 640px)': {
      borderTop: 'none',
    },
  },
});

// Remove pipe prefix in kinetic layout too
globalStyle(`[data-layout="kinetic"] .${tileKey}::before`, {
  content: 'none',
});

globalStyle(`[data-layout="kinetic"] .${tileKey}`, {
  position: 'static',
  display: 'block',
  marginBottom: '0.7rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontSize: '0.68rem',
});
