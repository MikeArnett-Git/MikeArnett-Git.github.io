/**
 * Reusable UI hooks for the ControlPanel island.
 * Pure hook functions — all inputs come via parameters (refs + callbacks).
 * No module-level state; no closure over parent state.
 * Imports are Preact-compatible via the project's compat alias.
 */

import { useEffect } from 'react';

/**
 * Closes the panel on Escape and returns focus to the toggle button.
 * Only active when `open` is true.
 */
export function useFocusTrap(
  open: boolean,
  setOpen: (open: boolean) => void,
  toggleRef: React.RefObject<HTMLButtonElement | null>,
): void {
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
  }, [open, setOpen, toggleRef]);
}

/**
 * Closes the panel when a pointer-down event occurs outside both the panel
 * container and the toggle button.
 * Only active when `open` is true.
 */
export function useOutsideClick(
  open: boolean,
  setOpen: (open: boolean) => void,
  panelRef: React.RefObject<HTMLDivElement | null>,
  toggleRef: React.RefObject<HTMLButtonElement | null>,
): void {
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
  }, [open, setOpen, panelRef, toggleRef]);
}

/**
 * Moves focus to the first focusable element inside the panel when it opens.
 */
export function useFocusOnOpen(
  open: boolean,
  panelRef: React.RefObject<HTMLDivElement | null>,
): void {
  useEffect(() => {
    if (open && panelRef.current) {
      const first = panelRef.current.querySelector<HTMLElement>(
        'button, [tabindex]:not([tabindex="-1"]), input',
      );
      first?.focus();
    }
  }, [open, panelRef]);
}
