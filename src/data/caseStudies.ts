/**
 * Case studies — one per project (slug = project id), rendered by
 * CaseStudyArticle at /projects/<slug> (page layout) and /app/projects/<slug>
 * (dashboard).
 *
 * IP boundary (D20, hard): architecture + outcomes ONLY. No proprietary
 * optimisations, no custom-implementation how-to, and NONE of Mike's
 * AI-assisted-development / agent-orchestration / governance *methods*. agent-pm
 * and spatial-canvas are conservative drafts (draft:true) for Mike to own. The
 * meta "this-site" study presents engineering *practice* (ADRs, design-before-
 * code, typed architecture, verification) — NOT the AI workflow used to build it.
 * Badges are measured facts only — never a fabricated Lighthouse score.
 *
 * `summary` / section `body` are author-controlled HTML; <b> marks emphasis.
 */
import { designCombos, designMatrix, layoutCount, themeCount } from './siteStats';
import type { CaseStudy } from './types';

const GH = 'https://github.com/MikeArnett-Git';
const SITE_REPO = 'https://github.com/MikeArnett-Git/MikeArnett-Git.github.io';
// Branch-agnostic deep links into the repo (HEAD resolves to the default branch).
const src = (path: string) => `${SITE_REPO}/blob/HEAD/${path}`;
const tree = (path: string) => `${SITE_REPO}/tree/HEAD/${path}`;

export const caseStudies: CaseStudy[] = [
  {
    slug: 'agent-pm',
    title: 'agent-pm',
    kicker: 'AI ops console',
    summary:
      'A local-first coordination layer for teams where people and AI agents work the same codebase at once — keeping concurrent work <b>scoped</b>, project state <b>verifiable</b>, and progress <b>auditable</b>.',
    sections: [
      {
        heading: 'Problem',
        body: 'When several agents work a shared codebase concurrently they collide on overlapping files, lose track of project state, and emit progress reports that can’t be trusted. General project tools aren’t built for AI agents as first-class participants.',
      },
      {
        heading: 'Architecture',
        body: 'Data, not prose, is the source of truth — task state, ownership, and validation evidence are records, with generated summaries treated as outputs only. Concurrent work runs under <b>scoped ownership</b> so streams don’t collide. Each task is dispatched with a <b>bounded context pack</b> to cut re-discovery at hand-off. A hardware-aware step recommends a model tier per task — advisory, never a substitute for validation.',
      },
      {
        heading: 'Principles',
        body: 'Evidence over narrative: a task is “done” only when the data and the checks agree, not when a summary claims it. Governance is enforced by the system, not by convention.',
      },
      {
        heading: 'Outcomes',
        body: 'An operational CLI for dispatch, scope validation, and bounded-context generation — used to coordinate real, multi-stream development across human and AI contributors.',
      },
    ],
    tech: ['Python (stdlib-only CLI)', 'SQLite', 'Git', 'TOML'],
    links: [{ label: 'GitHub', href: GH, external: true }],
    draft: true,
  },
  {
    slug: 'spatial-canvas',
    title: 'spatial-canvas',
    kicker: 'Spatial visualisation engine',
    summary:
      'A <b>domain-agnostic</b> engine for spatial visualisation — a rendering substrate, composable add-ons, and declarative “worlds” that stay independent of any one domain or metaphor.',
    sections: [
      {
        heading: 'Problem',
        body: 'Spatial and visualisation features are usually rebuilt per product and welded to one domain’s data and metaphors, so nothing transfers. The goal is one engine that generalises.',
      },
      {
        heading: 'Architecture',
        body: 'A core <b>substrate</b> owns rendering and interaction; capabilities layer on as composable <b>add-ons</b>; what’s shown is described declaratively as a “world”, decoupled from the engine. Metaphor-agnostic by design — the same engine can drive very different visual languages.',
      },
      {
        heading: 'Principles',
        body: 'Generalisation over special-casing: domain specifics live in declarative configuration and add-ons, never in the core.',
      },
      {
        heading: 'Outcomes',
        body: 'A reusable visualisation substrate that generalises across domains and pairs with the broader AI-systems work.',
      },
    ],
    links: [{ label: 'GitHub', href: GH, external: true }],
    draft: true,
  },
  {
    slug: 'atelier',
    title: 'Atelier',
    kicker: 'Composable media pipelines',
    summary:
      'A local-first desktop studio that unifies AI-assisted <b>image, 3D, and (planned) video</b> work in one application — subjects extracted from any modality share a single space, on consumer hardware.',
    sections: [
      {
        heading: 'Problem',
        body: 'Consumer AI media tools are siloed by modality — image generation, 3D reconstruction, and video each live in disconnected products. Atelier unifies these workflows locally, on a single machine.',
      },
      {
        heading: 'Architecture',
        body: 'A two-process desktop app: a React frontend talks to a local Python ML service over HTTP + streaming events, with native-OS calls kept to a minimum. A <b>transport-agnostic adapter</b> decouples the UI from how it reaches the backend. Pipeline stages request models <b>by role, not by name</b>, behind a VRAM-aware registry that handles loading and eviction. Every job is a typed async stream of progress events over shared queue and heartbeat infrastructure.',
      },
      {
        heading: 'Approach',
        body: 'Composable subject-extraction pipelines with provenance; a stub-loader runs the <b>full backend test suite with no GPU and no model weights</b> (CI-safe). The same subject extracted from image, video, or camera merges into one group via a shared space.',
      },
      {
        heading: 'Outcomes',
        body: 'Phase 2a shipped — Assets / Images / Jobs / Config workspaces, composable pipelines, job dependencies, and a command overlay, with <b>60 backend + 100+ frontend tests passing</b>.',
      },
    ],
    tech: [
      'Python / FastAPI / SQLAlchemy',
      'Tauri 2',
      'React 19 / TypeScript',
      'three.js (react-three-fiber)',
      'diffusion · image-to-3D · vision models (ONNX)',
      'SQLite',
    ],
    links: [{ label: 'GitHub', href: GH, external: true }],
  },
  {
    slug: 'card-tracker',
    title: 'CardTracker',
    kicker: 'Vision-pipeline inventory',
    summary:
      'A desktop app that scans, identifies, and catalogues collectible cards with <b>on-device computer-vision pipelines</b> — recognition, inventory, pricing, and multi-source sync, offline-capable.',
    sections: [
      {
        heading: 'Problem',
        body: 'Collectors with large inventories have no offline tool that combines camera-based recognition with inventory, pricing, and data sync. Built to extend across games (Yu-Gi-Oh! first, others via plugins).',
      },
      {
        heading: 'Architecture',
        body: 'One Rust backend runs as both a desktop service and an HTTP server, behind a transport-agnostic frontend adapter. A multi-stage <b>sync pipeline</b> (catalog → images → hashes → embeddings) runs on a database-backed job queue with admission control, rate limiting, and circuit breakers; row-level claiming prevents duplicate work. Card matching is <b>two-pass</b> — a fast perceptual-hash filter, then CNN embeddings for semantic similarity. A plugin contract lets per-game modules register at boot.',
      },
      {
        heading: 'Approach',
        body: 'A “scope-as-data” refactor cut per-stage query counts substantially; patterns proven here — live-video scanning, collection-view primitives — carried directly into Atelier.',
      },
      {
        heading: 'Outcomes',
        body: 'Shipped: scanner pipeline, data-source sync, multi-source price convergence with outlier rejection, inventory, and collections. In-memory indexes keep <b>~100k cards</b> light.',
      },
    ],
    tech: [
      'Rust (Axum, sqlx, tokio)',
      'Tauri 2',
      'React 19 / TypeScript',
      'TailwindCSS',
      'SQLite',
      'OpenCV · ONNX Runtime · OCR',
    ],
    links: [{ label: 'GitHub', href: GH, external: true }],
  },
  {
    slug: 'this-site',
    title: 'This site, in the open',
    kicker: 'Self-reference · open source',
    summary:
      'The one project here that’s <b>fully inspectable</b> — a résumé that’s also a working web app, and a worked example of how I build: decisions recorded, design before code, a typed architecture, and verification gates.',
    sections: [
      {
        heading: 'Stack',
        lede: 'Astro static, one React 19 island, typed zero-runtime CSS — a minimal JS budget.',
        body: 'Astro ships static HTML with selective hydration, so first paint is fast and pages index reliably. The single interactive island — the live design switcher — runs on native <b>React 19</b> via <code>@astrojs/react</code>. Styling is <b>vanilla-extract</b>: type-checked, zero-runtime CSS compiled to static classes, with oklch design tokens. It’s TypeScript end to end, with Vitest, Biome and a GitHub&nbsp;Actions gate keeping it honest.',
        sources: [{ label: 'astro.config.mjs', href: src('astro.config.mjs'), external: true }],
      },
      {
        heading: 'Two-axis design system',
        lede: `Theme (${themeCount}) ⊥ Layout (${layoutCount}) — a live ${designMatrix} matrix from one component set, no forks.`,
        body: `Two orthogonal attributes compose every design: <code>data-theme</code> drives styling, <code>data-layout</code> drives structure. They’re independent, so any theme pairs with any layout — <b>${designCombos} combinations</b>, switchable live. There are no per-design component forks: each design is the same component set varied by tokens and layout selectors, so one fix lands everywhere (ADR-0004, ADR-0005).`,
        snippet: {
          caption: 'src/styles/contract.css.ts',
          code: `// one typed token contract — every preset must fill every slot
export const contract = createThemeContract({
  color: { ink: null, surface: null, accent: null /* … */ },
  font:  { display: null, body: null, mono: null },
});`,
        },
        sources: [
          { label: 'contract.css.ts', href: src('src/styles/contract.css.ts'), external: true },
          { label: 'presets/', href: tree('src/styles/presets'), external: true },
        ],
      },
      {
        heading: 'State & content',
        lede: 'One typed controller for presentation, one typed data layer for content.',
        body: 'A typed store-controller is the single source of truth for presentation state — theme, layout, accent, motion, density — applied <b>pre-paint</b> by an inline script, so there’s no flash of the wrong design. All copy lives in a typed data layer: one edit updates every view, the dashboard included.',
        snippet: {
          caption: 'src/lib/theme.ts',
          code: `export interface ThemeState {
  theme: Theme;      // styling axis
  layout: Layout;    // structure axis
  accentHue: number; // live, user-adjustable
  motion: boolean;
  density: Density;  // …mode, fontSet
}`,
        },
        sources: [
          { label: 'theme.ts', href: src('src/lib/theme.ts'), external: true },
          { label: 'data layer', href: tree('src/data'), external: true },
        ],
      },
      {
        heading: 'Dashboard as a real app',
        lede: 'Not a CSS swap — real /app routes with View-Transitions navigation.',
        body: 'Switching to the dashboard layout isn’t a style toggle; it’s genuine per-view routes under <code>/app</code>, navigated with Astro <b>View Transitions</b>. It behaves like an app shell — persistent sidebar, ⌘K command palette — while staying fully static (ADR-0006).',
        sources: [
          {
            label: 'AppShellLayout.astro',
            href: src('src/layouts/AppShellLayout.astro'),
            external: true,
          },
          { label: 'app/ routes', href: tree('src/pages/app'), external: true },
        ],
      },
      {
        heading: 'How it was built',
        lede: 'Decisions recorded, design before code, verification as a gate.',
        body: 'Significant choices are captured as <b>ADR-lite records</b> — context, rationale, trade-offs — so the reasoning is traceable, not reconstructed after the fact. Work is designed before it’s coded, and every change clears a verification gate — type-check, tests, build — before it counts as done.',
        sources: [
          { label: 'docs/adr/', href: tree('docs/adr'), external: true },
          { label: 'docs/', href: tree('docs'), external: true },
        ],
      },
      {
        heading: 'Quality bar',
        lede: 'Type-checked end to end, unit-tested, accessible by default.',
        body: 'Strict TypeScript with zero errors; unit tests over the controller and data invariants; Biome for lint and format; a CI gate on every push. Accessible by default — skip link, semantic landmarks, <code>prefers-reduced-motion</code> guards, visible focus (ADR-0007).',
        sources: [
          { label: 'ci.yml', href: src('.github/workflows/ci.yml'), external: true },
          { label: 'biome.json', href: src('biome.json'), external: true },
        ],
      },
      {
        heading: 'Inspect it',
        lede: 'Every claim here is checkable — it’s open source.',
        body: 'Read the code, the commit history, the deploy workflow, and the decision records. Nothing here is asserted that the repository can’t back up.',
      },
    ],
    // `design matrix` is derived from the live theme/layout lists (siteStats); the
    // rest are externally-measured facts that can’t self-measure at build time.
    badges: [
      { label: 'design matrix', value: designMatrix },
      { label: 'homepage JS', value: '~5 KB gz' },
      { label: 'type errors', value: '0' },
      { label: 'unit tests', value: '32' },
    ],
    tech: [
      'Astro 5 (static)',
      'React 19',
      'vanilla-extract (oklch tokens)',
      'TypeScript (strict)',
      'View Transitions',
      'Vitest',
      'Biome',
      'GitHub Pages / Actions',
    ],
    links: [
      { label: 'Repository', href: SITE_REPO, external: true },
      { label: 'Commit history', href: `${SITE_REPO}/commits`, external: true },
      { label: 'Decision records (ADRs)', href: tree('docs/adr'), external: true },
    ],
  },
];

/** Lookup a case study by slug (route helper). */
export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
