'use client';

import { useState } from 'react';
import type { Product } from '@/content/types';
import { useCart } from './CartProvider';
import { cn } from '@/lib/utils';

/** Boton de anadir a la cesta, con cantidad opcional (ficha de producto). */
export function AddToCart({
  product,
  withQuantity = false,
  className,
}: {
  product: Product;
  withQuantity?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {withQuantity && (
        <div className="flex items-center rounded-full border border-bone-300 bg-white">
          <button
            type="button"
            aria-label="Quitar una unidad"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full text-xl transition-colors hover:bg-bone-100"
          >
            −
          </button>
          <span className="w-10 text-center font-semibold tabular-nums">{quantity}</span>
          <button
            type="button"
            aria-label="Añadir una unidad"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full text-xl transition-colors hover:bg-bone-100"
          >
            +
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => add(product, quantity)}
        className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-charcoal-950 px-6 py-3 font-semibold text-bone-50 transition-all duration-200 ease-out-soft hover:bg-charcoal-800 active:scale-[0.98] sm:flex-none"
      >
        Añadir a la cesta
      </button>
    </div>
  );
}
