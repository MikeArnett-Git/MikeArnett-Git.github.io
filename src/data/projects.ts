/**
 * Projects — the four flagship projects (architecture/outcomes only per D20,
 * no proprietary detail) plus the self-referential this-site case study (D1).
 * Throughline (D2): composable, generalisable AI + programmatic pipelines /
 * domain-agnostic engines. Rendered by ProjectGrid (page layout) and the
 * /app projects + overview views (dashboard).
 */
import type { Project } from './types';

/** Projects-section thesis (D2 throughline). */
export const projectsThesis =
  'One engineering worldview: composable, generalisable AI + programmatic pipelines and domain-agnostic engines.';

export const projects: Project[] = [
  {
    id: 'agent-pm',
    name: 'agent-pm',
    headline: 'AI ops console',
    description:
      'A governance control-plane for AI agents — dispatch, routing, leasing, observability. ' +
      'Keeps autonomous work scoped, auditable, and costed.',
    shortDescription: 'AI ops console / governance control-plane for AI agents',
    category: 'control-plane / governance',
    tag: 'control-plane',
    status: 'in-dev',
    featured: true,
    span: 7,
    href: 'https://github.com/MikeArnett-Git',
    linkLabel: 'case study →',
  },
  {
    id: 'spatial-canvas',
    name: 'spatial-canvas',
    headline: 'Spatial visualisation engine',
    description:
      'A domain-agnostic spatial visualisation engine — substrate, addons, and declarative ' +
      'worlds; metaphor-agnostic by design.',
    shortDescription: 'Domain-agnostic spatial visualisation engine',
    category: 'engine / rendering',
    tag: 'engine',
    span: 5,
    href: 'https://github.com/MikeArnett-Git',
    linkLabel: 'case study →',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    headline: 'Composable media pipelines',
    description:
      'Composable AI + programmatic media pipelines. Flagship pipeline: images → accurate, ' +
      'refinable 3D.',
    shortDescription: 'Composable AI + programmatic media pipelines; images → 3D',
    category: 'pipelines / 3D',
    tag: 'pipelines',
    span: 6,
    href: 'https://github.com/MikeArnett-Git',
    linkLabel: 'case study →',
  },
  {
    id: 'card-tracker',
    name: 'CardTracker',
    headline: 'Vision-pipeline inventory',
    description:
      'Vision-pipeline inventory tracking + resale-value analytics — trading cards now, ' +
      'anything inventoried later.',
    shortDescription: 'Vision-pipeline inventory + resale-value analytics',
    category: 'vision / analytics',
    tag: 'vision',
    span: 6,
    href: 'https://github.com/MikeArnett-Git',
    linkLabel: 'case study →',
  },
  {
    id: 'this-site',
    name: 'this-site',
    headline: 'A fully-inspectable example of the practices above',
    description:
      'This site is a live, fully-inspectable example of the practices above — with links ' +
      'to source, the decision log, and commits.',
    shortDescription: "A live, inspectable example — you're looking at it",
    category: 'self-reference / open source',
    tag: 'live',
    status: 'live',
    span: 12,
    href: '/app',
    linkLabel: 'source · decisions · commits →',
  },
];
