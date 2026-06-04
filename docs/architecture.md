# Architecture — mikearnett-git.github.io

This document describes the system design of the portfolio site. Because the site is itself a code-practices showcase, architecture decisions are first-class — each significant choice is recorded in [`docs/adr/`](adr/).

---

## Two orthogonal design axes

The headline engineering feature is a live design switcher with two fully independent axes:

```
Theme  (styling)   ×   Layout  (structure)   =   16 valid combinations
──────────────────     ───────────────────
control-plane          control-plane
editorial              editorial
kinetic                kinetic
calm-console           dashboard (app-shell)
```

**Theme** covers everything visual: colour palette, font selection, type scale, accent hue, background treatment (grid dots / paper texture / gradient blobs), border style, shadows, and radius.

**Layout** covers everything structural: DOM arrangement and composition — hero layout (centred vs off-centre vs oversized), grid columns, section-heading structure, which blocks appear and where, nav style, and whether the page renders as a scrolling single page or a navigated app-shell.

The two axes are kept strictly independent (see [ADR-0004](adr/0004-two-orthogonal-design-axes.md)). Changing a theme must not alter structure; changing a layout must not alter colours. This is the purest expression of separation-of-concerns the system demonstrates.

---

## Controller → consumer model

```
                    ┌──────────────────────────────────┐
                    │  src/lib/theme.ts                │
                    │  ThemeState (typed)               │
                    │  themeStore (persistent)          │
                    │  applyTheme()  applyDesign()      │
                    └────────────┬─────────────────────┘
                                 │ single source of truth
              ┌──────────────────┼──────────────────────┐
              ▼                  ▼                       ▼
  BaseLayout (pre-paint    ControlPanel.tsx        AppShellLayout
  inline script)           React island            (carries data-theme)
  applies data-theme,      consumer only;          consumer only
  data-layout on <html>    writes store +
  — no FOUC                calls applyTheme()
```

`src/lib/theme.ts` owns the full `ThemeState`:

```ts
interface ThemeState {
  theme:     'control-plane' | 'editorial' | 'kinetic' | 'calm-console';
  layout:    'control-plane' | 'editorial' | 'kinetic' | 'dashboard';
  mode:      'dark' | 'light';
  accentHue: number;   // oklch hue, 0–360
  fontSet:   string;
  motion:    boolean;
  density:   'comfortable' | 'compact';
}
```

It exposes `applyTheme(state)` (sets `data-*` attributes + CSS custom property overrides on `<html>`) and `applyDesign(name)` (snaps both axes to a named whole-design shortcut). All components are pure consumers of this state — none reads from the DOM directly.

**No FOUC.** `BaseLayout.astro` includes a tiny inline `<script>` (no imports, no framework) that runs synchronously before CSS renders. It reads `localStorage` and applies `data-theme` / `data-layout` / `data-mode` / `data-motion` to `<html>` immediately — the correct token class and structural selectors are in place before the first paint.

**Persistence.** State is serialised per-key to `localStorage` under the `mikearnett.theme:` prefix via `@nanostores/persistent`. Each field round-trips as a string; `parseThemeState()` converts back to typed values.

---

## Component layers

```
Layer 1 — Tokens
  src/styles/contract.css.ts    createThemeContract (shape, no values)
  src/styles/presets/*.css.ts   createTheme per design (4 files, values only)

Layer 2 — Primitives  (src/components/primitives/)
  Button · Card · Tag/Chip · MetricTile · SectionHeading
  Dumb, token-styled, minimal variant props, no content knowledge.

Layer 3 — Feature components  (src/components/)
  Hero · Nav · ExperienceEntry · StatTiles · ProjectGrid · Footer
  Compose primitives; own content structure; no design-specific tokens.

Layer 4 — Layout shells  (src/layouts/)
  BaseLayout.astro        — <head>, ClientRouter, pre-paint script, slots
  AppShellLayout.astro    — persistent sidebar + route <slot>

Layer 5 — Widgets  (src/components/widgets/)
  SkillsBars · ScopeViz · ActivityHeatmap
  Dashboard-only; data-driven; token-styled (not hardcoded calm-console colours).

Layer 6 — Pages  (src/pages/)
  index.astro             — page-layout entry (all three page layouts)
  app/*.astro             — dashboard routes (Overview + 5 views)
```

**The no-forks rule** (see [ADR-0005](adr/0005-shared-component-system.md)): design differences live _only_ in token files (Layer 1) and `[data-theme]` / `[data-layout]` CSS selectors. No component is duplicated or branched per design. A new theme is a single new `presets/*.css.ts` file; a new layout is CSS selector additions and, if it needs a new shell, a new `layouts/*.astro` file.

---

## Page layouts vs the Dashboard app-shell

The three page-layout variants (control-plane / editorial / kinetic) share a single `/` route rendered by `index.astro` under `BaseLayout`. Switching between them is **instant** — `applyTheme()` mutates `data-layout` on `<html>` and CSS selectors respond immediately. No navigation; no network round-trip.

The Dashboard layout is a real multi-route app-shell under `/app`:

```
/app              → Overview (widgets: SkillsBars, ScopeViz, ActivityHeatmap)
/app/experience
/app/projects
/app/practices
/app/about
/app/resume
```

Selecting Layout = Dashboard triggers Astro **View Transitions** — the browser navigates to `/app` with an animated cross-fade. Selecting any page-layout from `/app` navigates back to `/`. This is a deliberate, one-time showcase action, not a repeated user interaction; the slight navigation cost is the right trade-off (see [ADR-0006](adr/0006-dashboard-app-shell-routes.md)).

All four themes are fully orthogonal to the dashboard: `AppShellLayout` carries `data-theme` on its root element, so the full 4 × 4 grid holds.

The app-shell routes reuse the same feature components as the page layouts (Layer 3 above) — `ExperienceEntry`, `ProjectGrid`, etc. — composed inside `AppShellLayout` instead of `BaseLayout`. No content is duplicated.

---

## Accessibility, motion, and performance posture

**Motion** is treated as an enhancement, not a default. Every animated element is wrapped in a `[data-motion="ok"]` selector (set by `applyTheme()`) so animations are inert unless the user has both not set `prefers-reduced-motion: reduce` _and_ not turned off motion in the control panel. `prefers-reduced-motion` always wins.

**Accessibility baseline:**
- Skip link in `BaseLayout` (keyboard navigation).
- Semantic HTML throughout — landmarks, heading hierarchy, `<button>` for interactive elements.
- oklch palette: perceptually uniform; all foreground/background pairs target WCAG AA contrast (≥ 4.5:1 body, ≥ 3:1 large text).
- Fully responsive — fluid across 360 px / 768 px / 1024 px / 1440 px / ultrawide. Dashboard sidebar collapses to an icon rail at narrow widths.

**Performance:**
- Zero JS by default on all static content (Astro's island architecture).
- React hydrates only the `ControlPanel` island (`client:idle`) and dashboard widget islands.
- The pre-paint theme script is inline and has no imports — it is a few hundred bytes of vanilla JS.
- Build target: resume page JS bundle < 50 KB.

---

## Future direction — per-element visual editor

Out of scope for the current build but tracked as a deliberate architectural constraint (see [ADR-0004 — Consequences](adr/0004-two-orthogonal-design-axes.md)): a visual editor that lets a visitor rearrange widgets or change a widget's render type (bar → pie → table) without a code change. The architecture supports this additively — dashboard widgets are built config/data-driven so a `type` field could later be state-driven; the controller→consumer model extends naturally down one level. No current work.
