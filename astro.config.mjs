import { defineConfig } from 'astro/config';
import { SITE_TITLE, SITE_DESCRIPTION } from './src/consts';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
import { VitePWA } from 'vite-plugin-pwa';
import VitePluginBrowserSync from 'vite-plugin-browser-sync';

// https://astro.build/config
// import critters from "astro-critters";

// https://astro.build/config
// import deadLinks from "astro-dead-links";

// https://astro.build/config
// import purgecss from "astro-purgecss";

// https://astro.build/config
// import webmanifest from "astro-webmanifest";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://lastmessengers.netlify.app',
  integrations: [sitemap(), svelte(), tailwind()
  // critters(),
  // deadLinks(),
  // webmanifest(
  // {
  //   "name": SITE_TITLE,
  //   "icon": "public/favicon.svg",
  //   "short_name": "Example",
  //   "description": SITE_DESCRIPTION,
  //   "start_url": "/",
  //   "theme_color": "#010101",
  //   "background_color": "#010101",
  //   "display": "standalone",
  // }
  // )
  ],

  // output: "server",
  vite: {
    plugins: [yaml(), VitePluginBrowserSync(), VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
        // Don't fallback on document based (e.g. `/some-page`) requests
        // This removes an errant console.log message from showing up.
        navigateFallback: null,
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.cdnfonts\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },

            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }
    })]
  }
});