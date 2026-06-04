/**
 * Shared content types for the typed data layer (src/data/*).
 *
 * D7 / D18: site content lives here as typed TS modules — one edit updates every
 * view, and components render from this config (a future visual editor becomes an
 * additive layer, not a rewrite). Deliberately plain typed TS with explicit
 * annotations — no zod / Content-Collections ceremony, which would be
 * over-engineered for a handful of records on a static site.
 */

export interface Profile {
  name: string;
  /** Positioning sentence (Hero positioning line, /app profile role). */
  title: string;
  /** Short role label (app-shell brand sub-line). */
  shortTitle: string;
  /** The "// …" pin shown after the positioning line. */
  tagline: string;
  /** Bolded lead sentence of the canonical summary. */
  summaryLead: string;
  /** Remainder of the canonical summary (follows the lead). */
  summaryBody: string;
  /** Display location, short form. */
  location: string;
  /** Display location with detail. */
  locationDetail: string;
  /** Full GitHub profile URL — the only contact surface for now (A3 deferred). */
  github: string;
  /** GitHub handle without the URL. */
  githubHandle: string;
  /** Short availability pills. */
  availability: string[];
  /** One-line availability sentence. */
  availabilityLine: string;
  /** "Available for…" bullet list (/app overview). */
  availableFor: string[];
  /** About-page narrative paragraphs (warm register, derived from locked copy). */
  about: string[];
}

export interface Project {
  id: string;
  name: string;
  /** Card headline (h3). */
  headline: string;
  /** Full description (page-layout project grid). */
  description: string;
  /** Compact description (dense /app lists). */
  shortDescription: string;
  /** Category flag shown on the card. */
  category: string;
  /** Short tag for compact lists. */
  tag: string;
  status?: 'in-dev' | 'live';
  /** Featured card gets the widest span + scopeviz decoration. */
  featured?: boolean;
  /** Grid span on the page-layout project grid (12-col). */
  span: 5 | 6 | 7 | 12;
  href: string;
  /** Link label on the card. */
  linkLabel: string;
}

export interface Skill {
  name: string;
  /** Proficiency label (e.g. "primary", "strong"). */
  level: string;
  /** Deterministic bar width as a percentage string ("95%"). */
  pct: string;
}

export interface ExtraTag {
  label: string;
}

export interface Metric {
  /** Eyebrow / key label. */
  key: string;
  /** Compact value for dense mono cells (/app overview). */
  value: string;
  /** Leading fragment for the headline tile, before the accent. */
  lead?: string;
  /** Emphasised value fragment. */
  accent: string;
  /** Trailing fragment for the headline tile, after the accent. */
  trail?: string;
  /** Emphasis treatment. */
  tone: 'accent' | 'live';
  /** Context sub-label. */
  context: string;
}

export interface ExperienceMetric {
  label: string;
  value: string;
}

export interface ExperienceRole {
  id: string;
  org: string;
  role: string;
  /** Display period, e.g. "2021" or "Oct 2021 – present". */
  period: string;
  location?: string;
  /** Status chip. */
  status?: { label: string; tone: 'shipped' | 'live' | 'current' };
  /** Short surface/context label (e.g. "Griddle · timetable grid"). */
  surface?: string;
  /** Surface this role on the page-layout homepage Work section. */
  featured?: boolean;
  /** Achievement headline (h3). */
  headline: string;
  /** One-line role summary for dense list/resume views. */
  summary?: string;
  /** Narrative body — author-controlled HTML; <b> marks emphasis. */
  body: string;
  /** Achievement bullets — author-controlled HTML; <b> marks emphasis. */
  highlights?: string[];
  metrics: ExperienceMetric[];
}

export interface Education {
  id: string;
  institution: string;
  qualification: string;
  period: string;
}

export interface CaseStudyLink {
  label: string;
  href: string;
  /** Opens in a new tab (external). */
  external?: boolean;
}

export interface CaseStudySection {
  heading: string;
  /** Author-controlled HTML; <b> marks emphasis. */
  body: string;
}

export interface CaseStudyBadge {
  label: string;
  value: string;
}

export interface CaseStudy {
  /** Matches the Project id (route slug). */
  slug: string;
  title: string;
  /** Short category/headline (mirrors the project's headline). */
  kicker: string;
  /** Intro paragraph. */
  summary: string;
  sections: CaseStudySection[];
  /** Proof tiles — measured outcomes only, never fabricated. */
  badges?: CaseStudyBadge[];
  tech?: string[];
  links?: CaseStudyLink[];
  /** Conservative draft pending Mike's own write-up (agent-pm, spatial-canvas). */
  draft?: boolean;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  /** Render as the CTA button (page nav). */
  cta?: boolean;
}

export type AppView =
  | 'overview'
  | 'experience'
  | 'projects'
  | 'practices'
  | 'about'
  | 'resume';

export interface AppNavItem {
  id: AppView;
  label: string;
  href: string;
  /** Inline SVG markup for the nav icon. */
  icon: string;
  /** Optional hint shown in the command palette. */
  hint?: string;
}

export interface PaletteItem {
  id: string;
  label: string;
  href: string;
  hint: string;
}
