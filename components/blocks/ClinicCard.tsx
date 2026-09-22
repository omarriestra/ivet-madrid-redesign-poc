import Link from 'next/link';
import type { Clinic } from '@/content/types';
import { IconArrow, IconPhone, IconPin } from '@/components/ui/Icons';

export function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-bone-200 bg-white p-6 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-sage-400 hover:shadow-xl hover:shadow-charcoal-950/8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">
        {clinic.neighbourhood}
      </p>
      <h3 className="mt-2 text-xl">
        <Link href={`/clinicas/${clinic.slug}`} className="after:absolute after:inset-0">
          {clinic.name}
        </Link>
      </h3>
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
      <div className="mt-6 flex items-center justify-between border-t border-bone-200 pt-4">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-900">
          <IconPhone className="h-4 w-4 text-sage-700" />
          <span className="tabular-nums">{clinic.phone}</span>
        </span>
        <IconArrow className="h-5 w-5 text-sage-700 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
      </div>
    </article>
  );
}
