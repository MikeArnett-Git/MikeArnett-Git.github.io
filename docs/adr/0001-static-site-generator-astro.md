# ADR-0001: Static site generator — Astro + React islands

**Status:** Proposed
**Date:** 2026-06-04

---

## Context

The site is a personal resume/portfolio: primarily static content (experience, projects, skills) with a small number of interactive components (design-switcher control panel, dashboard widgets, command palette). It doubles as a code-practices showcase, so the framework choice is itself on display.

Forces:
- Fast first paint and reliable HTML output for crawlers and social-preview scrapers.
- Minimal JavaScript shipped to the browser for largely-static content.
- Interactivity where genuinely needed (the live design switcher, dashboard).
- Signals "right tool for the job" judgment to technical readers.
- Must deploy cleanly to GitHub Pages (static files; no server runtime).

---

## Decision

Use **Astro 5** with React islands (via `@astrojs/react`). Interactive components are hydrated selectively with `client:idle` or `client:load` directives; all other content is zero-JS static HTML.

Astro's island architecture means the JavaScript budget grows only where interactivity is added, not site-wide. The MPA model produces real per-page URLs with full HTML responses — correct for a resume site where individual sections may be linked or bookmarked. View Transitions are used for animated route changes (dashboard navigation) without adopting a full SPA model.

---

## Consequences

- Zero JS by default on static content; React loads only for islands.
- Content and structure ship as full HTML — reliable indexing and social previews without JavaScript execution.
- The pre-paint theme script is a small inline snippet, not a framework bundle.
- Build output is fully static; deploys to GitHub Pages with no server dependency.
- Dashboard routes (`/app/*`) are real static pages navigated via View Transitions — SEO-friendly, deep-linkable.
- Adding interactivity to a new component requires an explicit `client:*` directive, keeping the JS budget visible and auditable.

---

## Alternatives considered

**Next.js (static export):** Viable for a React-first team. Rejected here because `next export` ships the full React + Next runtime even for pages with no interactivity, and `next/image` is unsupported on GitHub Pages static export. The bundle overhead is avoidable for a mostly-static resume.

**Vite SPA (React or similar):** Worse SEO and first-paint characteristics. A single-page app requires JavaScript to render content — social previews and crawlers receive an empty shell unless SSR or prerendering is layered on.

**Plain HTML / CSS:** Shows restraint and performance discipline but not depth. Appropriate for a purely informational site; not appropriate here where the build itself is the showcase of engineering judgment.
