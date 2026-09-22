import Link from 'next/link';
import type { Clinic } from '@/content/types';
import { IconArrow, IconPhone, IconPin, IconWhatsApp } from '@/components/ui/Icons';
import { whatsappUrl } from '@/lib/utils';

export function ClinicCard({
  clinic,
  as: Heading = 'h3',
}: {
  clinic: Clinic;
  as?: 'h2' | 'h3';
}) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-bone-200 bg-white p-6 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-sage-400 hover:shadow-xl hover:shadow-charcoal-950/8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">
        {clinic.neighbourhood}
      </p>
      <Heading className="mt-2 text-xl">
        <Link href={`/clinicas/${clinic.slug}`} className="link-grow [--underline:var(--color-sage-600)]">
          {clinic.name}
        </Link>
      </Heading>
      <p className="mt-3 flex items-start gap-2 text-sm text-charcoal-900/70">
        <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" />
        <span>
          {clinic.address}
          <br />
          {clinic.postalCode} {clinic.city}
        </span>
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal-900/70">
        {clinic.blurb}
      </p>
      {/* Llamar y WhatsApp directos: las dos acciones que la gente busca,
          sin tener que entrar antes en la ficha de la clinica. */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-bone-200 pt-4">
        <a
          href={`tel:${clinic.phoneHref}`}
          className="relative z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-charcoal-950 px-4 py-2 text-sm font-semibold text-bone-50 transition-colors duration-200 hover:bg-charcoal-800"
        >
          <IconPhone className="h-4 w-4" />
          <span className="tabular-nums">{clinic.phone}</span>
          <span className="sr-only">— llamar a {clinic.name}</span>
        </a>
        <a
          href={whatsappUrl(
            clinic.whatsapp,
            `Hola, quiero pedir cita en ${clinic.name}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-charcoal-950/20 px-4 py-2 text-sm font-semibold text-charcoal-950 transition-colors duration-200 hover:border-sage-600 hover:bg-sage-100"
        >
          <IconWhatsApp className="h-4 w-4 text-sage-700" />
          WhatsApp
          <span className="sr-only">— escribir a {clinic.name}</span>
        </a>
        <IconArrow className="ml-auto h-5 w-5 text-sage-700 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
      </div>
    </article>
  );
}
