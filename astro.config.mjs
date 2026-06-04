import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const reactDomClientShim = fileURLToPath(
  new URL('./src/lib/preact-compat-client.ts', import.meta.url),
);

// D4 (revised): the island keeps the React API + @astrojs/react renderer (which
// resolves cleanly here), but Vite aliases react/react-dom → preact/compat so the
// shipped runtime is Preact (~4 KB) instead of React (~58 KB) — keeping the
// homepage JS budget well under target. SSR uses preact-render-to-string.
// (@astrojs/preact's renderer fails to build with Astro 5.18 here — virtual
// module `astro:preact:opts` is unresolved by esbuild dep-optimisation.)
export default defineConfig({
  site: 'https://mikearnett-git.github.io',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [vanillaExtractPlugin()],
    resolve: {
      alias: [
        { find: /^react-dom\/server$/, replacement: 'preact-render-to-string' },
        { find: /^react-dom\/client$/, replacement: reactDomClientShim },
        { find: /^react-dom$/, replacement: 'preact/compat' },
        { find: /^react\/jsx-runtime$/, replacement: 'preact/jsx-runtime' },
        { find: /^react$/, replacement: 'preact/compat' },
      ],
      dedupe: ['preact'],
    },
  },
});
