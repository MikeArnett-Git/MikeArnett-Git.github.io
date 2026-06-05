/**
 * ThemeLayoutGrid — presentational sub-component.
 * Renders the Design shortcut row, Theme selector, and Layout selector.
 * Pure function: receives values + callbacks via props; no store access.
 */

import type React from 'react';
import type { Layout, Theme } from '../../lib/theme';
import {
  divider,
  presetBtn,
  presetDot,
  presetRow,
  section,
  sectionLabel,
} from '../ControlPanel.css';
import { DESIGNS, type DesignMeta, designDot, LAYOUTS, THEMES } from './options';

interface Props {
  currentTheme: Theme;
  currentLayout: Layout;
  activeDesign: DesignMeta | null;
  onApplyDesign: (name: Theme) => void;
  onSetTheme: (theme: Theme) => void;
  onSetLayout: (layout: Layout) => void;
}

export function ThemeLayoutGrid({
  currentTheme,
  currentLayout,
  activeDesign,
  onApplyDesign,
  onSetTheme,
  onSetLayout,
}: Props): React.ReactElement {
  return (
    <>
      {/* ── Design shortcut row (A/B/C — snaps both axes) ───────────── */}
      <div className={section}>
        <span className={sectionLabel}>Design</span>
        <fieldset className={presetRow} aria-label="Choose whole design (snaps theme + layout)">
          {DESIGNS.map((d) => (
            <button
              key={d.name}
              type="button"
              className={presetBtn}
              aria-pressed={activeDesign?.name === d.name}
              aria-label={`Design ${d.shortcut}: ${d.label}`}
              onClick={() => onApplyDesign(d.name)}
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
        </fieldset>
      </div>

      <hr className={divider} />

      {/* ── Theme selector (styling axis only) ──────────────────────── */}
      <div className={section}>
        <span className={sectionLabel}>Theme</span>
        <fieldset className={presetRow} aria-label="Choose theme (styling only)">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={presetBtn}
              aria-pressed={currentTheme === t.id}
              aria-label={`${t.label} theme`}
              onClick={() => onSetTheme(t.id)}
            >
              <span
                className={presetDot}
                style={{ background: designDot(t.id) }}
                aria-hidden="true"
              />
              <span style={{ fontSize: '0.6rem' }}>{t.label}</span>
            </button>
          ))}
        </fieldset>
      </div>

      {/* ── Layout selector (structure axis only) ────────────────────── */}
      <div className={section}>
        <span className={sectionLabel}>Layout</span>
        <fieldset className={presetRow} aria-label="Choose layout (structure only)">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              type="button"
              className={presetBtn}
              aria-pressed={currentLayout === l.id}
              aria-label={`${l.label} layout`}
              onClick={() => onSetLayout(l.id)}
            >
              <span style={{ fontSize: '0.6rem' }}>{l.label}</span>
            </button>
          ))}
        </fieldset>
      </div>
    </>
  );
}
