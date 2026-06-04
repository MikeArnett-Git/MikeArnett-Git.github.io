/** Token contract for the 4-theme × 4-layout design system (D5/D17). */
import { createThemeContract } from '@vanilla-extract/css';

export const contract = createThemeContract({
  color: {
    bg: null,
    surface: null,
    surfaceRaised: null,
    surfaceInset: null,
    ink: null,
    inkDim: null,
    inkFaint: null,
    accent: null,
    accentBright: null,
    accentDeep: null,
    live: null,
    overlay: null,
    shadow: null,
    line: null,
    hairline: null,
  },
  font: {
    display: null,
    body: null,
    mono: null,
  },
  type: {
    display: null,
    h1: null,
    h2: null,
    h3: null,
    body: null,
    small: null,
    eyebrow: null,
  },
  space: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '6': null,
    '8': null,
    '12': null,
    '16': null,
    '24': null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
  },
  motion: {
    durFast: null,
    durBase: null,
    durSlow: null,
    easing: null,
  },
});
