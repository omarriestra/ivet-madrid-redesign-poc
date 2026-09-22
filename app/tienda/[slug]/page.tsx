import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { getProduct, getProducts, getRelatedProducts } from '@/lib/content';
import { AddToCart } from '@/components/shop/AddToCart';
import { ProductPrice } from '@/components/shop/ProductPrice';
import { IconCheck, IconPhone } from '@/components/ui/Icons';
import { getClinics } from '@/lib/content';

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description:
      product.shortDescription || product.description.slice(0, 160) || product.name,
    openGraph: product.image ? { images: [{ url: product.image }] } : undefined,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);
  const clinics = getClinics();
  const isVetDiet = product.categories.some((c) => /dieta|prescription/i.test(c));

  return (
    <>
      <Section className="pb-0 pt-8 sm:pt-10">
        <nav aria-label="Migas de pan" className="text-sm text-charcoal-900/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/tienda" className="hover:text-charcoal-950">
                Tienda
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-charcoal-950">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-bone-200 bg-white">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-8"
              />
            )}
          </div>

          <div className="lg:pt-4">
            {product.categories[0] && (
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-700">
                {product.categories[0]}
              </p>
            )}
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              {product.name}
            </h1>

            <ProductPrice price={product.price} />

            {product.shortDescription && (
              <p className="mt-5 text-lg leading-relaxed text-charcoal-900/80">
                {product.shortDescription}
              </p>
            )}

            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sage-700">
              <IconCheck className="h-5 w-5" />
              {product.inStock ? 'Disponible en clínica' : 'Consultar disponibilidad'}
            </p>

            <AddToCart product={product} withQuantity className="mt-7" />

            {isVetDiet && (
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-100/60 p-5">
                <p className="text-sm font-semibold text-amber-700">
                  Dieta veterinaria
                </p>
                <p className="mt-2 text-sm leading-relaxed text-amber-700">
                  Este alimento está formulado para una condición clínica concreta.
                  Consúltanos antes de dárselo a tu mascota: te indicamos si es el
                  adecuado y en qué cantidad.
                </p>
                <a
                  href={`tel:${clinics[0].phoneHref}`}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-700 underline"
                >
                  <IconPhone className="h-4 w-4" />
                  Preguntar a la clínica
                </a>
              </div>
            )}

            <dl className="mt-8 divide-y divide-bone-200 border-t border-bone-200 text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-charcoal-900/65">Recogida</dt>
                <dd className="text-right font-medium">
                  En cualquiera de las 4 clínicas
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-charcoal-900/65">Envío</dt>
                <dd className="text-right font-medium">Madrid capital y Las Rozas</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-charcoal-900/65">Asesoramiento</dt>
                <dd className="text-right font-medium">Incluido en consulta</dd>
              </div>
            </dl>
          </div>
        </div>

        {product.description && product.description !== product.shortDescription && (
          <div className="mt-14 max-w-3xl border-t border-bone-200 pt-10">
            <h2 className="font-display text-2xl font-semibold">Composición y detalles</h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-900/75">
              {product.description}
            </p>
          </div>
        )}
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-bone-200">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            También te puede interesar
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/tienda/${item.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-bone-200 bg-white transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-sage-400 hover:shadow-lg"
                >
                  <div className="relative aspect-square bg-bone-50">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 260px, 45vw"
                        className="object-contain p-4 transition-transform duration-500 ease-out-soft group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-display text-sm font-semibold leading-snug">
                      {item.name}
                    </p>
                    <ProductPrice price={item.price} compact />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
