import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: "/games-directory/",
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      // Mise à jour automatique du worker
      registerType: "autoUpdate",

      // Fichiers à inclure dans le cache
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      // Configuration du manifest
      manifest: {
        name: "Annuaire des jeux",
        short_name: "Jeux",
        description: "Application de recherche de jeux vidéos",
        theme_color: "#ffffff",
        start_url: 'https://tristandeschamp.github.io/games-directory/',
        display: 'standalone',
        background_color: '#ffffff',

        // Liste des icônes
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        runtimeCaching: [{
          urlPattern: /^https:\/\/api\.rawg\.io\/api/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 86400
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }
    })
  ],
})
