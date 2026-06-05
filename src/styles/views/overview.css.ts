// Dashboard overview (app/index) — styles used exclusively by the overview view.
// Includes: 12-col grid, profile status chips, metric tiles, project list, exp widget.
import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../contract.css';

// ── 12-column overview grid ──────────────────────────────────────────────────

export const overviewGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: 'clamp(18px, 1.8vw, 24px)',
  gridAutoFlow: 'dense',
});

export const col12 = style({ gridColumn: 'span 12' });
export const col8 = style({ gridColumn: 'span 8' });
export const col7 = style({ gridColumn: 'span 7' });
export const col6 = style({ gridColumn: 'span 6' });
export const col5 = style({ gridColumn: 'span 5' });
export const col4 = style({ gridColumn: 'span 4' });

// ── Profile status chips ──────────────────────────────────────────────────────

export const statusRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

export const statusChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: contract.font.body,
  fontSize: '12.5px',
  fontWeight: '500',
  padding: '8px 13px',
  borderRadius: '999px',
  border: `1px solid ${contract.color.line}`,
  color: contract.color.inkDim,
});

export const statusChipLive = style({
  // border uses live token alpha tint — matches contract.color.live hue
  borderColor: `color-mix(in oklch, ${contract.color.live} 40%, transparent)`,
  color: contract.color.ink,
});

/** Small live-status dot used inline in statusChip */
export const liveDot = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: contract.color.live,
  display: 'inline-block',
  flexShrink: 0,
});

// ── Focus / currently widget (overview-only extras) ──────────────────────────

export const focusCard = style({});

export const focusFd = style({
  fontFamily: contract.font.body,
  fontSize: '12.5px',
  color: contract.color.inkFaint,
});

// ── Availability card (overview-only extras) ──────────────────────────────────

export const availCta = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '9px',
  minHeight: '46px',
  padding: '0 20px',
  borderRadius: contract.radius.md,
  background: contract.color.accent,
  color: 'oklch(18% 0.02 270)',
  fontWeight: '600',
  fontFamily: contract.font.body,
  fontSize: '14px',
  textDecoration: 'none',
  alignSelf: 'flex-start',
  transition: `background ${contract.motion.durFast} ease, transform ${contract.motion.durFast} ease`,
  selectors: {
    '&:hover': {
      background: contract.color.accentBright,
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      selectors: {
        '&:hover': {
          transform: 'translateY(-1px)',
        },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// ── Metric tiles ──────────────────────────────────────────────────────────────

export const metricsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(14px, 1.4vw, 20px)',
  '@media': {
    '(max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const metricItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
  padding: '20px',
  borderRadius: contract.radius.sm,
  background: contract.color.surfaceInset,
  border: `1px solid ${contract.color.hairline}`,
  position: 'relative',
  overflow: 'hidden',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '14px',
      bottom: '14px',
      width: '3px',
      borderRadius: '0 3px 3px 0',
      background: contract.color.accent,
      opacity: '0.55',
    },
  },
});

export const metricKey = style({
  fontFamily: contract.font.mono,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: contract.color.inkFaint,
  fontWeight: '600',
});

export const metricVal = style({
  fontFamily: contract.font.display,
  fontSize: 'clamp(21px, 2.4vw, 28px)',
  fontWeight: '700',
  color: contract.color.ink,
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
});

export const metricLab = style({
  fontFamily: contract.font.body,
  fontSize: '12.5px',
  color: contract.color.inkFaint,
  lineHeight: 1.5,
});

// ── Projects compact list ─────────────────────────────────────────────────────

export const projList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
});

export const projRow = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: '15px',
  padding: '14px 16px',
  minHeight: '56px',
  borderRadius: contract.radius.sm,
  background: contract.color.surfaceInset,
  border: `1px solid ${contract.color.hairline}`,
  textDecoration: 'none',
  color: 'inherit',
  transition: `border-color ${contract.motion.durBase} ease, background ${contract.motion.durBase} ease`,
  selectors: {
    '&:hover': {
      borderColor: contract.color.line,
      background: contract.color.surface,
    },
    '&:focus-visible': {
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      selectors: {
        '&:hover': {
          transform: 'translateX(2px)',
        },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const projIco = style({
  width: '38px',
  height: '38px',
  flexShrink: 0,
  borderRadius: '11px',
  display: 'grid',
  placeItems: 'center',
  color: contract.color.accentBright,
  background: `oklch(70% 0.15 var(--accent-hue, 265) / 0.14)`,
  border: `1px solid oklch(70% 0.15 var(--accent-hue, 265) / 0.30)`,
});

export const projMeta = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const projMetaPn = style({
  fontFamily: contract.font.display,
  fontWeight: '600',
  fontSize: '14.5px',
  color: contract.color.ink,
});

export const projMetaPd = style({
  fontFamily: contract.font.body,
  fontSize: '12.5px',
  color: contract.color.inkFaint,
  lineHeight: 1.4,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
});

export const projTag = style({
  fontFamily: contract.font.mono,
  fontSize: '10.5px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: contract.color.inkFaint,
  padding: '5px 10px',
  border: `1px solid ${contract.color.line}`,
  borderRadius: '999px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const projTagLive = style({
  fontFamily: contract.font.mono,
  fontSize: '10.5px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: contract.color.live,
  padding: '5px 10px',
  border: `1px solid color-mix(in oklch, ${contract.color.live} 40%, transparent)`,
  borderRadius: '999px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

// ── Featured experience widget ────────────────────────────────────────────────

export const featExpCard = style({
  transition: `border-color ${contract.motion.durBase} ease, transform ${contract.motion.durBase} ease`,
  selectors: {
    '&:hover': {
      borderColor: contract.color.line,
    },
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
});

export const expOrg = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  flexWrap: 'wrap',
});

export const expLogo = style({
  width: '46px',
  height: '46px',
  borderRadius: '13px',
  flexShrink: 0,
  display: 'grid',
  placeItems: 'center',
  background: contract.color.surfaceInset,
  border: `1px solid ${contract.color.line}`,
  fontFamily: contract.font.display,
  fontWeight: '700',
  fontSize: '17px',
  color: contract.color.accentBright,
});

export const expOrgMeta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
});

export const expOrgName = style({
  fontFamily: contract.font.display,
  fontWeight: '600',
  fontSize: '16.5px',
  color: contract.color.ink,
});

export const expOrgPos = style({
  fontFamily: contract.font.body,
  fontSize: '13px',
  color: contract.color.inkFaint,
});

export const expProblem = style({
  fontFamily: contract.font.body,
  fontSize: '13.5px',
  lineHeight: 1.6,
  color: contract.color.inkFaint,
  padding: '13px 16px',
  borderRadius: contract.radius.sm,
  background: contract.color.surfaceInset,
  borderLeft: `2px solid oklch(70% 0.15 var(--accent-hue, 265) / 0.30)`,
  margin: 0,
});
globalStyle(`${expProblem} strong`, {
  color: contract.color.inkDim,
  fontWeight: '600',
});

export const expResults = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
  '@media': {
    '(max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const expResult = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '13px 15px',
  borderRadius: contract.radius.sm,
  background: `oklch(70% 0.15 var(--accent-hue, 265) / 0.08)`,
  border: `1px solid oklch(70% 0.15 var(--accent-hue, 265) / 0.30)`,
});

export const expResultKey = style({
  fontFamily: contract.font.mono,
  fontSize: '10.5px',
  textTransform: 'uppercase',
  letterSpacing: '0.09em',
  color: contract.color.inkFaint,
  fontWeight: '600',
});

export const expResultVal = style({
  fontFamily: contract.font.mono,
  fontWeight: '600',
  fontSize: '15px',
  color: contract.color.ink,
});

export const expResultArrow = style({
  color: contract.color.accentBright,
});

export const expMethod = style({
  fontFamily: contract.font.body,
  fontSize: '13.5px',
  lineHeight: 1.65,
  color: contract.color.inkDim,
  margin: 0,
});
globalStyle(`${expMethod} strong`, {
  color: contract.color.ink,
  fontWeight: '600',
});
globalStyle(`${expMethod} code`, {
  fontFamily: contract.font.mono,
  fontSize: '12.5px',
  color: contract.color.accentBright,
  background: contract.color.surfaceInset,
  padding: '1px 6px',
  borderRadius: '5px',
});

// ── Responsive grid column collapse ──────────────────────────────────────────

// Tablet: 2-col rhythm
globalStyle(`${overviewGrid}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      gridTemplateColumns: 'repeat(12, 1fr)',
    },
  },
});

globalStyle(`${col8}, ${col7}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      gridColumn: 'span 12',
    },
  },
});

globalStyle(`${col6}, ${col4}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      gridColumn: 'span 6',
    },
  },
});

globalStyle(`${col5}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      gridColumn: 'span 12',
    },
  },
});

// Mobile: single column
globalStyle(`${overviewGrid}`, {
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${col12}, ${col8}, ${col7}, ${col6}, ${col5}, ${col4}`, {
  '@media': {
    '(max-width: 768px)': {
      gridColumn: 'span 1',
    },
  },
});

globalStyle(`${metricsGrid}`, {
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${expResults}`, {
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});
