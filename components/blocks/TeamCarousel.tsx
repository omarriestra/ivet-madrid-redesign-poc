'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { TeamMember } from '@/content/types';
import { TeamFlipCard } from './TeamFlipCard';
import { cn } from '@/lib/utils';

/**
 * Carrusel del equipo para la portada.
 *
 * Es una lista con scroll horizontal nativo: en movil se desliza con el dedo
 * como cualquier galeria, y en escritorio se avanza con las flechas o con el
 * teclado. No se mueve solo, asi que nadie tiene que correr para leer un
 * nombre, y `scroll-snap` deja siempre una tarjeta alineada.
 *
 * Cada tarjeta es una TeamFlipCard: al pulsarla gira y muestra nombre, cargo
 * y clinica sobre la foto atenuada.
 */
export function TeamCarousel({ members }: { members: TeamMember[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  /** Avanza o retrocede una tarjeta, usando el ancho real del primer hijo. */
  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-4">
        <p className="text-sm text-bone-100/65">
          Pulsa en cualquier tarjeta para ver quién es.
        </p>

        {/* Controles: ocultos al lector de pantalla porque la lista ya es
            recorrible con el teclado y el scroll nativo. */}
        <div className="hidden shrink-0 gap-2 sm:flex">
          <CarouselButton
            direction="prev"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
          />
          <CarouselButton
            direction="next"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
          />
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Equipo de IVET Madrid"
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {members.map((member) => (
          <li
            key={member.slug}
            className="w-[58vw] shrink-0 snap-start sm:w-[32vw] lg:w-64"
          >
            <TeamFlipCard member={member} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Ver anteriores' : 'Ver siguientes'}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ease-out-soft',
        disabled
          ? 'cursor-default border-bone-50/15 text-bone-100/30'
          : 'border-bone-50/30 text-bone-50 hover:border-sage-400 hover:bg-sage-500/15',
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={cn('h-5 w-5', direction === 'prev' && 'rotate-180')}
      >
        <path d="M5 12h13m-5.5-5.5L19 12l-6.5 5.5" />
      </svg>
    </button>
  );
}
