/**
 * ScopeViz widget styles — vanilla-extract.
 * Token-driven radial relationship mini-viz (inline SVG).
 * Works across all 4 themes (D14/D17).
 */
import { style, keyframes } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

export const scopeVizContainer = style({
  display: 'grid',
  placeItems: 'center',
  padding: '6px 0 2px',
});

export const scopeVizSvg = style({
  width: '100%',
  height: 'auto',
  maxWidth: '340px',
});

const pulse = keyframes({
  '0%, 100%': { opacity: 0.5 },
  '50%':      { opacity: 1   },
});

export const scopePulse = style({
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animationName: pulse,
      animationDuration: '3.2s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      transformOrigin: 'center',
      transformBox: 'fill-box',
    },
  },
});

export const scopeLegend = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px 16px',
  fontFamily: contract.font.body,
  fontSize: '12px',
  color: contract.color.inkFaint,
});

export const scopeLegendItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
});

export const scopeLegendDot = style({
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  flexShrink: 0,
});
