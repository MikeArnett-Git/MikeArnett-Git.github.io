/**
 * Experience — work history (reverse-chronological), rendered by ExperienceEntry
 * (homepage Work section shows `featured` roles only) and the /app experience +
 * resume views (all roles).
 *
 * IP boundary (D20): Cloudhouse achievements are stated at outcome level only —
 * NO AI-assisted-development methods / agent-orchestration techniques (Mike's
 * differentiator), and NO invented metrics. Leadership scope + migration/test
 * figures remain pending Mike's recollection (reference/cloudhouse-recollection.md).
 *
 * `body` / `highlights` are author-controlled HTML; <b> marks emphasis (styled by
 * ExperienceEntry.css.ts), and < / > in figures are escaped entities.
 */
import type { ExperienceRole } from './types';

export const experience: ExperienceRole[] = [
  {
    id: 'cloudhouse-guardian',
    org: 'Cloudhouse — Guardian',
    role: 'Lead Frontend Software Engineer',
    period: 'Oct 2021 – present',
    location: 'Melbourne, AU',
    status: { label: 'current', tone: 'current' },
    surface: 'platform · migration',
    headline: 'Built a modular front-end platform and modernised a monolith with zero regressions',
    summary:
      'Lead frontend on Guardian — a greenfield modular platform that incrementally modernises a decade-old monolith at zero regression risk.',
    body:
      'Lead frontend engineer on Guardian. Built a flexible, modular front-end platform from scratch ' +
      'and used it to incrementally migrate and integrate a decade-old monolith — presenting one ' +
      "cohesive product while modernising underneath, at <b>zero regression risk</b>.",
    highlights: [
      'Built a modular front-end platform from scratch, then used it to <b>incrementally migrate a decade-old monolith</b> — app-shells + per-technology coexistence presenting a single cohesive product, at zero regression risk.',
      'Established standards and tooling for <b>AI-assisted development</b> — keeping AI-accelerated work consistent, auditable, and high-quality across teams.',
      'Designed a <b>high-performance dashboard</b> over hundreds of thousands of nodes across multiple appliances — user-configurable widgets, each fetching on demand behind a shared cache to keep queries light.',
      'Rebuilt the test foundation to <b>guarantee every page loads error-free</b>, making major modernisation safe — React 15→18, a React Router migration, and class-to-function conversion landed without regressions.',
      'Component library + Storybook adopted across <b>2–3 teams</b>; compressed design → working showcase to under two weeks for fast cross-timezone iteration.',
    ],
    metrics: [
      { label: 'legacy migration', value: 'zero regressions' },
      { label: 'AI-assisted dev', value: 'standardised' },
    ],
  },
  {
    id: 'compass-griddle',
    org: 'Compass Education',
    role: 'Software Engineer',
    period: 'Jan 2021 – Sep 2021',
    location: 'Melbourne, AU',
    status: { label: 'shipped', tone: 'shipped' },
    surface: 'Griddle · timetable grid',
    featured: true,
    headline: 'Saved a revenue-critical launch by rebuilding the timetable grid',
    summary:
      "Rebuilt Griddle's unreleasable hero feature against a hard once-a-year deadline — shipped on time, became the app's core and team standard.",
    body:
      "Saved a revenue-critical launch by rebuilding Griddle's hero feature — the timetable " +
      'grid. It <b>froze or crashed under real data</b> and was unreleasable, against a hard ' +
      'once-a-year timetabling deadline. Rebuilt it: first render <b>&gt;15s → &lt;1s</b>, ' +
      'full-data render from freeze/timeout → &lt;4s, via <b>query fragmentation and ' +
      "hand-written SQL</b>. Became the app's core and the team's standard.",
    highlights: [
      'Set the patterns and standards the team followed; reviewed every developer’s work and upskilled four through review, pairing, and task design — de-facto technical lead.',
    ],
    metrics: [
      { label: 'first render', value: '>15s → <1s' },
      { label: 'full-data', value: 'freeze → <4s' },
      { label: 'became', value: 'team standard' },
    ],
  },
  {
    id: 'compass-rnd',
    org: 'Compass Education',
    role: 'Software Engineer (R&D)',
    period: 'Aug 2019 – Jan 2021',
    location: 'Melbourne, AU',
    status: { label: 'shipped', tone: 'shipped' },
    surface: 'data tooling · warehouse',
    headline: 'Shipped an org-wide R&D data tool that seeded the flagship',
    summary:
      'Greenfield R&D data + visualisation tooling shipped to every Compass school; seeded Griddle and the data-warehouse architecture behind it.',
    body:
      'Greenfield R&D: built a dynamic data + visualisation tool that <b>shipped to production and ' +
      'rolled out to every Compass school</b>, and seeded the next flagship, Griddle. Designed the ' +
      "data-warehouse decoupling so a large daily ingestion never touched schools' systems during " +
      'operating hours, transforming legacy data into the optimised shape the timetabling engine needed.',
    highlights: [
      'Shipped greenfield R&D tooling to <b>every Compass school</b> — React/TypeScript, GraphQL, Cypress.',
      'Designed a <b>SQL + NoSQL data warehouse</b> decoupling daily ingestion from school-hours load, transforming legacy data into the form the timetabling engine needed.',
      'Seeded Griddle; the team grew from 3 to 5–6 engineers plus tech leads, PMs, and design around the work.',
    ],
    metrics: [
      { label: 'rollout', value: 'every school' },
      { label: 'stack', value: 'React · GraphQL · SQL+NoSQL' },
    ],
  },
];
