# Styling conventions

How styles are organised, and where to look when you want to change something.
Two orthogonal axes drive every visual: **`data-theme`** (4 token themes — pure
styling) ⊥ **`data-layout`** (4 structures — control-plane / editorial / kinetic /
dashboard). There is **one** component/primitive set; designs are produced by
varying the two `data-*` attributes, never by forking components.

## Where styles live

| Concern | Location |
| --- | --- |
| Design **tokens** (the contract) | `src/styles/contract.css.ts` — a `createThemeContract`; every colour/space/type slot is declared here as `null`. |
| **Theme** values (what the tokens resolve to) | `src/styles/presets/{control-plane,editorial,kinetic,calm-console}.css.ts` — one `createTheme` each. TypeScript enforces that **every** preset fills **every** contract slot; a missing key is a compile error. |
| Theme **registry** (name → class) | `src/lib/themeRegistry.ts` — the single map both layouts + the pre-paint script consume. |
| Component **base** styles | a co-located `*.css.ts` next to the component (e.g. `ProjectGrid.css.ts`). |
| Per-axis **variation** | `globalStyle('[data-theme="x"] .cls', …)` / `globalStyle('[data-layout="y"] .cls', …)` at the **bottom** of that component's `*.css.ts`, under `// ── THEME axis` / `// ── LAYOUT axis` banner comments. |
| Shared container / app-view styles | `src/styles/layout.css.ts` (the `wrap` container), `src/styles/views/*` (dashboard view styles). |

## Finding things

- **"How does component X look in layout/theme Y?"** → open `X.css.ts`, search
  `[data-layout="Y"]` or `[data-theme="Y"]`. All of X's per-axis rules live in that
  one file, grouped at the bottom.
- **"Where does this colour come from?"** → it's a `contract.color.*` token; its
  value per design is in each `presets/*.css.ts`. Components must **not** contain
  raw `oklch()`/hex literals (see token discipline below).

## Common changes

- **Restyle a component in one layout** — edit (or add) the
  `globalStyle('[data-layout="…"] .cls', …)` block in that component's `*.css.ts`.
  Don't fork the component.
- **Add a theme** — add a `presets/<name>.css.ts` `createTheme` filling **all**
  contract slots (the compiler lists any you miss), register it in
  `themeRegistry.ts`, and add it to the controller's theme union in `src/lib/theme.ts`.
- **Add a token** — add the slot to `contract.css.ts`, then fill it in **all four**
  presets (compiler-enforced), then reference it as `contract.color.<slot>`.
- **Add a layout** — add `[data-layout="<name>"]` override blocks to the relevant
  components' `*.css.ts`; wire the option into the controller + control panel.

## Token discipline

Component `*.css.ts` files reference `contract.*` tokens only — **no raw
`oklch()`/hex/colour literals** (those belong in the presets, which is where colour
is defined per design). The live, user-adjustable accent uses the `--accent-hue`
CSS variable inside the preset token values, so accent-derived tokens stay
hue-reactive automatically. Keeping colour in the presets is what lets the
4 themes × 4 layouts matrix hold without per-design forks.
