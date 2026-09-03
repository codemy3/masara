import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Masara Fine Dine',
    short_name: 'Masara',
    description: 'A premium modern Indian dining experience in Bangalore.',
    start_url: '/',
    display: 'standalone',
    background_color: '#3D081A',
    theme_color: '#3D081A',
    icons: [
      {
        src: '/images/logo/logo-2.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/images/logo/logo-dark.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  }
}
