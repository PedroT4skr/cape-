import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
import { edgeTtsPlugin } from './src/server/edge-tts-plugin'

export default defineConfig({
  plugins: [
    svelte(),
    edgeTtsPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'CAPE CAA - Prancha de Comunicação',
        short_name: 'CAPE CAA',
        description: 'Plataforma PWA de Comunicação Alternativa e Ampliada para o CAPE Vitória da Conquista',
        theme_color: '#0F172A',
        background_color: '#F8FAFC',
        display: 'standalone',
        orientation: 'any',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp}']
      }
    })
  ]
})
