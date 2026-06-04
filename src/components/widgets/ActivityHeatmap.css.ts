/**
 * ActivityHeatmap widget styles — vanilla-extract.
 * Token-driven: accent hue via CSS custom prop, works in all 4 themes.
 */
import { style } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

export const actStrip = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(13px, 1fr))',
  gap: '4px',
});

export const actCell = style({
  aspectRatio: '1',
  borderRadius: '3px',
  background: contract.color.surfaceInset,
});

export const actCellL1 = style({
  background: 'oklch(70% 0.15 var(--accent-hue, 265) / 0.22)',
});

export const actCellL2 = style({
  background: 'oklch(70% 0.15 var(--accent-hue, 265) / 0.42)',
});

export const actCellL3 = style({
  background: 'oklch(70% 0.15 var(--accent-hue, 265) / 0.68)',
});

export const actCellL4 = style({
  background: 'oklch(70% 0.15 var(--accent-hue, 265))',
});

export const actLegend = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: contract.font.body,
  fontSize: '12px',
  color: contract.color.inkFaint,
  justifyContent: 'flex-end',
});

export const actLegendCells = style({
  display: 'flex',
  gap: '3px',
  alignItems: 'center',
});

export const actLegendCell = style({
  width: '11px',
  height: '11px',
  borderRadius: '3px',
  display: 'block',
});
