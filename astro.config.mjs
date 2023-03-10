import { defineConfig } from 'astro/config';
import { SITE_TITLE, SITE_DESCRIPTION } from './src/consts'

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import svelte from "@astrojs/svelte";

// https://astro.build/config
import { VitePWA } from 'vite-plugin-pwa';
import VitePluginBrowserSync from 'vite-plugin-browser-sync';

// https://astro.build/config
import critters from "astro-critters";

// https://astro.build/config
import deadLinks from "astro-dead-links";

// https://astro.build/config
import purgecss from "astro-purgecss";

// https://astro.build/config
import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
  site: 'https://lastmessengers.netlify.app',
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), mdx(), sitemap(), svelte(), tailwind(), critters(), deadLinks(),webmanifest(
  {
    "name": SITE_TITLE,
    "icon": "/favicon.svg",
    "short_name": "Example",
    "description": SITE_DESCRIPTION,
    "start_url": "/",
    "theme_color": "#010101",
    "background_color": "#010101",
    "display": "standalone",
  }
  )],
  output: "server",
  adapter: netlify(),

  vite: {
    plugins: [VitePluginBrowserSync(), VitePWA({
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
  },
});