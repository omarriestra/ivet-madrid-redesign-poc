import type { Metadata } from 'next';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
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
      <section className="border-b border-bone-200 bg-gradient-to-b from-sage-100 to-bone-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Clínicas"
            title="Cerca de ti, en cuatro puntos de Madrid"
            description="Un mismo equipo y una misma forma de cuidar en Chamberí, Malasaña, Las Rozas y El Burgo. Elige la clínica que mejor te venga."
          />
        </Container>
      </section>

      <Section>
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
