import { OPENING_HOURS } from '@/lib/content';
import { IconClock } from '@/components/ui/Icons';

export function ScheduleTable({
  title = 'Horario de atención',
  as: Heading = 'h2',
}: {
  title?: string;
  /** Nivel de encabezado, para no romper la jerarquia de la pagina. */
  as?: 'h2' | 'h3';
}) {
  return (
    <div className="rounded-2xl border border-bone-200 bg-white p-6">
      <Heading className="flex items-center gap-2 font-serif text-lg font-semibold">
        <IconClock className="h-5 w-5 text-sage-700" />
        {title}
      </Heading>
      <dl className="mt-4 divide-y divide-bone-200">
        {OPENING_HOURS.map((row) => (
          <div key={row.days} className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-sm text-charcoal-900/75">{row.days}</dt>
            <dd className="text-sm font-medium tabular-nums text-charcoal-950">
              {row.hours}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
