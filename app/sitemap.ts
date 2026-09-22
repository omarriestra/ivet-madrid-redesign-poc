import type { MetadataRoute } from 'next';
import { getClinics, getPosts } from '@/lib/content';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/urgencias',
    '/servicios',
    '/clinicas',
    '/equipo',
    '/sobre-nosotros',
    '/tienda',
    '/blog',
    '/contacto',
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const clinics = getClinics().map((c) => ({
    url: `${site.url}/clinicas/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const posts = getPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...routes, ...clinics, ...posts];
}
