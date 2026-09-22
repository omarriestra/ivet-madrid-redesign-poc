import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/** Icono de marca al guardar la web en la pantalla de inicio. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Clínicas veterinarias en Madrid`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#1c1c1a',
    theme_color: '#1c1c1a',
    lang: 'es',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
