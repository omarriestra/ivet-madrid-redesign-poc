import type { MetadataRoute } from 'next';

/**
 * POC: bloqueamos la indexacion para que la demo no compita en buscadores con
 * la web real del cliente. Al pasar a produccion, permitir el rastreo y anadir
 * la referencia al sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  };
}
