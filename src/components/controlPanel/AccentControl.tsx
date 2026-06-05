/**
 * AccentControl — presentational sub-component.
 * Renders the accent hue slider and optional "Reset to theme default" button.
 * Pure function: receives values + callbacks via props; no store access.
 */

import type React from 'react';
import {
  accentPreview,
  accentRow,
  accentSlider,
  accentSliderRow,
  resetBtn,
  section,
  sectionLabel,
} from '../ControlPanel.css';

interface Props {
  accentHue: number;
  isDefaultHue: boolean;
  onSetAccentHue: (hue: number) => void;
  onResetAccentHue: () => void;
}

export function AccentControl({
  accentHue,
  isDefaultHue,
  onSetAccentHue,
  onResetAccentHue,
}: Props): React.ReactElement {
  const accentPreviewColor = `oklch(70% 0.18 ${accentHue})`;

  return (
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
            value={accentHue}
            aria-label={`Accent hue: ${Math.round(accentHue)}°`}
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={Math.round(accentHue)}
            onChange={(e) => onSetAccentHue(Number(e.target.value))}
          />
          <span
            className={accentPreview}
            style={{ background: accentPreviewColor }}
            aria-hidden="true"
          />
        </div>
        {!isDefaultHue && (
          <button type="button" className={resetBtn} onClick={onResetAccentHue}>
            Reset to theme default
          </button>
        )}
      </div>
    </div>
  );
}
