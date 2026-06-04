/**
 * Navigation — single source of truth for both navigations:
 *  • pageNav  — section anchors on the page-layout site (/) used by Nav.
 *  • appNav   — real /app/* routes used by the dashboard sidebar; the command
 *               palette is derived from it (+ a "switch to page view" item).
 * Add or rename a destination once, here, and it updates everywhere.
 */
import type { NavLink, AppNavItem, PaletteItem } from './types';

export const pageNav: NavLink[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'practices', label: 'Practices', href: '#practices' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'resume', label: 'Résumé', href: '#resume', cta: true },
];

const ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';

export const appNav: AppNavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/app',
    hint: 'dashboard home',
    icon: `${ICON}<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
  },
  {
    id: 'experience',
    label: 'Experience',
    href: '/app/experience',
    icon: `${ICON}<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/app/projects',
    icon: `${ICON}<path d="M3 9 12 4l9 5-9 5-9-5Z"/><path d="m3 14 9 5 9-5"/></svg>`,
  },
  {
    id: 'practices',
    label: 'Practices',
    href: '/app/practices',
    icon: `${ICON}<path d="m8 3 1.5 5.5L15 10l-5.5 1.5L8 17l-1.5-5.5L1 10l5.5-1.5L8 3Z"/><path d="M18 14l.8 2.7L21.5 18l-2.7.8L18 21.5l-.8-2.7L14.5 18l2.7-.8L18 14Z"/></svg>`,
  },
  {
    id: 'about',
    label: 'About',
    href: '/app/about',
    icon: `${ICON}<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
  },
  {
    id: 'resume',
    label: 'Résumé',
    href: '/app/resume',
    icon: `${ICON}<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/></svg>`,
  },
];

/** Command-palette destinations — derived from appNav + the page-view switch. */
export const paletteItems: PaletteItem[] = [
  ...appNav.map((n) => ({ id: n.id, label: n.label, href: n.href, hint: n.hint ?? '' })),
  { id: 'page-view', label: 'Switch to page view', href: '/', hint: 'page layouts' },
];
