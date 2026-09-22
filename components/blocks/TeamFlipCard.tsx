'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TeamMember } from '@/content/types';
import { cn } from '@/lib/utils';

/**
 * Tarjeta del equipo que gira al pulsarla.
 *
 * Es un `<button>` real con `aria-expanded`, asi que funciona con teclado y
 * con lector de pantalla. El reverso siempre esta en el DOM, de modo que el
 * nombre y el cargo se leen aunque la tarjeta no se haya girado; lo que cambia
 * es la presentacion, no la informacion disponible.
 *
 * Con `prefers-reduced-motion` el giro se sustituye por un fundido: la
 * informacion sigue siendo accesible sin movimiento en 3D.
 */
export function TeamFlipCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);

  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-expanded={flipped}
      className="flip-scene group relative block w-full cursor-pointer text-left"
    >
      <span className="sr-only">
        {member.name}, {member.role}
        {member.clinic ? `, ${member.clinic}` : ''}.{' '}
        {flipped ? 'Pulsa para ver la foto.' : 'Pulsa para ver los detalles.'}
      </span>

      <span
        aria-hidden
        className={cn('flip-inner block aspect-[4/5] w-full', flipped && 'is-flipped')}
      >
        {/* Anverso: la fotografia */}
        <span className="flip-face flip-face--front bg-charcoal-800">
          {member.image ? (
            <Image
              src={member.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 60vw"
              className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
            />
          ) : (
            /* PENDIENTE: fotografia del director, a facilitar por la clinica. */
            <span className="flex h-full w-full items-center justify-center bg-charcoal-900">
              <span className="font-display text-5xl font-semibold text-sage-500">
                {initials}
              </span>
            </span>
          )}

          {/* Nombre siempre legible sobre la foto, sin necesidad de girar */}
          <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/70 to-transparent p-4 pt-10">
            <span className="block font-display text-base font-semibold leading-tight text-bone-50">
              {member.name}
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-bone-100/75">
              {member.role}
            </span>
          </span>
        </span>

        {/* Reverso: foto atenuada y datos en primer plano */}
        <span className="flip-face flip-face--back bg-charcoal-900">
          {member.image && (
            <Image
              src={member.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 60vw"
              className="scale-110 object-cover opacity-25 blur-[3px] grayscale"
            />
          )}
          <span className="relative flex h-full flex-col justify-end gap-2 p-5">
            <span className="block h-0.5 w-10 rounded-full bg-sage-500" />
            <span className="block font-display text-xl font-semibold leading-tight text-bone-50">
              {member.name}
            </span>
            <span className="block text-sm leading-snug text-bone-100/80">
              {member.role}
            </span>
            {member.clinic && (
              <span className="mt-1 inline-flex w-fit rounded-full bg-sage-500/15 px-2.5 py-1 text-xs font-medium text-sage-200">
                {member.clinic}
              </span>
            )}
          </span>
        </span>
      </span>
    </button>
  );
}
