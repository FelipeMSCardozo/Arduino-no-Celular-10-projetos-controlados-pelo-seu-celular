import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Arduino no Celular: 10 projetos controlados pelo seu celular',
        short_name: 'Arduino Celular',
        description: 'Controle o Arduino pelo celular com Bluetooth HC-05/HC-06, diagramas elétricos com divisor de tensão e 10 projetos passo a passo.',
        theme_color: '#0D1117',
        background_color: '#0D1117',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,woff}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
      },
    }),
  ],
  server: {
    port: 5176,
  },
});
