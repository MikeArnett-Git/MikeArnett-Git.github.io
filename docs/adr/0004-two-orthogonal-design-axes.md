# ADR-0004: Two orthogonal design axes — Theme ⊥ Layout

**Status:** Proposed
**Date:** 2026-06-04

---

## Context

The site showcases four distinct visual directions explored during design (Control Plane, Editorial, Kinetic, Calm Console) and two structural paradigms (scrolling single-page vs navigated app-shell). An earlier framing treated "preset" as a single bundled concept covering both styling and structure. This is insufficient for a system that wants to demonstrate genuine separation of concerns.

A key architectural goal is to make the design-switcher a *demonstration* of the modular/flexible theming work done in production (Cloudhouse in-app theming/layout-switching). That requires the axes to be cleanly separable, not a monolithic preset blob.

---

## Decision

Split the design-switching system into **two fully independent axes**:

**Theme** (styling axis): colours, fonts, type scale, accent hue, background treatment (grid dots / paper texture / blobs / gradients), border style, shadow treatment, radius. Implemented as vanilla-extract `createTheme` token classes applied to `<html>`.

**Layout** (structure axis): DOM arrangement and composition — hero layout, grid columns, section-heading structure, which blocks appear and where, nav style, and whether the page renders as a scrolling single page or a navigated app-shell. Implemented as `data-layout` on `<html>` driving CSS `[data-layout="..."]` selectors; the Dashboard layout additionally switches the Astro layout shell.

The typed store holds both independently:
```ts
interface ThemeState {
  theme:  'control-plane' | 'editorial' | 'kinetic' | 'calm-console';
  layout: 'control-plane' | 'editorial' | 'kinetic' | 'dashboard';
  // ... mode, accent, motion, density
}
```

Changing `theme` must not affect `layout`, and vice versa. The control panel exposes a Theme selector, a Layout selector, and a "whole design" shortcut row (A/B/C/D3) that snaps both axes in one action.

This yields 4 × 4 = 16 valid combinations. Some combinations are unusual (e.g. kinetic theme + dashboard layout) but all are functional — the flexibility on display is the point.

---

## Consequences

- The single-`preset` framing is superseded. Store keys renamed from `preset`/`layoutMode` to `theme`/`layout`.
- `applyTheme()` sets `data-theme` and `data-layout` independently — touching one must not alter the other.
- The pre-paint inline script reads both keys from `localStorage` and applies both attributes before the first paint.
- Each theme is a complete `createTheme` covering the full contract — theming is not partial.
- Layout CSS uses `[data-layout="..."]` attribute selectors on `html` and descendants; no per-layout component forks.
- All four themes render correctly on the Dashboard layout (AppShellLayout carries `data-theme`; the 4 × 4 holds).
- Future direction (out of scope now): a per-element visual editor could extend the controller→consumer model down one more level — widgets config-driven, editor mutates config. The two-axis architecture does not preclude this; components built config/data-driven stay compatible.

---

## Alternatives considered

**Single bundled preset (one concept covering both styling + structure):** Simpler to implement initially. Rejected because it conflates two orthogonal concerns and prevents demonstrating genuine SoC. A "preset" that bakes in both palette and layout is not a reusable or composable abstraction.

**Layout as a binary page ↔ app-shell toggle:** The earlier framing (D15). Replaced by the four-way layout axis because the three page-layout variants are structurally distinct (not merely different tokens) and the same clean two-axis model covers both the page-layout variants and the app-shell.
