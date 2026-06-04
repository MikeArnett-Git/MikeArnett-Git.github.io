/**
 * Profile — single source of truth for identity, positioning, location, and the
 * canonical locked summary (reference/voice-profile.md). Consumed by Hero,
 * Footer, the app-shell brand, and the /app overview.
 * Contact is GitHub-only for now (A3 deferred — no personal email/phone on site).
 */
import type { Profile } from './types';

export const profile: Profile = {
  name: 'Mike Arnett',
  title: 'Senior full-stack software engineer — AI systems & developer tools',
  shortTitle: 'Software Engineer',
  tagline: '// architecture, interfaces over complex data, governed AI agents',
  summaryLead: 'Senior full-stack software engineer — AI systems and developer tools.',
  summaryBody:
    'Flexible, maintainable architecture and intuitive interfaces over complex data; ' +
    'legacy monoliths migrated without regressions; AI agents kept scoped, consistent, ' +
    'auditable. High-performance, data-driven products delivered end-to-end, from R&D to production.',
  location: 'Melbourne, AU',
  locationDetail: 'Melbourne, AU (outer suburbs)',
  github: 'https://github.com/MikeArnett-Git',
  githubHandle: 'MikeArnett-Git',
  availability: ['AU remote / hybrid', 'Remote-international'],
  availabilityLine:
    'Open to AU remote / hybrid and remote-international roles in AI systems and developer tooling.',
  availableFor: [
    'Senior / staff full-stack roles',
    'AI agent systems & developer tooling',
    'AU remote / hybrid · remote-international',
  ],
  about: [
    'I’m a senior full-stack engineer working in AI systems and developer tools. The throughline across everything I build is the same: flexible, maintainable architecture and intuitive interfaces over complex data, with AI agents kept scoped, consistent, and auditable.',
    'I deliver high-performance, data-driven products end-to-end, from R&D to production — migrating legacy monoliths without regressions and setting the patterns teams build on. I work at the level of architecture and technical leadership, and I’m drawn to problems where getting the data model and the abstractions right is most of the battle.',
  ],
};
