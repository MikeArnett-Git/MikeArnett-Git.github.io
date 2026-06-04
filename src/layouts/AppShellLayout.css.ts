/**
 * AppShellLayout styles — vanilla-extract.
 * Token-driven (contract refs) so all 4 themes render correctly (D17/D14).
 * Responsive: sidebar → icon-rail (tablet 769–1080) → drawer (≤768).
 */

import { style, globalStyle, keyframes } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';

// ── Shell layout ────────────────────────────────────────────────────────────

export const shellApp = style({
  display: 'grid',
  gridTemplateColumns: '252px 1fr',
  minHeight: '100vh',
});

// ── Sidebar ─────────────────────────────────────────────────────────────────

export const shellSidebar = style({
  gridColumn: '1',
  background: contract.color.surface,
  borderRight: `1px solid ${contract.color.hairline}`,
  padding: '26px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
  position: 'sticky',
  top: 0,
  height: '100vh',
  overflowY: 'auto',
  zIndex: 50,
});

export const shellBrand = style({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  padding: '4px 8px 2px',
});

export const shellBrandMark = style({
  width: '38px',
  height: '38px',
  borderRadius: '11px',
  flexShrink: 0,
  display: 'grid',
  placeItems: 'center',
  background: `linear-gradient(155deg, ${contract.color.accent} 0%, ${contract.color.accentDeep} 100%)`,
  color: contract.color.surfaceInset,
  fontFamily: contract.font.display,
  fontWeight: '700',
  fontSize: '16px',
  boxShadow: `0 4px 14px ${contract.color.shadow}`,
});

export const shellBrandMeta = style({
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1.25,
  minWidth: 0,
});

export const shellBrandName = style({
  fontFamily: contract.font.display,
  fontWeight: '600',
  fontSize: '15px',
  letterSpacing: '-0.01em',
  color: contract.color.ink,
});

export const shellBrandSub = style({
  fontSize: '11.5px',
  color: contract.color.inkFaint,
  whiteSpace: 'nowrap',
});

export const shellNavGroupLabel = style({
  fontSize: '10.5px',
  textTransform: 'uppercase',
  letterSpacing: '0.13em',
  color: contract.color.inkFaint,
  padding: '0 12px',
  marginBottom: '8px',
  fontWeight: '600',
});

export const shellNav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const shellNavItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  padding: '11px 13px',
  borderRadius: contract.radius.md,
  color: contract.color.inkDim,
  fontSize: '14.5px',
  fontWeight: '500',
  minHeight: '44px',
  textDecoration: 'none',
  transition: `background ${contract.motion.durFast} ease, color ${contract.motion.durFast} ease`,
  position: 'relative',
  selectors: {
    '&:hover': {
      background: contract.color.surfaceRaised,
      color: contract.color.ink,
    },
    '&[aria-current="page"]': {
      background: contract.color.surfaceInset,
      color: contract.color.ink,
    },
    '&[aria-current="page"]::before': {
      content: '""',
      position: 'absolute',
      left: '-16px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '3px',
      height: '22px',
      borderRadius: '0 3px 3px 0',
      background: contract.color.accent,
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

export const shellNavItemIcon = style({
  width: '19px',
  height: '19px',
  flexShrink: 0,
  opacity: 0.82,
  selectors: {
    [`${shellNavItem}[aria-current="page"] &`]: {
      opacity: 1,
      color: contract.color.accentBright,
    },
  },
});

export const shellNavItemLabel = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const shellSidebarFoot = style({
  marginTop: 'auto',
  padding: '14px 12px 4px',
  borderTop: `1px solid ${contract.color.hairline}`,
});

export const shellAvailPill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '12.5px',
  color: contract.color.inkDim,
  fontWeight: '500',
});

export const shellDot = style({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: contract.color.live,
  flexShrink: 0,
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animationName: keyframes({
        '0%':   { boxShadow: `0 0 0 0   ${contract.color.live}` },
        '70%':  { boxShadow: '0 0 0 7px transparent'             },
        '100%': { boxShadow: '0 0 0 0   transparent'             },
      }),
      animationDuration: '2.6s',
      animationTimingFunction: 'ease-out',
      animationIterationCount: 'infinite',
    },
  },
});

// ── Main column ─────────────────────────────────────────────────────────────

export const shellMain = style({
  gridColumn: '2',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
});

// ── Top bar ─────────────────────────────────────────────────────────────────

export const shellTopbar = style({
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '0 clamp(20px, 2.4vw, 34px)',
  borderBottom: `1px solid ${contract.color.hairline}`,
  background: contract.color.bg,
  position: 'sticky',
  top: 0,
  zIndex: 40,
});

export const shellHamburger = style({
  display: 'none',
  width: '44px',
  height: '44px',
  borderRadius: contract.radius.sm,
  placeItems: 'center',
  border: `1px solid ${contract.color.line}`,
  color: contract.color.inkDim,
  background: 'transparent',
  cursor: 'pointer',
  font: 'inherit',
  transition: `background ${contract.motion.durFast}, color ${contract.motion.durFast}`,
  selectors: {
    '&:hover': {
      background: contract.color.surface,
      color: contract.color.ink,
    },
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

export const shellTopbarTitle = style({
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1.2,
  minWidth: 0,
});

export const shellTopbarEyebrow = style({
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: contract.color.inkFaint,
  fontWeight: '600',
});

export const shellTopbarH = style({
  fontFamily: contract.font.display,
  fontSize: '18px',
  fontWeight: '600',
  color: contract.color.ink,
});

export const shellTopbarSpacer = style({
  flex: 1,
});

export const shellCmdk = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  width: 'min(360px, 38vw)',
  minHeight: '44px',
  padding: '0 14px',
  borderRadius: '12px',
  border: `1px solid ${contract.color.line}`,
  background: contract.color.surface,
  color: contract.color.inkFaint,
  fontSize: '14px',
  cursor: 'pointer',
  font: 'inherit',
  transition: `border-color ${contract.motion.durFast} ease, background ${contract.motion.durFast} ease`,
  textAlign: 'left',
  selectors: {
    '&:hover': {
      borderColor: contract.color.accent,
      background: contract.color.surfaceRaised,
    },
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

export const shellCmdkTxt = style({
  flex: 1,
  textAlign: 'left',
});

export const shellKbd = style({
  fontFamily: contract.font.mono,
  fontSize: '11px',
  color: contract.color.inkDim,
  border: `1px solid ${contract.color.line}`,
  background: contract.color.bg,
  borderRadius: '6px',
  padding: '3px 6px',
  lineHeight: 1,
});

export const shellTopbarGh = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  borderRadius: contract.radius.sm,
  border: `1px solid ${contract.color.line}`,
  color: contract.color.inkDim,
  textDecoration: 'none',
  transition: `border-color ${contract.motion.durFast} ease, background ${contract.motion.durFast} ease, color ${contract.motion.durFast} ease`,
  selectors: {
    '&:hover': {
      background: contract.color.surface,
      color: contract.color.ink,
      borderColor: contract.color.accent,
    },
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

// ── Content area ─────────────────────────────────────────────────────────────

export const shellContent = style({
  padding: 'clamp(20px, 2.4vw, 34px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(28px, 3.4vw, 46px)',
  maxWidth: '1520px',
  width: '100%',
});

// ── Scrim ────────────────────────────────────────────────────────────────────

export const shellScrim = style({
  position: 'fixed',
  inset: 0,
  zIndex: 49,
  background: contract.color.overlay,
  display: 'none',
  cursor: 'pointer',
});

// ── Command palette ──────────────────────────────────────────────────────────

const palettePopIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-8px) scale(.98)' },
  to:   { opacity: 1, transform: 'none' },
});

export const shellPaletteOverlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  background: contract.color.overlay,
  backdropFilter: 'blur(3px)',
  display: 'none',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: 'clamp(60px, 12vh, 140px) 20px 20px',
});

export const shellPalette = style({
  width: 'min(560px, 100%)',
  background: contract.color.surfaceRaised,
  border: `1px solid ${contract.color.line}`,
  borderRadius: contract.radius.lg,
  boxShadow: `0 1px 2px ${contract.color.shadow}, 0 8px 30px ${contract.color.shadow}`,
  overflow: 'hidden',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animationName: palettePopIn,
      animationDuration: '180ms',
      animationTimingFunction: 'cubic-bezier(.2,.7,.2,1)',
    },
  },
});

export const shellPaletteInputWrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '18px 20px',
  borderBottom: `1px solid ${contract.color.hairline}`,
});

export const shellPaletteInput = style({
  flex: 1,
  background: 'none',
  border: 'none',
  color: contract.color.ink,
  font: 'inherit',
  fontSize: '15px',
  outline: 'none',
  minWidth: 0,
  selectors: {
    '&::placeholder': {
      color: contract.color.inkFaint,
    },
  },
});

export const shellPaletteEsc = style({
  fontFamily: contract.font.mono,
  fontSize: '11px',
  color: contract.color.inkDim,
  border: `1px solid ${contract.color.line}`,
  borderRadius: '6px',
  padding: '3px 7px',
  flexShrink: 0,
});

export const shellPaletteSection = style({
  padding: '10px 12px',
});

export const shellPaletteSectionLabel = style({
  fontSize: '10.5px',
  textTransform: 'uppercase',
  letterSpacing: '0.11em',
  color: contract.color.inkFaint,
  padding: '6px 10px',
  fontWeight: '600',
});

export const shellPaletteItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  width: '100%',
  textAlign: 'left',
  padding: '11px 12px',
  borderRadius: contract.radius.sm,
  color: contract.color.inkDim,
  fontSize: '14px',
  minHeight: '44px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  font: 'inherit',
  selectors: {
    '&:hover': {
      background: contract.color.surfaceInset,
      color: contract.color.ink,
    },
    '&:focus-visible': {
      background: contract.color.surfaceInset,
      color: contract.color.ink,
      outline: `2px solid ${contract.color.accentBright}`,
      outlineOffset: '-2px',
    },
  },
});

export const shellPiShortcut = style({
  marginLeft: 'auto',
  fontFamily: contract.font.mono,
  fontSize: '11px',
  color: contract.color.inkFaint,
});

// ── Skip link ────────────────────────────────────────────────────────────────

export const skipLink = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%) translateY(-150%)',
  top: '8px',
  zIndex: 200,
  background: contract.color.accent,
  color: 'oklch(16% 0.02 260)',
  fontFamily: contract.font.mono,
  fontSize: '0.8rem',
  fontWeight: '600',
  padding: '0.6rem 1rem',
  borderRadius: '4px',
  transition: `transform 220ms ${contract.motion.easing}`,
  textDecoration: 'none',
  selectors: {
    '&:focus': {
      transform: 'translateX(-50%) translateY(0)',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// ── Responsive ───────────────────────────────────────────────────────────────

// Ultrawide: wider rail
globalStyle(`${shellApp}`, {
  '@media': {
    '(min-width: 1700px)': {
      gridTemplateColumns: '280px 1fr',
    },
  },
});

// Tablet: icon rail (76px)
globalStyle(`${shellApp}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      gridTemplateColumns: '76px 1fr',
    },
  },
});

globalStyle(`${shellSidebar}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      padding: '26px 12px',
      alignItems: 'center',
    },
  },
});

globalStyle(`${shellBrand}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      justifyContent: 'center',
      padding: '4px 0 2px',
    },
  },
});

globalStyle(`${shellNavItem}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      justifyContent: 'center',
      padding: '11px 0',
      gap: '0',
    },
  },
});

globalStyle(`${shellSidebarFoot}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      width: '100%',
      display: 'grid',
      placeItems: 'center',
    },
  },
});

globalStyle(`${shellAvailPill}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      gap: '0',
    },
  },
});

// Brand meta + nav labels hidden in icon-rail mode
globalStyle(`${shellBrandMeta}, ${shellNavGroupLabel}, ${shellNavItemLabel}`, {
  '@media': {
    '(max-width: 1080px) and (min-width: 769px)': {
      display: 'none',
    },
  },
});

// Mobile: drawer (≤768)
globalStyle(`${shellApp}`, {
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${shellSidebar}`, {
  '@media': {
    '(max-width: 768px)': {
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 60,
      width: 'min(290px, 84vw)',
      height: '100dvh',
      transform: 'translateX(-104%)',
      transition: 'transform 260ms cubic-bezier(.2,.7,.2,1)',
      boxShadow: `0 1px 2px ${contract.color.shadow}, 0 8px 30px ${contract.color.shadow}`,
    },
  },
});

globalStyle(`${shellMain}`, {
  '@media': {
    '(max-width: 768px)': {
      gridColumn: '1',
    },
  },
});

globalStyle(`${shellHamburger}`, {
  '@media': {
    '(max-width: 768px)': {
      display: 'grid',
    },
  },
});

globalStyle(`${shellCmdk}`, {
  '@media': {
    '(max-width: 768px)': {
      width: '44px',
      padding: '0',
      justifyContent: 'center',
    },
  },
});

globalStyle(`${shellCmdkTxt}`, {
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
});

globalStyle(`${shellTopbarEyebrow}`, {
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
  },
});

// xs
globalStyle(`${shellTopbar}`, {
  '@media': {
    '(max-width: 480px)': {
      height: '64px',
    },
  },
});

globalStyle(`${shellContent}`, {
  '@media': {
    '(max-width: 480px)': {
      padding: '18px 16px',
    },
  },
});
