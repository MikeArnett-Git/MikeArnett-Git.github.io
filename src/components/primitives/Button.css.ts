/**
 * Button primitive — token-styled, no hardcoded colours.
 * Variants: 'primary' (filled accent), 'ghost' (outlined), 'nav-cta' (nav variant).
 */

import { style } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

export const btn = style({
  fontFamily: contract.font.mono,
  fontSize: '0.82rem',
  fontWeight: 500,
  letterSpacing: '0.01em',
  padding: '0.7rem 1.2rem',
  borderRadius: contract.radius.sm,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.55rem',
  border: '1px solid transparent',
  transition: `transform ${contract.motion.durBase} ${contract.motion.easing}, background ${contract.motion.durBase} ${contract.motion.easing}, border-color ${contract.motion.durBase} ${contract.motion.easing}`,
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const btnArrow = style({
  transition: `transform ${contract.motion.durBase} ${contract.motion.easing}`,
  selectors: {
    [`${btn}:hover &`]: {
      transform: 'translateX(3px)',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const btnPrimary = style([
  btn,
  {
    background: contract.color.accent,
    color: contract.color.onAccent,
    fontWeight: 600,
    ':hover': {
      background: contract.color.accentBright,
    },
  },
]);

export const btnGhost = style([
  btn,
  {
    background: 'transparent',
    color: contract.color.ink,
    borderColor: contract.color.line,
    ':hover': {
      borderColor: contract.color.borderHover,
      background: contract.color.surfaceSubtle,
    },
  },
]);

/** Smaller nav-bar CTA variant (matches navCta in Nav.css.ts). */
export const btnNavCta = style({
  color: contract.color.accentBright,
  padding: '0.4rem 0.7rem',
  borderRadius: contract.radius.sm,
  border: `1px solid ${contract.color.borderHover}`,
  fontFamily: contract.font.mono,
  fontSize: '0.8rem',
  transition: `color ${contract.motion.durBase} ${contract.motion.easing}, background ${contract.motion.durBase} ${contract.motion.easing}, border-color ${contract.motion.durBase} ${contract.motion.easing}`,
  ':hover': {
    background: contract.color.accentSubtle,
    borderColor: contract.color.accent,
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});
