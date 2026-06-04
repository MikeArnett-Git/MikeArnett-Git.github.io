# ADR-0002: Styling — vanilla-extract + oklch design tokens

**Status:** Proposed
**Date:** 2026-06-04

---

## Context

The site requires a design-token system that supports multiple distinct visual themes (four, currently) switchable at runtime without a page reload. Tokens must cover colour, typography, spacing, radius, and motion. The token system is also on display as part of the code-practices showcase.

Forces:
- Runtime theme switching via CSS custom properties.
- Type-safe token contract (no magic strings; autocomplete in editors).
- Build-time CSS generation (no runtime style injection cost).
- Perceptually-uniform, high-contrast colour palette.
- Preference: not Tailwind.

---

## Decision

Use **vanilla-extract** (`createThemeContract` + `createTheme`) with **oklch design tokens**.

`createThemeContract` defines the shape of the token set — colours, fonts, type scale, spacing, radius, motion — without values. Each of the four themes (`control-plane`, `editorial`, `kinetic`, `calm-console`) is a separate `createTheme` call that fills in all contract slots with theme-specific values. vanilla-extract emits a CSS custom-property class per theme at build time; switching themes at runtime is a class swap on `<html>`.

oklch is used for all colour tokens. It is the most perceptually uniform of the common CSS colour spaces: equal perceived lightness steps, no hue shift when adjusting chroma, and good support for accessible contrast enforcement across the full gamut.

---

## Consequences

- All CSS is emitted at build time — zero runtime style injection, no flash of unstyled content from the styling layer itself.
- The token contract is TypeScript-typed: accessing a token that does not exist in the contract is a compile error.
- Adding a new theme is strictly additive: one new `presets/*.css.ts` file, no changes to components.
- oklch palette construction is explicit — each colour is specified as lightness/chroma/hue, making contrast audits straightforward.
- Accent hue can be overridden at runtime by setting `--accent-hue` as a CSS custom property directly on `<html>`, without swapping the theme class. This is used by the control panel's accent-hue slider.
- vanilla-extract's `sprinkles` and `recipes` APIs are available for utility classes and component variants, used selectively.

---

## Alternatives considered

**Tailwind CSS:** Rejected on preference. Also, utility-class systems push design decisions into markup rather than into a typed token contract — less suitable for a system where token isolation is the architectural point being demonstrated.

**CSS Modules / plain CSS:** Less ergonomic for a multi-theme contract that must be type-safe. Magic string token names are a regression risk.

**CSS-in-JS (runtime):** Adds a runtime cost and defeats the "build-time CSS" goal. Not suitable for a site that prioritises minimal JS.
