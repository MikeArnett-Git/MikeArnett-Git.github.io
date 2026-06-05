/**
 * ControlPanel — React island (client:only).
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

import { navigate } from 'astro:transitions/client';
import { useStore } from '@nanostores/react';
import type React from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  applyTheme,
  type Density,
  type Layout,
  parseThemeState,
  registerThemeClasses,
  type Theme,
  themeStore,
} from '../lib/theme';
import { calmConsoleTheme } from '../styles/presets/calm-console.css';
import { controlPlaneTheme } from '../styles/presets/control-plane.css';
import { editorialTheme } from '../styles/presets/editorial.css';
import { kineticTheme } from '../styles/presets/kinetic.css';
import { closeBtn, divider, panel, panelHeader, panelTitle, toggleBtn } from './ControlPanel.css';
import { AccentControl } from './controlPanel/AccentControl';
import { useFocusOnOpen, useFocusTrap, useOutsideClick } from './controlPanel/hooks';
import { MotionDensityControl } from './controlPanel/MotionDensityControl';
import { DESIGNS, defaultHueForTheme, isOnApp } from './controlPanel/options';
import { ThemeLayoutGrid } from './controlPanel/ThemeLayoutGrid';

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
      editorial: editorialTheme,
      kinetic: kineticTheme,
      'calm-console': calmConsoleTheme,
    });
  }, []);

  // UX hooks: focus-trap (Escape), outside-click dismiss, focus-on-open
  useFocusTrap(open, setOpen, toggleRef);
  useOutsideClick(open, setOpen, panelRef, toggleRef);
  useFocusOnOpen(open, panelRef);

  // ── Write helpers ──────────────────────────────────────────────────────────

  /**
   * Design shortcut: snaps BOTH theme + layout to the same named design.
   * Also resets accent hue to the design's default.
   */
  const applyDesign = useCallback(
    (name: Theme) => {
      const meta = DESIGNS.find((d) => d.name === name);
      const layout: Layout = meta ? meta.layoutName : (name as Layout);
      const hue = defaultHueForTheme(name);
      themeStore.setKey('theme', name);
      themeStore.setKey('layout', layout);
      themeStore.setKey('accentHue', String(hue));
      // D19: crossing the page ↔ app-shell boundary is a route navigation
      // (View Transitions); the target page re-applies theme on astro:after-swap.
      if (layout === 'dashboard') {
        if (!isOnApp()) {
          navigate('/app');
          return;
        }
      } else if (isOnApp()) {
        navigate('/');
        return;
      }
      applyTheme({ ...state, theme: name, layout, accentHue: hue });
    },
    [state],
  );

  /**
   * Theme-only switch: changes styling axis, leaves layout axis unchanged.
   * Also resets accent hue to the new theme's default so it looks intentional.
   */
  const setTheme = useCallback(
    (theme: Theme) => {
      const hue = defaultHueForTheme(theme);
      themeStore.setKey('theme', theme);
      themeStore.setKey('accentHue', String(hue));
      applyTheme({ ...state, theme, accentHue: hue });
    },
    [state],
  );

  /**
   * Layout-only switch: changes structure axis, leaves theme axis unchanged.
   */
  const setLayout = useCallback(
    (layout: Layout) => {
      themeStore.setKey('layout', layout);
      // D19: switching into/out of the dashboard layout is a route navigation.
      if (layout === 'dashboard') {
        if (!isOnApp()) {
          navigate('/app');
          return;
        }
      } else if (isOnApp()) {
        navigate('/');
        return;
      }
      applyTheme({ ...state, layout });
    },
    [state],
  );

  const setAccentHue = useCallback(
    (hue: number) => {
      themeStore.setKey('accentHue', String(hue));
      applyTheme({ ...state, accentHue: hue });
    },
    [state],
  );

  const resetAccentHue = useCallback(() => {
    const hue = defaultHueForTheme(state.theme);
    themeStore.setKey('accentHue', String(hue));
    applyTheme({ ...state, accentHue: hue });
  }, [state]);

  const setMotion = useCallback(
    (on: boolean) => {
      themeStore.setKey('motion', String(on));
      applyTheme({ ...state, motion: on });
    },
    [state],
  );

  const setDensity = useCallback(
    (density: Density) => {
      themeStore.setKey('density', density);
      applyTheme({ ...state, density });
    },
    [state],
  );

  // ── Derived display ────────────────────────────────────────────────────────

  const isDefaultHue = state.accentHue === defaultHueForTheme(state.theme);

  // A design shortcut is "active" only when BOTH axes match it — compare layout
  // against the design's layoutName (D3 = calm-console theme + dashboard layout).
  const activeDesign =
    DESIGNS.find((d) => d.name === state.theme && state.layout === d.layoutName) ?? null;

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
        onClick={() => setOpen((o) => !o)}
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

          <ThemeLayoutGrid
            currentTheme={state.theme}
            currentLayout={state.layout}
            activeDesign={activeDesign}
            onApplyDesign={applyDesign}
            onSetTheme={setTheme}
            onSetLayout={setLayout}
          />

          <hr className={divider} />

          <AccentControl
            accentHue={state.accentHue}
            isDefaultHue={isDefaultHue}
            onSetAccentHue={setAccentHue}
            onResetAccentHue={resetAccentHue}
          />

          <hr className={divider} />

          <MotionDensityControl
            motion={state.motion}
            density={state.density}
            onSetMotion={setMotion}
            onSetDensity={setDensity}
          />
        </div>
      )}
    </>
  );
}
