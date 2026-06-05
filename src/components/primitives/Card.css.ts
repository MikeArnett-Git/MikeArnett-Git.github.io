/**
 * Card primitive — token-styled surface with border + radius.
 * The base card shape used by ExperienceEntry and ProjectCard.
 * [data-theme] selectors adapt card chrome per design.
 */

import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

/** Standard card: surface bg, border, rounded, hover lift + corner tick. */
export const card = style({
  background: contract.color.surface,
  border: `1px solid ${contract.color.line}`,
  borderRadius: contract.radius.lg,
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.9rem',
  position: 'relative',
  overflow: 'hidden',
  transition: `border-color ${contract.motion.durBase} ${contract.motion.easing}, transform ${contract.motion.durBase} ${contract.motion.easing}, background ${contract.motion.durBase} ${contract.motion.easing}`,
  ':hover': {
    borderColor: contract.color.borderHover,
    background: contract.color.surfaceHover,
  },
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      selectors: {
        '&:hover': {
          transform: 'translateY(-3px)',
        },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
  // Corner registration tick
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '34px',
    height: '34px',
    borderTop: '2px solid transparent',
    borderRight: '2px solid transparent',
    transition: `border-color ${contract.motion.durBase} ${contract.motion.easing}`,
  },
  selectors: {
    '&:hover::after': {
      borderTopColor: contract.color.accent,
      borderRightColor: contract.color.accent,
    },
  },
});

/** Featured card variant — slightly lighter gradient bg, accent border. */
export const cardFeatured = style({
  background: contract.color.featuredBg,
  borderColor: contract.color.borderHover,
});

/** Article card — used by ExperienceEntry. No lift transform; split-column layout. */
export const articleCard = style({
  background: contract.color.surface,
  border: `1px solid ${contract.color.line}`,
  borderRadius: contract.radius.lg,
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  '@media': {
    '(max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

// ── Editorial: flat paper surface, hairline border, no lift, no corner tick ─
globalStyle(`[data-theme="editorial"] .${card}`, {
  background: contract.color.surfaceInset,
  borderRadius: '0',
  borderColor: contract.color.hairline,
});

globalStyle(`[data-theme="editorial"] .${card}:hover`, {
  transform: 'none',
  background: contract.color.surface,
  borderColor: contract.color.line,
});

// Remove corner tick in editorial
globalStyle(`[data-theme="editorial"] .${card}::after`, {
  content: 'none',
});

globalStyle(`[data-theme="editorial"] .${articleCard}`, {
  borderRadius: '0',
  borderColor: contract.color.hairline,
  background: contract.color.surfaceInset,
});

// ── Kinetic: minimal surface, very subtle border, no corner tick ──────────
globalStyle(`[data-theme="kinetic"] .${card}`, {
  borderRadius: '0',
  background: 'transparent',
  borderColor: contract.color.line,
});

globalStyle(`[data-theme="kinetic"] .${card}:hover`, {
  background: contract.color.surfaceRaised,
  borderColor: contract.color.line,
});

globalStyle(`[data-theme="kinetic"] .${card}::after`, {
  content: 'none',
});

globalStyle(`[data-theme="kinetic"] .${articleCard}`, {
  borderRadius: '0',
  background: 'transparent',
  borderColor: contract.color.line,
});
