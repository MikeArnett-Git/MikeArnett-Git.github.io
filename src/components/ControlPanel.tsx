/**
 * ControlPanel — React island (client:idle).
 *
 * D17: two independent axes — Theme (styling) and Layout (structure).
 * D19: Layout=Dashboard navigates to /app; page layouts navigate to /.
 *
 * Pure consumer of the themeStore controller (D15 / D17).
 * No parallel state — reads via useStore(themeStore), writes via
 * themeStore.setKey() + applyTheme(). Persistence is automatic via
 * @nanostores/persistent (key prefix 'mikearnett.theme:').
 *
 * Controls (top to bottom):
 *   • Design shortcut row  — A=editorial / B=control-plane / C=kinetic / D3=calm-console+dashboard
 *                            each calls applyDesign(), snapping both axes
 *   • Theme selector (4)   — switches styling axis only (layout unchanged)
 *   • Layout selector (4)  — switches structure axis only (theme unchanged);
 *                            Dashboard → navigate to /app; others → navigate to / if on /app
 *   • Accent hue           — 0–360 slider + "reset to theme default" link
 *   • Motion               — on / off
 *   • Density              — comfortable / compact
 */

import { useStore } from '@nanostores/react';
import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {
  applyTheme,
  parseThemeState,
  registerThemeClasses,
  themeStore,
  THEME_DEFAULTS,
  DESIGN_DEFAULTS,
  type Density,
  type Theme,
  type Layout,
} from '../lib/theme';
import { navigate } from 'astro:transitions/client';
import { controlPlaneTheme } from '../styles/presets/control-plane.css';
import { editorialTheme } from '../styles/presets/editorial.css';
import { kineticTheme } from '../styles/presets/kinetic.css';
import { calmConsoleTheme } from '../styles/presets/calm-console.css';
import {
  accentPreview,
  accentRow,
  accentSlider,
  accentSliderRow,
  closeBtn,
  divider,
  panel,
  panelHeader,
  panelTitle,
  presetBtn,
  presetDot,
  presetRow,
  resetBtn,
  section,
  sectionLabel,
  toggleBtn,
  toggleGroup,
  toggleLabel,
  toggleOptionBtn,
  toggleRow,
} from './ControlPanel.css';

// ── Design metadata (shortcut row A/B/C/D3) ──────────────────────────────────

interface DesignMeta {
  /** The theme name for this design shortcut. */
  name: Theme;
  /** Layout to snap to — for D3 this is 'dashboard', rest match theme name. */
  layoutName: Layout;
  /** Single letter/label shortcut. */
  shortcut: 'A' | 'B' | 'C' | 'D3';
  label: string;
}

// Swatch colours are derived from each theme's accent hue (DESIGN_DEFAULTS) via
// designDot() — no duplicated oklch literals to drift from the presets.
const DESIGNS: DesignMeta[] = [
  { name: 'editorial',     layoutName: 'editorial',     shortcut: 'A',  label: 'Editorial' },
  { name: 'control-plane', layoutName: 'control-plane', shortcut: 'B',  label: 'Control Plane' },
  { name: 'kinetic',       layoutName: 'kinetic',       shortcut: 'C',  label: 'Kinetic' },
  { name: 'calm-console',  layoutName: 'dashboard',     shortcut: 'D3', label: 'Calm Console' },
];

// ── Theme axis metadata ───────────────────────────────────────────────────────

interface ThemeMeta {
  id: Theme;
  label: string;
}

const THEMES: ThemeMeta[] = [
  { id: 'control-plane', label: 'Control Plane' },
  { id: 'editorial',     label: 'Editorial' },
  { id: 'kinetic',       label: 'Kinetic' },
  { id: 'calm-console',  label: 'Calm Console' },
];

// ── Layout axis metadata ──────────────────────────────────────────────────────

interface LayoutMeta {
  id: Layout;
  label: string;
}

const LAYOUTS: LayoutMeta[] = [
  { id: 'control-plane', label: 'Control Plane' },
  { id: 'editorial',     label: 'Editorial'     },
  { id: 'kinetic',       label: 'Kinetic'       },
  { id: 'dashboard',     label: 'Dashboard'     },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function defaultHueForTheme(theme: Theme): number {
  return DESIGN_DEFAULTS[theme]?.accentHue ?? THEME_DEFAULTS.accentHue;
}

/** Representative swatch colour for a theme — derived from its accent hue. */
function designDot(theme: Theme): string {
  return `oklch(70% 0.18 ${defaultHueForTheme(theme)})`;
}

/** True when the current route is a dashboard app-shell route (/app or /app/*). */
function isOnApp(): boolean {
  return (
    typeof window !== 'undefined' &&
    (window.location.pathname === '/app' || window.location.pathname.startsWith('/app/'))
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ControlPanel(): React.ReactElement {
  const raw = useStore(themeStore);
  const state = parseThemeState(raw);

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const panelId = useId();
  const titleId = useId();

  // Register VE theme classes once on mount so applyTheme() can swap them.
  // registerThemeClasses is additive/idempotent.
  useEffect(() => {
    registerThemeClasses({
      'control-plane': controlPlaneTheme,
      'editorial': editorialTheme,
      'kinetic': kineticTheme,
      'calm-console': calmConsoleTheme,
    });
  }, []);

  // Close on Escape, focus-trap back to toggle button
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent): void {
      const target = e.target as Node | null;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  // Move focus into panel when it opens
  useEffect(() => {
    if (open && panelRef.current) {
      const first = panelRef.current.querySelector<HTMLElement>(
        'button, [tabindex]:not([tabindex="-1"]), input',
      );
      first?.focus();
    }
  }, [open]);

  // ── Write helpers ──────────────────────────────────────────────────────────

  /**
   * Design shortcut: snaps BOTH theme + layout to the same named design.
   * Also resets accent hue to the design's default.
   */
  const applyDesign = useCallback((name: Theme) => {
    const meta = DESIGNS.find(d => d.name === name);
    const layout: Layout = meta ? meta.layoutName : (name as Layout);
    const hue = defaultHueForTheme(name);
    themeStore.setKey('theme', name);
    themeStore.setKey('layout', layout);
    themeStore.setKey('accentHue', String(hue));
    // D19: crossing the page ↔ app-shell boundary is a route navigation
    // (View Transitions); the target page re-applies theme on astro:after-swap.
    if (layout === 'dashboard') {
      if (!isOnApp()) { navigate('/app'); return; }
    } else if (isOnApp()) {
      navigate('/'); return;
    }
    applyTheme({ ...state, theme: name, layout, accentHue: hue });
  }, [state]);

  /**
   * Theme-only switch: changes styling axis, leaves layout axis unchanged.
   * Also resets accent hue to the new theme's default so it looks intentional.
   */
  const setTheme = useCallback((theme: Theme) => {
    const hue = defaultHueForTheme(theme);
    themeStore.setKey('theme', theme);
    themeStore.setKey('accentHue', String(hue));
    applyTheme({ ...state, theme, accentHue: hue });
  }, [state]);

  /**
   * Layout-only switch: changes structure axis, leaves theme axis unchanged.
   */
  const setLayout = useCallback((layout: Layout) => {
    themeStore.setKey('layout', layout);
    // D19: switching into/out of the dashboard layout is a route navigation.
    if (layout === 'dashboard') {
      if (!isOnApp()) { navigate('/app'); return; }
    } else if (isOnApp()) {
      navigate('/'); return;
    }
    applyTheme({ ...state, layout });
  }, [state]);

  const setAccentHue = useCallback((hue: number) => {
    themeStore.setKey('accentHue', String(hue));
    applyTheme({ ...state, accentHue: hue });
  }, [state]);

  const resetAccentHue = useCallback(() => {
    const hue = defaultHueForTheme(state.theme);
    themeStore.setKey('accentHue', String(hue));
    applyTheme({ ...state, accentHue: hue });
  }, [state]);

  const setMotion = useCallback((on: boolean) => {
    themeStore.setKey('motion', String(on));
    applyTheme({ ...state, motion: on });
  }, [state]);

  const setDensity = useCallback((density: Density) => {
    themeStore.setKey('density', density);
    applyTheme({ ...state, density });
  }, [state]);

  // ── Derived display ────────────────────────────────────────────────────────

  const accentPreviewColor = `oklch(70% 0.18 ${state.accentHue})`;
  const isDefaultHue = state.accentHue === defaultHueForTheme(state.theme);

  // A design shortcut is "active" only when BOTH axes match it — compare layout
  // against the design's layoutName (D3 = calm-console theme + dashboard layout).
  const activeDesign = (DESIGNS.find(
    d => d.name === state.theme && state.layout === d.layoutName,
  ) ?? null);

  return (
    <>
      {/* ── Toggle button ──────────────────────────────────────────────── */}
      <button
        ref={toggleRef}
        type="button"
        className={toggleBtn}
        aria-label={open ? 'Close design controls' : 'Open design controls'}
        aria-expanded={open}
        aria-controls={panelId}
        data-open={open ? 'true' : 'false'}
        onClick={() => setOpen(o => !o)}
      >
        {/* Palette icon */}
        <svg
          aria-hidden="true"
          focusable="false"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="8.5" cy="14" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="14" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {/* ── Panel ──────────────────────────────────────────────────────── */}
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className={panel}
        >
          {/* Header */}
          <div className={panelHeader}>
            <span id={titleId} className={panelTitle}>
              Design
            </span>
            <button
              type="button"
              className={closeBtn}
              aria-label="Close design controls"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
            >
              ✕
            </button>
          </div>

          {/* ── Design shortcut row (A/B/C — snaps both axes) ─────────── */}
          <div className={section}>
            <span className={sectionLabel}>Design</span>
            <div className={presetRow} role="group" aria-label="Choose whole design (snaps theme + layout)">
              {DESIGNS.map(d => (
                <button
                  key={d.name}
                  type="button"
                  className={presetBtn}
                  aria-pressed={activeDesign?.name === d.name}
                  aria-label={`Design ${d.shortcut}: ${d.label}`}
                  onClick={() => applyDesign(d.name)}
                >
                  <span
                    className={presetDot}
                    style={{ background: designDot(d.name) }}
                    aria-hidden="true"
                  />
                  <span>{d.shortcut}</span>
                  <span style={{ opacity: 0.7, fontSize: '0.6rem' }}>{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={divider} role="separator" />

          {/* ── Theme selector (styling axis only) ────────────────────── */}
          <div className={section}>
            <span className={sectionLabel}>Theme</span>
            <div className={presetRow} role="group" aria-label="Choose theme (styling only)">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={presetBtn}
                  aria-pressed={state.theme === t.id}
                  aria-label={`${t.label} theme`}
                  onClick={() => setTheme(t.id)}
                >
                  <span
                    className={presetDot}
                    style={{ background: designDot(t.id) }}
                    aria-hidden="true"
                  />
                  <span style={{ fontSize: '0.6rem' }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Layout selector (structure axis only) ─────────────────── */}
          <div className={section}>
            <span className={sectionLabel}>Layout</span>
            <div className={presetRow} role="group" aria-label="Choose layout (structure only)">
              {LAYOUTS.map(l => (
                <button
                  key={l.id}
                  type="button"
                  className={presetBtn}
                  aria-pressed={state.layout === l.id}
                  aria-label={`${l.label} layout`}
                  onClick={() => setLayout(l.id)}
                >
                  <span style={{ fontSize: '0.6rem' }}>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={divider} role="separator" />

          {/* ── Accent hue ─────────────────────────────────────────────── */}
          <div className={section}>
            <span className={sectionLabel}>Accent colour</span>
            <div className={accentRow}>
              <div className={accentSliderRow}>
                <input
                  type="range"
                  className={accentSlider}
                  min={0}
                  max={360}
                  step={1}
                  value={state.accentHue}
                  aria-label={`Accent hue: ${Math.round(state.accentHue)}°`}
                  aria-valuemin={0}
                  aria-valuemax={360}
                  aria-valuenow={Math.round(state.accentHue)}
                  onChange={e => setAccentHue(Number(e.target.value))}
                />
                <span
                  className={accentPreview}
                  style={{ background: accentPreviewColor }}
                  aria-hidden="true"
                />
              </div>
              {!isDefaultHue && (
                <button
                  type="button"
                  className={resetBtn}
                  onClick={resetAccentHue}
                >
                  Reset to theme default
                </button>
              )}
            </div>
          </div>

          <div className={divider} role="separator" />

          {/* ── Motion ─────────────────────────────────────────────────── */}
          <div className={toggleRow}>
            <span className={toggleLabel}>Motion</span>
            <div className={toggleGroup} role="group" aria-label="Motion preference">
              <button
                type="button"
                className={toggleOptionBtn}
                aria-pressed={state.motion}
                onClick={() => setMotion(true)}
              >
                On
              </button>
              <button
                type="button"
                className={toggleOptionBtn}
                aria-pressed={!state.motion}
                onClick={() => setMotion(false)}
              >
                Off
              </button>
            </div>
          </div>

          {/* ── Density ────────────────────────────────────────────────── */}
          <div className={toggleRow}>
            <span className={toggleLabel}>Density</span>
            <div className={toggleGroup} role="group" aria-label="Density preference">
              {(['comfortable', 'compact'] as Density[]).map(d => (
                <button
                  key={d}
                  type="button"
                  className={toggleOptionBtn}
                  aria-pressed={state.density === d}
                  onClick={() => setDensity(d)}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
