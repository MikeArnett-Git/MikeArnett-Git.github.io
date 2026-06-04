/**
 * Skills — core stack + additional tooling, rendered by SkillsBars.
 * NOTE: the final skills list (D1) is not yet locked with Mike — this migrates
 * the existing working set; revisit when the reorg is confirmed.
 */
import type { Skill, ExtraTag } from './types';

export const skills: Skill[] = [
  { name: 'AI / agents', level: 'primary', pct: '95%' },
  { name: 'React / TypeScript', level: 'primary', pct: '93%' },
  { name: 'Node', level: 'primary', pct: '88%' },
  { name: 'C# / .NET', level: 'strong', pct: '83%' },
  { name: 'Java', level: 'strong', pct: '78%' },
  { name: 'GraphQL', level: 'strong', pct: '82%' },
  { name: 'SQL + NoSQL / warehousing', level: 'strong', pct: '85%' },
];

export const skillExtras: ExtraTag[] = [
  { label: 'AWS' },
  { label: 'Docker / K8s' },
  { label: 'Networking / home-lab' },
];
