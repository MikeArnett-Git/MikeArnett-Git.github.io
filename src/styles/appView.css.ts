/**
 * appView.css.ts — shared view-level styles for the 5 /app/* views.
 * Imports the token contract; no hardcoded colours.
 *
 * The .reveal animation keyframe and .mono class are declared in a single
 * shared <style is:global> block in the first view that imports this module,
 * following the Overview's established pattern (D14). This file owns the
 * structural layout tokens only.
 */
import { style } from '@vanilla-extract/css';
import { contract } from './contract.css';

/** Vertical flex stack — the root container for every /app view's content. */
export const viewStack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(20px, 2vw, 28px)',
});

/** Lead / intro paragraph beneath a view heading. */
export const viewIntro = style({
  fontFamily: contract.font.body,
  fontSize: 'clamp(15px, 1.5vw, 16.5px)',
  lineHeight: 1.72,
  color: contract.color.inkDim,
  margin: 0,
  maxWidth: '72ch',
});

/** Shared h1 / view heading style. */
export const viewH1 = style({
  fontFamily: contract.font.display,
  fontSize: 'clamp(22px, 3vw, 30px)',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: contract.color.ink,
  margin: 0,
});

/** Section sub-heading inside a view (h2 inside a card, etc.). */
export const viewH2 = style({
  fontFamily: contract.font.display,
  fontSize: '15px',
  fontWeight: 600,
  color: contract.color.ink,
  margin: 0,
  letterSpacing: '-0.01em',
});
