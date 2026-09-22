'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatPrice, useCart } from './CartProvider';
import { IconCheck, IconClose } from '@/components/ui/Icons';

/**
 * Panel lateral de la cesta.
 *
 * El "pago" es una simulacion: muestra una confirmacion local y vacia la
 * cesta. No se envian datos a ningun sitio.
 */
export function CartDrawer() {
  const { lines, count, total, setQuantity, remove, clear, isOpen, close } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Cierra con Escape y bloquea el scroll de fondo mientras esta abierto.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Cerrar la cesta"
        onClick={close}
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Tu cesta"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bone-50 shadow-2xl focus:outline-none"
      >
        <div className="flex items-center justify-between border-b border-bone-200 px-5 py-4">
          <h2 className="font-display text-xl font-semibold">
            Tu cesta{count > 0 && <span className="text-charcoal-900/50"> · {count}</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal-900 transition-colors hover:bg-bone-200"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
              <IconCheck className="h-8 w-8 text-sage-700" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold">Pedido simulado</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal-900/75">
              Así funcionaría el proceso de compra. En esta demostración no se ha
              cobrado nada ni se ha enviado ningún pedido.
            </p>
            <button
              type="button"
              onClick={() => {
                setConfirmed(false);
                close();
              }}
              className="mt-7 min-h-12 rounded-full bg-charcoal-950 px-6 py-3 font-semibold text-bone-50 transition-colors hover:bg-charcoal-800"
            >
              Seguir viendo productos
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-charcoal-900/70">Tu cesta está vacía.</p>
            <button
              type="button"
              onClick={close}
              className="mt-5 min-h-12 rounded-full border border-charcoal-950/20 px-6 py-3 font-semibold transition-colors hover:border-sage-600 hover:bg-sage-100"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {lines.map((line) => (
                <li
                  key={line.slug}
                  className="flex gap-4 border-b border-bone-200 py-4 last:border-0"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                    {line.image && (
                      <Image
                        src={line.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug">{line.name}</p>
                    <p className="mt-1 text-sm text-charcoal-900/70">
                      {formatPrice(line.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-bone-300">
                        <button
                          type="button"
                          aria-label={`Quitar una unidad de ${line.name}`}
                          onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-bone-200"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Añadir una unidad de ${line.name}`}
                          onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-bone-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        className="text-xs text-charcoal-900/60 underline transition-colors hover:text-charcoal-950"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-bone-200 px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-charcoal-900/70">Total</span>
                <span className="font-display text-2xl font-semibold tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-1 text-xs text-charcoal-900/55">
                IVA incluido. Envío calculado en el paso siguiente.
              </p>

              <button
                type="button"
                onClick={() => {
                  clear();
                  setConfirmed(true);
                }}
                className="mt-4 flex min-h-14 w-full items-center justify-center rounded-full bg-sage-600 px-6 py-3.5 font-semibold text-white transition-all duration-200 ease-out-soft hover:bg-sage-700 active:scale-[0.99]"
              >
                Finalizar compra
              </button>
              <p className="mt-3 text-center text-xs text-charcoal-900/55">
                Demostración: no se cobra nada.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
