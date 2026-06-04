# mikearnett-git.github.io

**Senior full-stack software engineer — AI systems and developer tools.**
Static resume/portfolio site that is simultaneously a living demonstration of engineering practice.

`Astro 5` · `React islands` · `vanilla-extract + oklch` · `GitHub Pages` · `TypeScript`

---

## What this is

A resume and portfolio that proves its own claims. The proprietary projects (agent-pm, Compass, Cloudhouse, Griddle) are described through architecture and outcomes; this site itself is the fifth, fully inspectable case study — every decision, pattern, and trade-off visible in the source.

**Dual purpose:**

| Layer | Purpose |
|---|---|
| Content | Resume — experience, projects, code-practices showcase, "Beyond the editor" |
| Engineering | Demonstrates the architecture and practices it asserts: typed design-system, SoC, islands, a11y, static/MPA "right tool" reasoning |

## Headline feature — live design switcher (4 × 4)

Two independent axes, fully mix-and-match:

- **Theme** (styling) — `control-plane` · `editorial` · `kinetic` · `calm-console` — palette, fonts, type scale, background treatment, borders, shadows.
- **Layout** (structure) — `control-plane` · `editorial` · `kinetic` · `dashboard` — DOM arrangement, hero composition, section structure, page-scroll vs app-shell.

16 valid combinations. A "whole design" shortcut snaps both axes at once (A/B/C/D3). The persistent control panel (bottom-right corner) lets visitors switch freely — state survives page refresh via `localStorage`.

This is a direct re-demonstration of the Cloudhouse in-app theming/layout-switching work: a controller→consumer architecture where designs are token + variant layers over one shared component set, never forked code.

## Stack

| Concern | Choice | Rationale |
|---|---|---|
| Site framework | Astro 5 (static + MPA) | Zero JS by default; islands only where needed; fast first paint + reliable crawler/social-preview HTML |
| Interactivity | React islands (`client:idle` / `client:load`) | Minimal JS budget; right tool for the control panel + dashboard widgets |
| Styling | vanilla-extract + oklch design tokens | Build-time CSS; type-safe theme contract; perceptually-uniform palette; no runtime cost |
| State | nanostores (persistent map) | Framework-agnostic; tiny; serialises to `localStorage` per-key |
| Hosting | GitHub Pages root user-site | Clean root URL; source-as-proof in version control; free |
| Deploy | Official Astro GitHub Actions workflow | Push to `master` → build → Pages |

## How to run

```bash
pnpm install
pnpm dev          # → http://localhost:4321
pnpm build        # static output → dist/
pnpm exec astro check   # TypeScript + Astro diagnostics (0 errors expected)
```

Requires Node ≥ 18 and pnpm.

## Architecture

```
src/
  lib/
    theme.ts               # typed store-controller (single source of truth)
  styles/
    contract.css.ts        # vanilla-extract theme contract (shape, not values)
    global.css.ts
    presets/               # four createTheme implementations
      control-plane.css.ts
      editorial.css.ts
      kinetic.css.ts
      calm-console.css.ts
  components/
    primitives/            # dumb token-styled atoms (Button, Card, Tag, MetricTile, …)
    widgets/               # dashboard-only: SkillsBars, ScopeViz, ActivityHeatmap
    ControlPanel.tsx        # React island — theme/layout consumer
    Hero.astro  Nav.astro  ExperienceEntry.astro  ProjectGrid.astro  …
  layouts/
    BaseLayout.astro       # <head>, ClientRouter, pre-paint inline script (no FOUC)
    AppShellLayout.astro   # dashboard layout shell
  pages/
    index.astro            # page-layout entry point
    app/                   # dashboard routes (Overview + 5 views), View-Transitions nav
```

**Controller → consumer.** `src/lib/theme.ts` owns `ThemeState {theme, layout, mode, accentHue, fontSet, motion, density}`. A pre-paint inline script in `BaseLayout` applies `data-theme` + `data-layout` to `<html>` before CSS renders — no flash of unstyled content. The `ControlPanel` island and any other component are pure consumers; they call `applyTheme()` and write to the store, never read from the DOM.

**No forks.** Design differences live exclusively in token files (presets) and CSS `[data-theme]`/`[data-layout]` selectors. Adding a new theme = one new `presets/*.css.ts` file. The same `ExperienceEntry`, `ProjectCard`, and other feature components render under all 16 combinations.

**Page layouts vs the Dashboard.** Switching between the three page-layouts (control-plane/editorial/kinetic) is instant CSS — no navigation. Switching to the Dashboard layout navigates to `/app` via Astro View Transitions (animated). All four themes are orthogonal to this: `data-theme` is carried by `AppShellLayout`, so all 4 themes render the dashboard.

See [`docs/architecture.md`](docs/architecture.md) for the full write-up and [`docs/adr/`](docs/adr/) for the architectural decision records.

## Docs

| Document | Contents |
|---|---|
| [`docs/architecture.md`](docs/architecture.md) | Architecture overview — axes, controller model, component layers, performance/a11y posture |
| [`docs/roadmap.md`](docs/roadmap.md) | Build phases + current status |
| [`docs/adr/`](docs/adr/) | Architectural Decision Records (MADR-lite, ADR-0001–0007) |

## Contact

[github.com/MikeArnett-Git](https://github.com/MikeArnett-Git)
