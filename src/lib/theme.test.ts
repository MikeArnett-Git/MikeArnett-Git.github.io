/**
 * Theme controller — unit tests for the store, parser, and constants.
 * Uses jsdom for localStorage (nanostores persistent reads it).
 * Does NOT test applyTheme (DOM side-effects) or registerThemeClasses (runtime only).
 */
import { beforeEach, describe, expect, it } from 'vitest';

import {
  DESIGN_DEFAULTS,
  type PersistentThemeState,
  parseThemeState,
  STORAGE_PREFIX,
  THEME_DEFAULTS,
  themeStore,
} from './theme';

// ─── Constants ───────────────────────────────────────────────────────────────

describe('THEME_DEFAULTS', () => {
  it('has expected shape: calm-console theme + dashboard layout (D23)', () => {
    expect(THEME_DEFAULTS.theme).toBe('calm-console');
    expect(THEME_DEFAULTS.layout).toBe('dashboard');
    expect(THEME_DEFAULTS.mode).toBe('dark');
    expect(typeof THEME_DEFAULTS.accentHue).toBe('number');
    expect(THEME_DEFAULTS.fontSet.length).toBeGreaterThan(0);
    expect(typeof THEME_DEFAULTS.motion).toBe('boolean');
    expect(THEME_DEFAULTS.density.length).toBeGreaterThan(0);
  });
});

describe('STORAGE_PREFIX', () => {
  it('is a non-empty string', () => {
    expect(typeof STORAGE_PREFIX).toBe('string');
    expect(STORAGE_PREFIX.length).toBeGreaterThan(0);
  });
});

describe('DESIGN_DEFAULTS', () => {
  it('covers all four theme names', () => {
    const themes = ['control-plane', 'editorial', 'kinetic', 'calm-console'] as const;
    for (const t of themes) {
      expect(DESIGN_DEFAULTS[t]).toBeDefined();
      expect(typeof DESIGN_DEFAULTS[t].accentHue).toBe('number');
    }
  });

  it('each accentHue is in [0, 360]', () => {
    for (const [name, def] of Object.entries(DESIGN_DEFAULTS)) {
      expect(def.accentHue, `${name} accentHue out of [0,360]`).toBeGreaterThanOrEqual(0);
      expect(def.accentHue, `${name} accentHue out of [0,360]`).toBeLessThanOrEqual(360);
    }
  });
});

// ─── parseThemeState ─────────────────────────────────────────────────────────

describe('parseThemeState', () => {
  const buildRaw = (overrides: Partial<PersistentThemeState> = {}): PersistentThemeState => ({
    theme: THEME_DEFAULTS.theme,
    layout: THEME_DEFAULTS.layout,
    mode: THEME_DEFAULTS.mode,
    accentHue: String(THEME_DEFAULTS.accentHue),
    fontSet: THEME_DEFAULTS.fontSet,
    motion: String(THEME_DEFAULTS.motion),
    density: THEME_DEFAULTS.density,
    ...overrides,
  });

  it('round-trips default values correctly', () => {
    const parsed = parseThemeState(buildRaw());
    expect(parsed.theme).toBe(THEME_DEFAULTS.theme);
    expect(parsed.layout).toBe(THEME_DEFAULTS.layout);
    expect(parsed.mode).toBe(THEME_DEFAULTS.mode);
    expect(parsed.accentHue).toBe(THEME_DEFAULTS.accentHue);
    expect(parsed.fontSet).toBe(THEME_DEFAULTS.fontSet);
    expect(parsed.motion).toBe(THEME_DEFAULTS.motion);
    expect(parsed.density).toBe(THEME_DEFAULTS.density);
  });

  it('parses accentHue string to number', () => {
    const parsed = parseThemeState(buildRaw({ accentHue: '180' }));
    expect(parsed.accentHue).toBe(180);
    expect(typeof parsed.accentHue).toBe('number');
  });

  it('parses motion "true" → true and "false" → false', () => {
    expect(parseThemeState(buildRaw({ motion: 'true' })).motion).toBe(true);
    expect(parseThemeState(buildRaw({ motion: 'false' })).motion).toBe(false);
  });

  it('falls back to THEME_DEFAULTS.accentHue when accentHue is NaN-producing string', () => {
    const parsed = parseThemeState(buildRaw({ accentHue: 'not-a-number' }));
    expect(parsed.accentHue).toBe(THEME_DEFAULTS.accentHue);
  });
});

// ─── themeStore (nanostores persistent) ─────────────────────────────────────

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('store snapshot has all expected keys', () => {
    const snap = themeStore.get();
    expect(snap).toHaveProperty('theme');
    expect(snap).toHaveProperty('layout');
    expect(snap).toHaveProperty('mode');
    expect(snap).toHaveProperty('accentHue');
    expect(snap).toHaveProperty('fontSet');
    expect(snap).toHaveProperty('motion');
    expect(snap).toHaveProperty('density');
  });

  it('setKey updates the store value', () => {
    themeStore.setKey('theme', 'editorial');
    expect(themeStore.get().theme).toBe('editorial');

    // restore
    themeStore.setKey('theme', THEME_DEFAULTS.theme);
  });
});
