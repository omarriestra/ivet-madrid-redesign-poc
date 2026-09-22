'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/content/types';
import { formatPrice } from './CartProvider';
import { AddToCart } from './AddToCart';
import { cn } from '@/lib/utils';

/** Catalogo con filtro por categoria. El filtrado ocurre en el cliente. */
export function ShopGrid({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const all = products.flatMap((p) => p.categories);
    return ['Todos', ...Array.from(new Set(all))];
  }, [products]);

  const [active, setActive] = useState('Todos');

  const visible = useMemo(
    () =>
      active === 'Todos'
        ? products
        : products.filter((p) => p.categories.includes(active)),
    [products, active],
  );

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                'min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
                isActive
                  ? 'border-charcoal-950 bg-charcoal-950 text-bone-50'
                  : 'border-bone-300 bg-white text-charcoal-900 hover:border-sage-600 hover:bg-sage-100',
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-charcoal-900/60" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {visible.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-bone-200 bg-white transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-sage-400 hover:shadow-xl hover:shadow-charcoal-950/8">
      <Link
        href={`/tienda/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-bone-50"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 260px, 45vw"
            className="object-contain p-4 transition-transform duration-500 ease-out-soft group-hover:scale-[1.05]"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-sm text-charcoal-900/40">
            Sin imagen
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.categories[0] && (
          <p className="text-xs font-semibold uppercase tracking-wider text-sage-700">
            {product.categories[0]}
          </p>
        )}
        <h3 className="mt-1.5 font-display text-base font-semibold leading-snug">
          <Link href={`/tienda/${product.slug}`} className="link-grow">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 font-display text-lg font-semibold tabular-nums">
          {formatPrice(product.price)}
        </p>
        <div className="mt-auto pt-4">
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}
