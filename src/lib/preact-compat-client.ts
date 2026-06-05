/**
 * Minimal React 18 client API (createRoot / hydrateRoot) backed by Preact.
 *
 * @astrojs/react's client entry hydrates islands via `react-dom/client`'s
 * createRoot/hydrateRoot, which preact/compat (10.x) does not expose. This shim
 * is aliased to `react-dom/client` in astro.config.mjs so the island runs on the
 * Preact runtime (~4 KB) while keeping the React renderer/API. See D4 (revised).
 */
import { type ComponentChild, hydrate, render } from 'preact';

type Container = Element | Document | ShadowRoot | DocumentFragment;

interface Root {
  render(children: ComponentChild): void;
  unmount(): void;
}

function makeRoot(container: Container): Root {
  return {
    render(children) {
      render(children, container as Element);
    },
    unmount() {
      render(null, container as Element);
    },
  };
}

export function createRoot(container: Container): Root {
  return makeRoot(container);
}

/**
 * NOTE: the returned root's `render()` does a fresh `render()`, not incremental
 * hydration — fine for our usage (islands hydrate once; ControlPanel is
 * `client:only`, so it goes through `createRoot` and never calls this). If an
 * island is ever switched to a `client:load`/`client:visible` directive AND
 * relies on post-hydration `root.render()` re-renders, revisit this.
 */
export function hydrateRoot(container: Container, children: ComponentChild): Root {
  hydrate(children, container as Element);
  return makeRoot(container);
}

export default { createRoot, hydrateRoot };
