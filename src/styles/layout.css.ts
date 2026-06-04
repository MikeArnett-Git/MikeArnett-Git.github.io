/**
 * Shared layout utilities — single source of truth for the centered max-width
 * container used across Hero, Section, and similar full-bleed components (D14).
 */
import { style } from '@vanilla-extract/css';

/** Standard centered content container: 1180px max, responsive side padding. */
export const wrap = style({
  maxWidth: '1180px',
  marginInline: 'auto',
  paddingInline: 'clamp(1.25rem, 4vw, 4rem)',
  position: 'relative',
  zIndex: 1,
});
