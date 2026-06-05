/**
 * MotionDensityControl — presentational sub-component.
 * Renders the Motion (on/off) and Density (comfortable/compact) toggle rows.
 * Pure function: receives values + callbacks via props; no store access.
 */

import type React from 'react';
import type { Density } from '../../lib/theme';
import { toggleGroup, toggleLabel, toggleOptionBtn, toggleRow } from '../ControlPanel.css';

interface Props {
  motion: boolean;
  density: Density;
  onSetMotion: (on: boolean) => void;
  onSetDensity: (density: Density) => void;
}

export function MotionDensityControl({
  motion,
  density,
  onSetMotion,
  onSetDensity,
}: Props): React.ReactElement {
  return (
    <>
      {/* ── Motion ───────────────────────────────────────────────────── */}
      <div className={toggleRow}>
        <span className={toggleLabel}>Motion</span>
        <fieldset className={toggleGroup} aria-label="Motion preference">
          <button
            type="button"
            className={toggleOptionBtn}
            aria-pressed={motion}
            onClick={() => onSetMotion(true)}
          >
            On
          </button>
          <button
            type="button"
            className={toggleOptionBtn}
            aria-pressed={!motion}
            onClick={() => onSetMotion(false)}
          >
            Off
          </button>
        </fieldset>
      </div>

      {/* ── Density ──────────────────────────────────────────────────── */}
      <div className={toggleRow}>
        <span className={toggleLabel}>Density</span>
        <fieldset className={toggleGroup} aria-label="Density preference">
          {(['comfortable', 'compact'] as Density[]).map((d) => (
            <button
              key={d}
              type="button"
              className={toggleOptionBtn}
              aria-pressed={density === d}
              onClick={() => onSetDensity(d)}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </fieldset>
      </div>
    </>
  );
}
