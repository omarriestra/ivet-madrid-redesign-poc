import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
import { getProducts } from '@/lib/content';
import { ShopGrid } from '@/components/shop/ShopGrid';

export const metadata: Metadata = {
  title: 'Tienda',
  description:
    'Dietas veterinarias, alimentación y productos de cuidado seleccionados por el equipo de IVET Madrid.',
};

/**
 * DEMO: la tienda funciona de principio a fin en el navegador (catalogo,
 * ficha, cesta y "pago"), pero no cobra ni envia pedidos. Los productos,
 * precios e imagenes son los reales de su WooCommerce, que hoy existe en su
 * base de datos sin escaparate enlazado.
 */
export default function TiendaPage() {
  const products = getProducts();

  return (
    <>
      <PageHero
        title="Todo lo que tu mascota"
        accent="necesita en casa."
        description="Dietas veterinarias, alimentación diaria y productos de cuidado, con el criterio de quienes la conocen."
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-bone-50/25 bg-bone-50/10 px-4 py-2 text-sm text-bone-100/85">
          {products.length} productos · recogida en tus clínicas de siempre
        </p>
      </PageHero>

      <Section>
        <ShopGrid products={products} />
      </Section>

      <section className="border-t border-bone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-100/60 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-amber-700">
              Esta tienda es una demostración
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-amber-700">
              Los productos, precios e imágenes son los reales del catálogo de IVET
              Madrid. Puedes navegar, abrir una ficha y añadir a la cesta para ver cómo
              funcionaría, pero no se cobra nada ni se envía ningún pedido. Las dietas
              veterinarias requieren indicación profesional: consúltanos antes de
              comprarlas.
            </p>
            <p className="mt-4 text-sm text-amber-700">
              <Link href="/contacto" className="font-semibold underline">
                Pregúntanos qué dieta necesita tu mascota
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
