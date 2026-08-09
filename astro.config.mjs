// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sitemap from '@astrojs/sitemap'

import mdx from '@astrojs/mdx'

import partytown from '@astrojs/partytown'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://gabrielbsb21.github.io',
  base: '/guia-acessibilidade-na-web',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), mdx(), partytown(), icon()],
})
