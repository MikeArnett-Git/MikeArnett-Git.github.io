/**
 * MetricTile primitive — the individual stat/metric cell used in the StatTiles grid.
 * The grid container remains in StatTiles (feature component owns layout).
 */

import { style } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

export const tile = style({
  background: contract.color.surface,
  padding: '1.3rem 1.4rem 1.4rem',
  position: 'relative',
  minHeight: '130px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  transition: `background ${contract.motion.durBase} ${contract.motion.easing}`,
  ':hover': {
    background: contract.color.surfaceHover,
  },
  '@media': {
    '(max-width: 720px)': {
      minHeight: 'auto',
      paddingTop: '2.6rem',
    },
  },
});

export const tileKey = style({
  position: 'absolute',
  top: '1rem',
  left: '1.4rem',
  fontFamily: contract.font.mono,
  fontSize: '0.66rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: contract.color.inkFaint,
  '::before': {
    content: '"│ "',
    color: contract.color.accentDeep,
  },
});

export const metric = style({
  fontFamily: contract.font.display,
  fontWeight: 700,
  fontSize: 'clamp(1.55rem, 3.6vw, 2.4rem)',
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
  color: contract.color.ink,
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: `color 200ms ${contract.motion.easing}`,
    },
  },
});

export const metricAccent = style({
  color: contract.color.accent,
});

export const metricLive = style({
  color: contract.color.live,
});

export const metricSub = style({
  fontFamily: contract.font.body,
  fontSize: contract.type.small,
  color: contract.color.inkDim,
  marginTop: '0.35rem',
  lineHeight: 1.4,
  fontWeight: 400,
  letterSpacing: 0,
});
