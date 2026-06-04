# Roadmap — mikearnett-git.github.io

High-level build phases and current status. Tracks what has shipped, what is verified, and what remains.

---

## Phase 0 — Foundations ✓

- [x] Astro 5 project scaffold — no `base` path (root user-site)
- [x] vanilla-extract theme contract (`contract.css.ts`) + four presets (control-plane, editorial, kinetic, calm-console)
- [x] Typed store-controller (`src/lib/theme.ts`) + pre-paint inline script (no FOUC)
- [x] `BaseLayout.astro` — `<head>`, `ClientRouter` (View Transitions), slots
- [x] GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)
- [x] `.gitignore` PII guard (`reference/`, `*.odt`)
- [x] `pnpm build` green · `astro check` 0 errors

## Phase 1 — Component system + control panel ✓

- [x] Primitive component layer (`src/components/primitives/`): Button, Card, Tag, MetricTile, SectionHeading
- [x] Feature components: Hero, Nav, ExperienceEntry, StatTiles, ProjectGrid, Footer
- [x] `ControlPanel.tsx` React island — Theme selector + Layout selector + Design shortcut + accent hue + motion + density
- [x] Three page layouts (control-plane / editorial / kinetic) — instant CSS switching via `data-layout`
- [x] Two-axis split enforced: `data-theme` ⊥ `data-layout`, independent at runtime

## Phase 2a — Dashboard app-shell ✓ (build-verified; interactive verification pending)

- [x] `AppShellLayout.astro` — persistent sidebar + View-Transitions-navigated routes
- [x] `/app` routes: Overview + five stub views (experience / projects / practices / about / resume)
- [x] Dashboard widgets: `SkillsBars`, `ScopeViz`, `ActivityHeatmap` (data-driven, token-styled)
- [x] Control panel integration: Layout = Dashboard → navigates to `/app`; D3 shortcut = calm-console + dashboard
- [x] All four themes render on the dashboard (4 × 4 holds)
- [ ] **Interactive verification** — runtime smoke test of Layout ↔ Dashboard navigation, ⌘K palette, responsive sidebar collapse, all-4-theme check on `/app`
- [ ] Fix three `ts(6133)` unused-var warnings (`AppShellLayout.astro`, `app/index.astro`)

## Phase 2b — Dashboard stub views → real content

Fill the five `/app` stub views with shared feature components (reusing `ExperienceEntry`, `ProjectGrid`, etc.) navigated via left-nav + ⌘K command palette with View Transitions.

## Phase 3 — Content

- [ ] Experience section — Cloudhouse recollection → full achievement bullets + metrics
- [ ] Final skills list
- [ ] Per-project screenshots and links (disclosure decided per project)
- [ ] Contact method (currently deferred — GitHub profile only)

## Phase 4 — Polish

- [ ] Kinetic layout: project-list status-chip placement fix (`display:contents` side-effect) + hover slide-in
- [ ] Motion and View Transitions tuning
- [ ] Full responsive sweep — every theme × layout combination at 360 / 768 / 1024 / 1440 / ultrawide (D13 gate)
- [ ] Lighthouse targets: Performance / Accessibility / Best Practices / SEO
- [ ] JS budget verification: resume page < 50 KB

## Phase 5 — Case studies

- [ ] Practices section (code-practices showcase)
- [ ] "Beyond the editor" section
- [ ] Four proprietary project case studies (architecture + outcomes; no source code)
- [ ] Meta case study: "How this site was built" — five pillars: process / design / architecture / outcomes / inspect

## Phase 6 — Deploy

Mike's call. PII guard verification before any commit → push to `MikeArnett-Git.github.io` → set Pages source = GitHub Actions → live verification.

---

## Architecture decisions

See [`docs/adr/`](adr/) — seven ADRs covering SSG choice, styling system, hosting, design-axes, component system, dashboard routing, and accessibility/performance baseline.
