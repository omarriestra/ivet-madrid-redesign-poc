import { getClinics, EMERGENCY_LABEL, EMERGENCY_NOTE } from '@/lib/content';
import { IconPhone, IconWhatsApp } from '@/components/ui/Icons';
import { whatsappUrl } from '@/lib/utils';

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
          <li key={clinic.slug} className="rounded-xl bg-white/5 p-3">
            <p className="px-1 text-xs font-medium uppercase tracking-wider text-bone-100/65">
              {clinic.shortName}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <a
                href={`tel:${clinic.emergencyPhoneHref}`}
                className="group flex min-h-12 items-center gap-2.5 rounded-lg bg-amber-600 px-3.5 py-2.5 transition-colors duration-200 hover:bg-amber-700"
              >
                <IconPhone className="h-5 w-5 shrink-0 text-white" />
                <span className="font-semibold tabular-nums text-white">
                  {clinic.emergencyPhone}
                </span>
                <span className="sr-only">— llamar a {clinic.name}</span>
              </a>
              <a
                href={whatsappUrl(
                  clinic.whatsapp,
                  `Hola, necesito atención urgente en ${clinic.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-2.5 rounded-lg border border-white/20 px-3.5 py-2.5 transition-colors duration-200 hover:border-sage-400 hover:bg-white/10"
              >
                <IconWhatsApp className="h-5 w-5 shrink-0 text-sage-400" />
                <span className="text-sm font-semibold text-bone-50">WhatsApp</span>
                <span className="sr-only">— escribir a {clinic.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
