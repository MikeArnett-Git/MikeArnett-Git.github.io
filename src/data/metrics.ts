/**
 * Metrics — headline proof points (Compass / Griddle outcomes). Rendered by
 * StatTiles (page layout, lead + accent + trail) and the /app overview proof
 * grid (key + mono value + context). Single source so a figure changes once.
 */
import type { Metric } from './types';

export const metrics: Metric[] = [
  {
    key: 'render latency',
    value: '15s → <1s',
    lead: '15s → ',
    accent: '<1s',
    tone: 'accent',
    context: 'Griddle timetable grid rebuild — Compass',
  },
  {
    key: 'regressions',
    value: '0',
    accent: '0',
    trail: ' regressions',
    tone: 'accent',
    context: 'decade-old monolith migrated',
  },
  {
    key: 'deploy reach',
    value: 'Every school',
    accent: 'every',
    trail: ' school',
    tone: 'live',
    context: 'shipped to every Compass school',
  },
];
