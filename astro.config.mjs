import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mikearnett-git.github.io',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
});
