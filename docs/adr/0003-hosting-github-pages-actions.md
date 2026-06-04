# ADR-0003: Hosting and deployment — GitHub Pages root user-site + GitHub Actions

**Status:** Proposed
**Date:** 2026-06-04

---

## Context

A static personal portfolio needs a reliable, publicly accessible host. The site source is already on GitHub. Deployment should be automatic on push to `master`.

Forces:
- Clean root URL (no subpath noise).
- Source-as-proof: the version history, ADRs, and deploy workflow are all publicly inspectable.
- Zero ongoing hosting cost.
- No custom domain required at launch (no domain registered yet).
- Must match Astro's GitHub Pages deployment model.

---

## Decision

Deploy to **GitHub Pages as a root user-site** (`MikeArnett-Git.github.io`) using the **official Astro GitHub Actions workflow** (`.github/workflows/deploy.yml`). Push to `master` triggers the workflow; the built `dist/` is served from the root.

Key configuration implication: a root user-site must **not** set `base` in `astro.config.mjs`. Setting `base` on a root user-site breaks all asset paths. The `site` field is set to `https://mikearnett-git.github.io` (canonical URL for sitemap and meta tags); `base` is omitted entirely.

---

## Consequences

- Clean URLs: `mikearnett-git.github.io/`, `mikearnett-git.github.io/app/`, etc. — no `/repo-name/` prefix.
- The deploy workflow, build configuration, and full commit history are visible to anyone viewing the repository — this is intentional; they are part of the showcase.
- Pages source must be set to "GitHub Actions" in the repository settings (not the legacy "branch" mode).
- A custom domain can be added later by setting `CNAME` in `public/` and updating the `site` field — no other changes needed.
- The Astro build step runs `pnpm build` in CI; the same command runs locally, ensuring parity.

---

## Alternatives considered

**Project repo + custom domain:** Requires a registered domain and adds DNS configuration. Deferred — no domain at launch.

**`github.io/<repo>` subpath site:** Requires `base: '/repo-name/'` in Astro config and all internal links must carry the prefix. Adds config complexity for no benefit when a root user-site is available.

**Vercel / Netlify:** Both are excellent Astro hosts with better CDN edge characteristics. Not chosen here because the GitHub Pages connection (source + deploy in one place) is part of the "inspect the build" story, and the cost/complexity difference does not justify a separate host for a static resume site.
