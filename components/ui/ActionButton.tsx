'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Boton de accion con respuesta fisica al pulsar.
 *
 * Pensado para las dos acciones que de verdad importan aqui: llamar y pedir
 * cita. Al pulsar confirma visualmente que algo esta pasando, porque en movil
 * el marcador tarda un instante en abrirse y sin esa senal la gente vuelve a
 * pulsar. Es un enlace real (`tel:`, `https://wa.me/...` o una ruta), nunca un
 * boton falso: funciona con teclado, con lector de pantalla y con el menu
 * contextual del navegador.
 */

type Tone = 'emergency' | 'sage' | 'outline';

const tones: Record<Tone, string> = {
  emergency:
    'bg-amber-600 text-white shadow-lg shadow-amber-700/25 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-700/30',
  sage: 'bg-sage-500 text-charcoal-950 shadow-lg shadow-sage-500/20 hover:bg-sage-400 hover:shadow-xl',
  outline:
    'border border-bone-50/30 bg-bone-50/10 text-bone-50 backdrop-blur-sm hover:border-bone-50/50 hover:bg-bone-50/20',
};

export function ActionButton({
  href,
  children,
  tone = 'emergency',
  size = 'lg',
  icon,
  subtitle,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
  external?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const isExternal = external || href.startsWith('http');

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onBlur={() => setPressed(false)}
      className={cn(
        'group relative inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-full font-semibold transition-all duration-200 ease-out-soft',
        'hover:-translate-y-0.5 active:translate-y-0',
        size === 'lg' ? 'min-h-14 px-7 py-3.5 text-lg' : 'min-h-12 px-5 py-2.5 text-base',
        tones[tone],
        pressed && 'scale-[0.97]',
        className,
      )}
    >
      {/* Brillo que recorre el boton al pasar el cursor. Decorativo. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out-soft group-hover:translate-x-full motion-reduce:hidden"
      />
      {icon && (
        <span className="relative shrink-0 transition-transform duration-300 ease-out-soft group-hover:scale-110">
          {icon}
        </span>
      )}
      <span className="relative flex flex-col items-start leading-tight">
        <span>{children}</span>
        {subtitle && (
          <span className="text-xs font-medium opacity-80">{subtitle}</span>
        )}
      </span>
    </a>
  );
}

/**
 * Indicador de urgencias: la etiqueta informativa, no una accion.
 * Se mantiene como texto con un punto latiendo, para no competir con los
 * botones reales de llamar y pedir cita.
 */
export function EmergencyPulse({ label }: { label: string }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-sage-500/30 bg-sage-500/10 px-4 py-2 text-sm font-medium text-sage-200">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400/70 motion-reduce:hidden" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage-400" />
      </span>
      {label}
    </p>
  );
}
