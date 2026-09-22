import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
import { CtaBand } from '@/components/blocks/CtaBand';
import { getProducts, getClinics } from '@/lib/content';
import { IconPaw, IconShield } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Alimentación y productos',
  description:
    'Dietas veterinarias, alimentación y productos de cuidado disponibles en las clínicas de IVET Madrid.',
};

/**
 * DEMO: escaparate unicamente visual.
 *
 * No hay carrito, pagos, stock ni precios: mostrar precios en una POC seria
 * inventar datos que cambian. La web actual tiene WooCommerce instalado con
 * productos en base de datos, pero sin escaparate enlazado en la navegacion.
 * Esta pagina ensena como podria verse un catalogo real si se decide activarlo.
 */
export default function TiendaPage() {
  const products = getProducts();
  const clinics = getClinics();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <PageHero
        title="Dietas y cuidado,"
        accent="con criterio veterinario."
        description="Trabajamos con dietas veterinarias y productos que recomendamos según el diagnóstico de cada paciente. Pregúntanos en consulta y te orientamos."
      />

      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-bone-300 bg-white px-3.5 py-1.5 text-sm text-charcoal-900/75"
            >
              {category}
            </span>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li
              key={product.name}
              className="reveal flex items-start gap-4 rounded-2xl border border-bone-200 bg-white p-5 transition-colors duration-300 hover:border-sage-400"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-700">
                {product.category.toLowerCase().includes('dieta') ? (
                  <IconShield className="h-5 w-5" />
                ) : (
                  <IconPaw className="h-5 w-5" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-700">
                  {product.brand}
                </p>
                <h2 className="mt-1 font-serif text-base font-semibold leading-snug text-charcoal-950">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-charcoal-900/65">{product.category}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-100/60 p-6 sm:p-8">
          <h2 className="font-serif text-xl font-semibold text-amber-700">
            Disponible en clínica
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-amber-700/90">
            Esta selección es orientativa y no incluye precios ni disponibilidad. Las
            dietas veterinarias requieren indicación profesional, así que te las
            recomendamos en consulta. Consulta el stock en{' '}
            {clinics.map((c, i) => (
              <span key={c.slug}>
                {i > 0 && (i === clinics.length - 1 ? ' o ' : ', ')}
                <strong className="font-semibold">{c.shortName}</strong>
              </span>
            ))}
            .
          </p>
          <p className="mt-4 text-xs text-amber-700">
            Demostración: esta página no permite comprar. Una tienda real con pagos,
            stock y envíos se puede añadir en una fase posterior.
          </p>
        </div>
      </Section>

      <CtaBand
        title="¿Qué dieta necesita tu mascota?"
        text="Te asesoramos en consulta según su edad, peso y estado de salud."
      />
    </>
  );
}
