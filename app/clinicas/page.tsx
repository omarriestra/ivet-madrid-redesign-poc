import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
import { ClinicCard } from '@/components/blocks/ClinicCard';
import { EmergencyStrip } from '@/components/blocks/EmergencyStrip';
import { ScheduleTable } from '@/components/blocks/ScheduleTable';
import { getClinics } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Nuestras clínicas',
  description:
    'Cuatro clínicas veterinarias en Madrid: Ríos Rosas, Las Rozas, El Burgo y Malasaña. Direcciones, teléfonos y horarios.',
};

export default function ClinicasPage() {
  const clinics = getClinics();

  return (
    <>
      <PageHero
        title="Cuatro clínicas de barrio,"
        accent="un mismo equipo."
        description="Chamberí, Malasaña, Las Rozas y El Burgo. Elige la que mejor te venga: llama o escríbenos por WhatsApp."
      />

      <Section>
        <h2 className="sr-only">Nuestras cuatro clínicas</h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {clinics.map((clinic) => (
            <li key={clinic.slug} className="reveal">
              <ClinicCard clinic={clinic} />
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <EmergencyStrip />
          <ScheduleTable />
        </div>
      </Section>
    </>
  );
}
