'use client';

import { useCart } from './CartProvider';

/** Acceso a la cesta desde la cabecera, con el numero de articulos. */
export function CartButton() {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={count > 0 ? `Abrir la cesta, ${count} artículos` : 'Abrir la cesta'}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-charcoal-900 transition-colors hover:bg-bone-200"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-5 w-5"
      >
        <path d="M4 7h16l-1.3 11.2a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8L4 7Z" />
        <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sage-600 px-1 text-[0.7rem] font-bold tabular-nums text-white">
          {count}
        </span>
      )}
    </button>
  );
}
