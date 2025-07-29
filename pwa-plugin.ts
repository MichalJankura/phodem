// vite-plugin-pwa
import { VitePWA } from 'vite-plugin-pwa'

export const pwaPlugin = VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'phodem-icon.png', '*.svg'],
  manifest: {
    name: 'PHỞ ĐÊM',
    short_name: 'PHỞ ĐÊM',
    description: 'PHỞ ĐÊM - Vietnamese restaurant',
    theme_color: '#000000',
    icons: [
      {
        src: 'phodem-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'phodem-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,jpg,webp,svg,ttf,pdf}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
          }
        }
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        }
      }
    ]
  }
});
