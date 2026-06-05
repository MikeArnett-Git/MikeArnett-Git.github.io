/**
 * Tag primitive — token-styled chip/tag. No hardcoded colours.
 * Variants: 'default' (monospace label, hash prefix), 'status-live' (green),
 * 'status-active' (cyan).
 */

import { style } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

/** Base chip/tag shape. Consumers add a variant class alongside. */
export const tagBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontFamily: contract.font.mono,
  fontSize: '0.74rem',
  letterSpacing: '0.03em',
  borderRadius: contract.radius.sm,
  padding: '0.4rem 0.7rem',
  width: 'fit-content',
});

/** Default tag — hash prefix, surface/hairline colours. Used in Practices. */
export const tagDefault = style([
  tagBase,
  {
    color: contract.color.inkDim,
    background: contract.color.surfaceInset,
    border: `1px solid ${contract.color.hairline}`,
    '::before': {
      content: '"# "',
      color: contract.color.accentDeep,
    },
  },
]);

/** Chip shape (no hash prefix, pill radius). Base for status chips. */
export const chipBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontFamily: contract.font.mono,
  fontSize: '0.7rem',
  letterSpacing: '0.04em',
  borderRadius: '100px',
  padding: '0.25rem 0.65rem',
  width: 'fit-content',
});

/** "live / shipped" — green variant. */
export const chipLive = style([
  chipBase,
  {
    color: contract.color.live,
    background: contract.color.tagLiveBg,
    border: `1px solid ${contract.color.tagLiveBorder}`,
  },
]);

/** "in dev / active" — cyan/accent variant. */
export const chipActive = style([
  chipBase,
  {
    color: contract.color.accentBright,
    background: contract.color.accentSubtle,
    border: `1px solid ${contract.color.accentSubtleBorder}`,
  },
]);

/** Dot indicator inside a chip (inherits currentColor). */
export const chipDot = style({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: 'currentColor',
  flex: 'none',
});
