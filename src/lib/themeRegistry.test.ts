/**
 * Theme registry — unit tests.
 * Verifies that themeClasses has exactly the four expected ThemeName keys,
 * each mapped to a non-empty VE class string, and that defaultThemeClass
 * falls back to calm-console (the configured THEME_DEFAULTS.theme, D23).
 */
import { describe, expect, it } from 'vitest';
import { THEME_DEFAULTS } from './theme';
import { defaultThemeClass, type ThemeName, themeClasses } from './themeRegistry';

const EXPECTED_THEME_NAMES: ThemeName[] = ['control-plane', 'editorial', 'kinetic', 'calm-console'];

describe('themeClasses', () => {
  it('has exactly the four ThemeName keys', () => {
    const keys = Object.keys(themeClasses).sort();
    expect(keys).toEqual([...EXPECTED_THEME_NAMES].sort());
  });

  it('every value is a non-empty string (the VE class hash)', () => {
    for (const name of EXPECTED_THEME_NAMES) {
      const cls = themeClasses[name];
      expect(typeof cls, `themeClasses["${name}"] is not a string`).toBe('string');
      expect(cls.length, `themeClasses["${name}"] is empty`).toBeGreaterThan(0);
    }
  });

  it('all four class values are distinct (no accidental aliasing)', () => {
    const values = Object.values(themeClasses);
    const unique = new Set(values);
    expect(unique.size).toBe(values.length);
  });
});

describe('defaultThemeClass', () => {
  it('returns the class for a valid theme name', () => {
    for (const name of EXPECTED_THEME_NAMES) {
      const cls = defaultThemeClass(name);
      expect(cls).toBe(themeClasses[name]);
    }
  });

  it('falls back to the THEME_DEFAULTS.theme class for an unknown name', () => {
    const fallback = defaultThemeClass('not-a-theme');
    const expectedDefault = themeClasses[THEME_DEFAULTS.theme as ThemeName];
    expect(fallback).toBe(expectedDefault);
    // Confirm the default is calm-console (D23)
    expect(THEME_DEFAULTS.theme).toBe('calm-console');
  });

  it('returns a non-empty string for any input', () => {
    expect(defaultThemeClass('nonsense').length).toBeGreaterThan(0);
    expect(defaultThemeClass('').length).toBeGreaterThan(0);
  });
});
