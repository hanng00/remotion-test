import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Irja',
    short_name: 'Irja',
    description: 'The Diabild Carousel for the 21th Century',
    start_url: '/',
    display: 'standalone',
    background_color: '#EEEEEE',
    theme_color: '#40D183',
    icons: [
      {
        "src": "/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
  }
}

