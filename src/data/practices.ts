/**
 * Practices — the engineering-worldview intro, practice keywords, and the
 * "Beyond the editor" interests. Used by the page-layout Practices section and
 * (Stage 2b-ii) the /app/practices view. Keep IP-clean per D20 — practices,
 * not proprietary methods.
 */

export const practicesIntro = {
  before: 'One engineering worldview across every project:',
  emphasis: 'flexible, maintainable systems',
  after:
    'and intuitive interfaces over complex data — decisions recorded, agents governed, regressions designed out.',
};

export const practiceTags: string[] = [
  'architecture-first',
  'ADR-driven decisions',
  'no-regression migrations',
  'scoped / auditable agents',
  'performance budgets',
  'composable pipelines',
];

/** "Beyond the editor" — humanising interests that back the technical narrative. */
export const beyondTheEditor: string[] = ['home lab & networking', '3D printing', 'DIY'];
