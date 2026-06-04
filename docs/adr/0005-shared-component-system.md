# ADR-0005: One shared component system — designs are token/variant layers, never forks

**Status:** Proposed
**Date:** 2026-06-04

---

## Context

With four themes and four layouts (16 combinations), there is a natural pressure to produce per-design component variants. Each design direction has a distinct visual character; it is tempting to fork `Hero.astro` into `HeroEditorial.astro`, `HeroKinetic.astro`, and so on. This path leads to maintenance debt at N × M scale and undermines the architectural claim of modularity.

The site's code-practices showcase explicitly presents encapsulation, separation of concerns, and composable abstractions as first-class credentials. The component system must demonstrate these, not contradict them.

---

## Decision

All designs compose the **same** primitive and feature components. Design differences live **only** in:
1. Token files (`src/styles/presets/*.css.ts`) — colour, font, type scale, radius, spacing, motion values.
2. CSS `[data-theme="..."]` and `[data-layout="..."]` attribute selectors — component-level style variants scoped to a theme or layout without touching component code.
3. Which layout shell (`BaseLayout` / `AppShellLayout`) composes the feature components.

**No component is duplicated or branched per design.**

Component layers:

| Layer | Path | Responsibility |
|---|---|---|
| Tokens | `src/styles/contract.css.ts` + `presets/` | Values only; no component knowledge |
| Primitives | `src/components/primitives/` | Dumb, token-styled atoms; minimal variant props |
| Feature components | `src/components/` | Compose primitives; own content structure |
| Layout shells | `src/layouts/` | Arrange feature components; own routing context |
| Widgets | `src/components/widgets/` | Dashboard-only; data-driven; token-styled |

**Primitive extraction rule (pragmatic, not over-abstracted):** extract a component into primitives only on its second use. No abstraction without a real second use-case. Props should be minimal; composition over prop explosion.

**Verification:** code review of any pull request must confirm no per-design component duplication. The test for compliance: adding a new theme = one new `presets/*.css.ts` file, zero component changes.

---

## Consequences

- A theme change requires only a token file — feature components are unmodified.
- A new structural variant requires only CSS selector additions — no component forks.
- The same `ExperienceEntry`, `ProjectCard`, and other feature components render across all 16 combinations.
- Design-specific style differences (e.g. the kinetic layout's oversized type, the editorial layout's ruled-line section headings) are expressed as `[data-layout="kinetic"] .hero-title { … }` selector overrides in the relevant component's `.css.ts` file — scoped but not forked.
- This architecture is directly analogous to the Cloudhouse in-app theming work and is presented as such in the meta case study.
- Risk: over-abstraction — mitigated by the "extract on second use" guardrail. Premature generalisation produces complex, hard-to-read components; the rule keeps components readable.

---

## Alternatives considered

**Per-design component variants (e.g. `HeroEditorial.astro`, `HeroKinetic.astro`):** Produces a maintainable 1:1 mapping between design and component at small N. Breaks down at 4 themes × 4 layouts = 16 combinations. Content and behaviour changes must be replicated across all forks. Rejected.

**CSS-only per-design stylesheets loaded/unloaded on switch:** Possible but makes the token contract implicit (no type-safe contract) and couples stylesheet loading logic to the switching mechanism. More fragile than the vanilla-extract class-swap approach.
