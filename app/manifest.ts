import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shahamham',
    short_name: 'Shahamham',
    description: 'Shahamham',
    id: '/',
    start_url: '/',
    display: 'standalone',
    background_color: '#F1E7CF',
    theme_color: '#F1E7CF',
    icons: [
      {
        src: '/icons/app-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/app-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/app-icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
