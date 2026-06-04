# Architectural Decision Records

This directory contains the architectural decision records (ADRs) for mikearnett-git.github.io.

## Format

MADR-lite: each ADR has a four-digit zero-padded index, a short title slug, and covers:

- **Status** — Accepted / Superseded / Deprecated
- **Date** — when the decision was made
- **Context** — the problem and forces at play
- **Decision** — what was decided and why
- **Consequences** — trade-offs, implications, constraints going forward
- **Alternatives considered** — what was ruled out and why

## Index

| ADR | Title | Status |
|-----|-------|--------|
| [0001](0001-static-site-generator-astro.md) | Static site generator: Astro + React islands | Accepted |
| [0002](0002-styling-vanilla-extract-oklch.md) | Styling: vanilla-extract + oklch design tokens | Accepted |
| [0003](0003-hosting-github-pages-actions.md) | Hosting and deployment: GitHub Pages + GitHub Actions | Accepted |
| [0004](0004-two-orthogonal-design-axes.md) | Two orthogonal design axes: Theme ⊥ Layout | Accepted |
| [0005](0005-shared-component-system.md) | One shared component system — designs are token/variant layers, never forks | Accepted |
| [0006](0006-dashboard-app-shell-routes.md) | Dashboard as a real app-shell with routes and View-Transitions navigation | Accepted |
| [0007](0007-accessibility-motion-performance-baseline.md) | Accessibility, motion, and performance baseline | Accepted |
