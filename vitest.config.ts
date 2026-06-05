/// <reference types="vitest/config" />
/**
 * Vitest config — inherits Astro's Vite pipeline so that vanilla-extract
 * .css.ts files and the react→preact alias resolve in tests exactly as they
 * do in the build (D4 / D17).
 *
 * getViteConfig merges the full Astro Vite config (including the VE plugin
 * and the react→preact alias from astro.config.mjs) into the returned config.
 * The `/// <reference types="vitest/config" />` above augments Vite's config
 * type with Vitest's `test` property (the official Astro testing setup).
 */
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  // @ts-expect-error — getViteConfig types its argument as Astro's `UserConfig`,
  // which has no `test` key. Vitest's augmentation targets Vite's `UserConfig`,
  // and a Vite 8 (project) vs Vite 6 (Vitest-bundled types) version skew blocks a
  // precise cast. This directive errors if the skew is ever resolved — remove it then.
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts'],
  },
});
