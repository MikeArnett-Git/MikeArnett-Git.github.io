# ADR-0006: Dashboard layout — real app-shell with routes and View-Transitions navigation

**Status:** Proposed
**Date:** 2026-06-04

---

## Context

The Dashboard ("Calm Console") direction is a full app-shell layout: a persistent left-side navigation rail and a main content area that switches between distinct views (Overview, Experience, Projects, Practices, About, Résumé). Three implementation approaches were evaluated:

1. **Client-side view switching** — one page (`/app`) with React state controlling which "panel" renders. No URL changes; all content loaded up-front.
2. **Hybrid** — Astro component islands per view, loaded lazily.
3. **Real routes** — separate Astro pages under `/app/*`, navigated via Astro View Transitions.

The site's architecture goals require production-grade treatment: real URLs, SEO-friendly, deep-linkable, accessible, and consistent with the "right tool" (static MPA) reasoning.

---

## Decision

The Dashboard layout is a proper **`AppShellLayout`** with **real per-view routes** under `/app`:

```
/app              → Overview (widgets: SkillsBars, ScopeViz, ActivityHeatmap)
/app/experience
/app/projects
/app/practices
/app/about
/app/resume
```

Navigation between views uses Astro **View Transitions** — the browser navigates to the target route with an animated cross-fade. The left-nav links are real `<a>` elements; the active state is derived from the current URL.

**Switching to the Dashboard layout** (from a page-layout) triggers navigation to `/app`. **Switching away** (selecting a page-layout from within `/app`) navigates back to `/`. This is a deliberate one-time showcase action; the slight navigation latency is acceptable and preferred over the complexity of client-side panel switching.

All four themes are orthogonal to the Dashboard: `AppShellLayout` carries `data-theme` on its root, so the full 4 × 4 combination matrix holds.

The same feature components (`ExperienceEntry`, `ProjectGrid`, etc.) render inside `AppShellLayout` views as they do in the page layouts. No content duplication.

---

## Consequences

- Each dashboard view is a real, addressable URL — deep-linkable, bookmark-able, crawlable.
- Social-preview and crawler requests receive full HTML content without executing JavaScript.
- The `ClientRouter` (View Transitions) is enabled in `BaseLayout` and carries across both the page-layout entry point and the app routes.
- `AppShellLayout` carries `data-theme` from the store — theme changes are applied immediately via CSS without re-navigation.
- The `data-layout="dashboard"` attribute on `<html>` informs the control panel which shell is active, allowing the Layout selector to reflect the correct state.
- Switching layout-mode (page ↔ dashboard) is a navigation, not an instant CSS change. This is intentional: the structural shift from scrolling page to app-shell cannot be expressed as a CSS toggle alone. The View Transitions animation makes the switch feel intentional rather than abrupt.
- Intra-view navigation (between `/app/*` routes) uses View Transitions; the sidebar remains persistent.

---

## Alternatives considered

**Client-side panel switching (single `/app` route, React state):** Avoids navigation on view switches inside the dashboard. Disadvantages: no real URLs (back button breaks, no deep links), all view content must load up-front or be lazily imported via React, and this pattern is harder to reconcile with Astro's static output model. Rejected in favour of real routes.

**Hybrid (Astro island per panel, lazy load):** More complex without clear benefit over real routes. Introduces loading states and partial hydration complexity. Rejected.
