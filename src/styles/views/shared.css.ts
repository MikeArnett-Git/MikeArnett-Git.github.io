// Shared widget primitives used by 2+ app views (overview, about, resume, practices).
// Token-driven via contract; zero per-view overrides live here.
import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../contract.css';

// ── Widget card base ─────────────────────────────────────────────────────────

export const widgetCard = style({
  background: contract.color.surface,
  border: `1px solid ${contract.color.hairline}`,
  borderRadius: contract.radius.lg,
  padding: 'clamp(22px, 2.2vw, 30px)',
  boxShadow: `0 1px 2px ${contract.color.shadow}`,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  transition: `border-color ${contract.motion.durBase} ${contract.motion.easing}`,
  selectors: {
    '&:hover': {
      borderColor: contract.color.line,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// ── Profile card ─────────────────────────────────────────────────────────────

export const profileCard = style({
  background: `radial-gradient(120% 120% at 100% 0%, oklch(70% 0.15 var(--accent-hue, 265) / 0.14) 0%, transparent 55%), ${contract.color.surface}`,
});

export const profileTop = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
});

export const profileAvatar = style({
  width: '64px',
  height: '64px',
  borderRadius: '18px',
  flexShrink: 0,
  display: 'grid',
  placeItems: 'center',
  background: `linear-gradient(155deg, ${contract.color.accent} 0%, ${contract.color.accentDeep} 100%)`,
  color: contract.color.surfaceInset,
  fontFamily: contract.font.display,
  fontWeight: '700',
  fontSize: '24px',
  boxShadow: `0 6px 20px ${contract.color.shadow}`,
});

export const profileId = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  minWidth: 0,
});

export const profileH1 = style({
  fontFamily: contract.font.display,
  fontSize: 'clamp(24px, 3vw, 31px)',
  fontWeight: '600',
  letterSpacing: '-0.01em',
  margin: 0,
  color: contract.color.ink,
});

export const profileRole = style({
  fontFamily: contract.font.body,
  fontSize: '15px',
  color: contract.color.accentBright,
  fontWeight: '500',
});

export const profileLoc = style({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  flexWrap: 'wrap',
  fontFamily: contract.font.body,
  fontSize: '13.5px',
  color: contract.color.inkFaint,
});

// ── Widget heading ────────────────────────────────────────────────────────────

export const widgetHead = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '0',
  flexWrap: 'wrap',
});

export const widgetH2 = style({
  fontFamily: contract.font.display,
  fontSize: '16px',
  fontWeight: '600',
  color: contract.color.ink,
  margin: 0,
  letterSpacing: '-0.01em',
});

export const widgetHint = style({
  fontFamily: contract.font.body,
  fontSize: '12.5px',
  color: contract.color.inkFaint,
});

export const viewAll = style({
  marginLeft: 'auto',
  fontFamily: contract.font.body,
  fontSize: '13px',
  color: contract.color.accentBright,
  fontWeight: '500',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 4px',
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

// ── Summary ───────────────────────────────────────────────────────────────────

export const summaryText = style({
  fontFamily: contract.font.body,
  fontSize: 'clamp(15px, 1.5vw, 16.5px)',
  lineHeight: 1.72,
  color: contract.color.inkDim,
  margin: 0,
});
globalStyle(`${summaryText} strong`, {
  color: contract.color.ink,
  fontWeight: '600',
});

// ── Focus / currently items (shared: overview + about + practices) ────────────

export const focusItem = style({
  display: 'flex',
  gap: '13px',
  alignItems: 'flex-start',
  paddingTop: '11px',
  borderTop: `1px solid ${contract.color.hairline}`,
  selectors: {
    '&:first-of-type': {
      borderTop: 'none',
      paddingTop: '0',
    },
  },
});

export const focusBullet = style({
  width: '30px',
  height: '30px',
  borderRadius: '9px',
  flexShrink: 0,
  display: 'grid',
  placeItems: 'center',
  color: contract.color.accentBright,
  background: `oklch(70% 0.15 var(--accent-hue, 265) / 0.14)`,
  marginTop: '1px',
});

export const focusText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
  minWidth: 0,
});

export const focusFt = style({
  fontFamily: contract.font.body,
  fontSize: '13.5px',
  fontWeight: '600',
  color: contract.color.ink,
});

// ── Availability (shared: overview + about) ───────────────────────────────────

export const availCard = style({
  background: `radial-gradient(130% 110% at 0% 100%, color-mix(in oklch, ${contract.color.live} 16%, transparent) 0%, transparent 60%), ${contract.color.surface}`,
});

export const availHead = style({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
});

/** Text/icon coloured with the live token (e.g. checkmark icons in avail list) */
export const liveColor = style({
  color: contract.color.live,
});

/** Larger live dot used in the availHead row */
export const liveDotLg = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: contract.color.live,
  display: 'inline-block',
  flexShrink: 0,
});

export const availList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
});
globalStyle(`${availList} li`, {
  fontFamily: contract.font.body,
  fontSize: '13.5px',
  color: contract.color.inkDim,
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
  lineHeight: 1.5,
});

// ── expYear (shared: overview + resume) ──────────────────────────────────────

export const expYear = style({
  marginLeft: 'auto',
  fontFamily: contract.font.mono,
  fontSize: '12.5px',
  color: contract.color.inkFaint,
  flexShrink: 0,
});
