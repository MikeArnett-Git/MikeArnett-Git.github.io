import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../styles/contract.css';

export const footer = style({
  borderTop: `1px solid ${contract.color.hairline}`,
  marginTop: 'clamp(3rem, 7vw, 5rem)',
  paddingBlock: 'clamp(2.5rem, 6vw, 3.5rem)',
  position: 'relative',
  zIndex: 1,
});

export const footWrap = style({
  maxWidth: '1180px',
  marginInline: 'auto',
  paddingInline: 'clamp(1.25rem, 4vw, 4rem)',
});

// Editorial LAYOUT: footer shares the wider 1320px editorial shell + gutter so
// it aligns to the same measure as the nav, hero, and sections.
globalStyle(`[data-layout="editorial"] .${footWrap}`, {
  maxWidth: '1320px',
  paddingInline: 'clamp(1.25rem, 5vw, 6rem)',
});

export const footGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem 3rem',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const footBlock = style({});

export const footKey = style({
  fontFamily: contract.font.mono,
  fontSize: contract.type.eyebrow,
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: contract.color.accent,
  marginBottom: '0.6rem',
  display: 'block',
});

export const footKeyDim = style({
  color: contract.color.inkFaint,
});

export const footBig = style({
  fontFamily: contract.font.display,
  fontWeight: 600,
  fontSize: '1.4rem',
  letterSpacing: '-0.01em',
  color: contract.color.ink,
});

export const footDesc = style({
  color: contract.color.inkDim,
  maxWidth: '46ch',
  margin: '0.6rem 0 1rem',
  fontSize: '0.95rem',
});

export const contactLink = style({
  fontFamily: contract.font.mono,
  fontSize: '0.9rem',
  color: contract.color.accentBright,
  borderBottom: `1px solid ${contract.color.borderHover}`,
  paddingBottom: '2px',
  ':hover': {
    color: contract.color.accent,
  },
});

export const footLinks = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.55rem',
});

export const footLink = style({
  fontFamily: contract.font.mono,
  fontSize: '0.84rem',
  color: contract.color.inkDim,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: 'fit-content',
  '::before': {
    content: '"→"',
    color: contract.color.accent,
  },
  ':hover': {
    color: contract.color.ink,
  },
});

export const footBase = style({
  marginTop: '2.5rem',
  paddingTop: '1.4rem',
  borderTop: `1px solid ${contract.color.hairline}`,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem 1.5rem',
  justifyContent: 'space-between',
  fontFamily: contract.font.mono,
  fontSize: '0.72rem',
  color: contract.color.inkFaint,
  letterSpacing: '0.04em',
});

export const liveTag = style({
  color: contract.color.live,
});
