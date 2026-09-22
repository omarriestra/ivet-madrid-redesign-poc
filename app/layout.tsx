import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/content/site';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  // La italica real: el diseno la usa en los titulares y sin esto el navegador
  // la sintetiza inclinando la roman, que empasta los remates de Fraunces.
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // La marca va primero: en una pestana estrecha lo unico que se lee son
    // los primeros caracteres, y ahi debe estar el nombre de la clinica.
    default: `${site.name} · Clínicas veterinarias en Madrid`,
    template: `${site.name} · %s`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: site.name,
    title: `${site.name} · Clínicas veterinarias en Madrid`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · Clínicas veterinarias en Madrid`,
    description: site.description,
  },
  // POC: no debe indexarse para no competir con el sitio real del cliente.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#1c1c1a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal-950 focus:px-5 focus:py-3 focus:text-bone-50"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
