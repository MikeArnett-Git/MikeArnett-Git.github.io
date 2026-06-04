# ADR-0007: Accessibility, motion, and performance baseline

**Status:** Proposed
**Date:** 2026-06-04

---

## Context

A portfolio site presented to engineering teams must hold the same quality bar it asserts. Accessibility, motion restraint, and performance are not polish phases — they are architectural constraints that affect component design, token values, and the theming system.

The site also presents this baseline as a credential in the code-practices showcase. Decisions made here must be demonstrable (measurable targets, real implementation) not merely asserted.

---

## Decision

**Accessibility:**
- Skip navigation link in `BaseLayout` (keyboard users can bypass the nav).
- Semantic HTML throughout: landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`), correct heading hierarchy (one `<h1>` per page), `<button>` for interactive controls, `<a>` for navigation.
- All interactive elements reachable and operable via keyboard.
- WCAG AA contrast targets: ≥ 4.5:1 for body text; ≥ 3:1 for large text and UI components. Enforced through oklch token construction — contrast is calculated in the perceptually-uniform oklch space at token-authoring time.
- Every theme (all four) must meet contrast targets independently. The accent-hue slider in the control panel intentionally allows values that reduce contrast; this is a demo control, documented as such.

**Motion:**
- All animations are gated on `[data-motion="ok"]`. This attribute is set by `applyTheme()` based on the combination of the `motion` field in `ThemeState` and `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- `prefers-reduced-motion: reduce` always wins — if the OS/browser reports reduced-motion preference, `data-motion` is set to `reduce` regardless of the control panel setting.
- Animations are CSS-only where possible (no JS animation loops); View Transitions use CSS animation.
- Motion default: follows `prefers-reduced-motion` on first visit; user can override via the control panel (persisted).

**Responsiveness:**
- Every theme × layout combination must be fully responsive: fluid across viewport widths from 360 px (narrow mobile) through 768 px, 1024 px, 1440 px, and ultrawide.
- Dashboard sidebar: collapses to an icon rail at narrow widths; a drawer or bottom-nav at mobile widths.
- Widget grids reflow at breakpoints.
- No fixed-width breakage at any viewport tested.

**Performance:**
- Astro static output with island architecture: zero JS by default on static content.
- Target: resume page JS bundle < 50 KB (measured at build time).
- The pre-paint theme script is inline vanilla JS — no framework, no imports, minimal bytes.
- Verification: Lighthouse scores measured before deploy; targets are Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.

---

## Consequences

- Token authoring must include contrast checking — token values cannot be chosen purely for aesthetic reasons.
- Every new animated element added to the codebase must be wrapped in a `[data-motion="ok"]` selector. This is a code-review gate.
- Responsive layout must be considered during component implementation, not retrofitted. The full 4 × 4 matrix must be tested at all representative breakpoints before marking the build complete.
- The JS budget target (< 50 KB resume page) constrains future island additions. Islands must be justified by genuine user value.

---

## Alternatives considered

**Motion as opt-in (disabled by default, user enables):** More conservative default. Rejected because the site's design identity includes deliberate motion (View Transitions, scroll-driven effects, hover states); the default experience should include it for users with no reduced-motion preference. The `prefers-reduced-motion` media query handles the accessibility requirement automatically.

**Deferred accessibility (polish phase only):** Rejected. Retrofitting semantic HTML, contrast, and keyboard navigation into a built component set is significantly more expensive than building it in. Accessibility is a component-design constraint, not a coating applied at the end.
