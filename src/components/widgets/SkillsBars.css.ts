/**
 * SkillsBars widget styles — vanilla-extract.
 * Token-driven: works across all 4 themes (D14/D17).
 */
import { style, keyframes } from '@vanilla-extract/css';
import { contract } from '../../styles/contract.css';

const barGrow = keyframes({
  from: { width: '0' },
  to:   { width: 'var(--bar-w, 0%)' },
});

export const skillsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const skillRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '10px 14px',
  alignItems: 'baseline',
});

export const skillName = style({
  fontFamily: contract.font.body,
  fontSize: '13.5px',
  color: contract.color.inkDim,
  fontWeight: '500',
});

export const skillMeta = style({
  fontFamily: contract.font.mono,
  fontSize: '10.5px',
  color: contract.color.inkFaint,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const skillBarTrack = style({
  gridColumn: '1 / -1',
  height: '7px',
  borderRadius: '99px',
  background: contract.color.surfaceInset,
  overflow: 'hidden',
});

export const skillBarFill = style({
  height: '100%',
  borderRadius: '99px',
  background: `linear-gradient(90deg, ${contract.color.accentDeep}, ${contract.color.accent})`,
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animationName: barGrow,
      animationDuration: '900ms',
      animationTimingFunction: 'cubic-bezier(.2,.7,.2,1)',
      animationFillMode: 'both',
    },
  },
});

export const skillCloud = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '9px',
  marginTop: '20px',
  paddingTop: '18px',
  borderTop: `1px solid ${contract.color.hairline}`,
});

export const skillTag = style({
  fontFamily: contract.font.body,
  fontSize: '12.5px',
  fontWeight: '500',
  padding: '7px 13px',
  borderRadius: '999px',
  border: `1px solid ${contract.color.line}`,
  color: contract.color.inkDim,
  background: contract.color.surfaceInset,
  transition: `border-color ${contract.motion.durFast} ease, color ${contract.motion.durFast} ease`,
  selectors: {
    '&:hover': {
      borderColor: contract.color.accent,
      color: contract.color.ink,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});
