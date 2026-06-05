/**
 * Data-layer invariants — pure, no DOM.
 * All assertions target real module exports; no stubs.
 */
import { describe, expect, it } from 'vitest';
import { caseStudies } from './caseStudies';
import { experience } from './experience';
import { appNav, pageNav } from './nav';
import { profile } from './profile';
import { projects } from './projects';
import { skills } from './skills';

// ─── Projects ───────────────────────────────────────────────────────────────

describe('projects', () => {
  const VALID_SPANS = [5, 6, 7, 12] as const;

  it('every span is one of the allowed values (5|6|7|12)', () => {
    for (const p of projects) {
      expect(
        VALID_SPANS.includes(p.span as 5 | 6 | 7 | 12),
        `project "${p.id}" has invalid span ${p.span}`,
      ).toBe(true);
    }
  });

  it('project ids are unique', () => {
    const ids = projects.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('every project has a non-empty id, name, href, and linkLabel', () => {
    for (const p of projects) {
      expect(p.id.length, `project id empty`).toBeGreaterThan(0);
      expect(p.name.length, `project "${p.id}" name empty`).toBeGreaterThan(0);
      expect(p.href.length, `project "${p.id}" href empty`).toBeGreaterThan(0);
      expect(p.linkLabel.length, `project "${p.id}" linkLabel empty`).toBeGreaterThan(0);
    }
  });
});

// ─── Case studies ───────────────────────────────────────────────────────────

describe('caseStudies', () => {
  it('slugs are unique', () => {
    const slugs = caseStudies.map((c) => c.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it('every case study has a non-empty slug, title, and summary', () => {
    for (const c of caseStudies) {
      expect(c.slug.length, `caseStudy slug empty`).toBeGreaterThan(0);
      expect(c.title.length, `caseStudy "${c.slug}" title empty`).toBeGreaterThan(0);
      expect(c.summary.length, `caseStudy "${c.slug}" summary empty`).toBeGreaterThan(0);
    }
  });
});

// ─── Nav ────────────────────────────────────────────────────────────────────

describe('pageNav', () => {
  it('every page nav item has a non-empty href and label', () => {
    expect(pageNav.length).toBeGreaterThan(0);
    for (const item of pageNav) {
      expect(item.href.length, `pageNav "${item.id}" href empty`).toBeGreaterThan(0);
      expect(item.label.length, `pageNav "${item.id}" label empty`).toBeGreaterThan(0);
    }
  });
});

describe('appNav', () => {
  it('every app nav item has a non-empty href and label', () => {
    expect(appNav.length).toBeGreaterThan(0);
    for (const item of appNav) {
      expect(item.href.length, `appNav "${item.id}" href empty`).toBeGreaterThan(0);
      expect(item.label.length, `appNav "${item.id}" label empty`).toBeGreaterThan(0);
    }
  });
});

// ─── Profile ────────────────────────────────────────────────────────────────

describe('profile', () => {
  it('has non-empty name, title, and github', () => {
    expect(profile.name.length).toBeGreaterThan(0);
    expect(profile.title.length).toBeGreaterThan(0);
    expect(profile.github.length).toBeGreaterThan(0);
  });

  it('availability is a non-empty array', () => {
    expect(Array.isArray(profile.availability)).toBe(true);
    expect(profile.availability.length).toBeGreaterThan(0);
  });
});

// ─── Experience ─────────────────────────────────────────────────────────────

describe('experience', () => {
  it('is non-empty', () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it('every record has org, role, and period', () => {
    for (const role of experience) {
      expect(role.org.length, `experience "${role.id}" org empty`).toBeGreaterThan(0);
      expect(role.role.length, `experience "${role.id}" role empty`).toBeGreaterThan(0);
      expect(role.period.length, `experience "${role.id}" period empty`).toBeGreaterThan(0);
    }
  });

  it('compass-griddle record exists', () => {
    const griddle = experience.find((r) => r.id === 'compass-griddle');
    expect(griddle).toBeDefined();
  });

  it('compass-griddle featuredWidget has non-empty problem and method', () => {
    const fw = experience.find((r) => r.id === 'compass-griddle')?.featuredWidget;
    expect(fw).toBeDefined();
    expect(fw?.problem.length).toBeGreaterThan(0);
    expect(fw?.method.length).toBeGreaterThan(0);
  });
});

// ─── Skills ─────────────────────────────────────────────────────────────────

describe('skills', () => {
  it('is non-empty', () => {
    expect(skills.length).toBeGreaterThan(0);
  });

  it('every entry has non-empty name, level, and pct', () => {
    for (const s of skills) {
      expect(s.name.length, `skill name empty`).toBeGreaterThan(0);
      expect(s.level.length, `skill "${s.name}" level empty`).toBeGreaterThan(0);
      expect(s.pct.length, `skill "${s.name}" pct empty`).toBeGreaterThan(0);
    }
  });

  it('pct values are percentage strings matching NN%', () => {
    for (const s of skills) {
      expect(s.pct, `skill "${s.name}" pct not a percentage string`).toMatch(/^\d+%$/);
    }
  });
});
