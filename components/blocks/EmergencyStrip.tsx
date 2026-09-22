import { getClinics, EMERGENCY_LABEL, EMERGENCY_NOTE } from '@/lib/content';
import { IconPhone } from '@/components/ui/Icons';

/** Tira de telefonos de urgencias. Los `tel:` son reales y funcionan en movil. */
export function EmergencyStrip({ compact = false }: { compact?: boolean }) {
  const clinics = getClinics();

  return (
    <div className="rounded-2xl bg-charcoal-950 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="font-serif text-xl font-semibold text-bone-50 sm:text-2xl">
          {EMERGENCY_LABEL}
        </h2>
        {!compact && <p className="text-sm text-bone-100/70">{EMERGENCY_NOTE}</p>}
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {clinics.map((clinic) => (
          <li key={clinic.slug}>
            <a
              href={`tel:${clinic.emergencyPhoneHref}`}
              className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3.5 transition-colors duration-200 hover:bg-amber-600"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                <IconPhone className="h-5 w-5 text-bone-50" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wider text-bone-100/60 transition-colors group-hover:text-white/80">
                  {clinic.shortName}
                </span>
                <span className="block font-semibold tabular-nums text-bone-50">
                  {clinic.emergencyPhone}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
