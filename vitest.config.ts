/// <reference types="vitest/config" />
/**
 * Vitest config — inherits Astro's Vite pipeline so that vanilla-extract
 * .css.ts files resolve in tests exactly as they do in the build.
 *
 * getViteConfig merges the full Astro Vite config (including the VE plugin
 * from astro.config.mjs) into the returned config.
 * The `/// <reference types="vitest/config" />` above augments Vite's config
 * type with Vitest's `test` property (the official Astro testing setup).
 */
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts'],
  },
});
