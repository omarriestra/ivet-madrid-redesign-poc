import type { Metadata } from 'next';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { TeamFlipCard } from '@/components/blocks/TeamFlipCard';
import { CtaBand } from '@/components/blocks/CtaBand';
import { getTeam } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Nuestro equipo',
  description:
    'Veterinarios, especialistas y personal auxiliar de IVET Madrid: medicina interna, cirugía, dermatología, traumatología, cardiología, oncología y rehabilitación.',
};

export default function EquipoPage() {
  const team = getTeam();

  return (
    <>
      <section className="border-b border-bone-200 bg-gradient-to-b from-sage-100 to-bone-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Equipo"
            title="Más que un equipo, una familia"
            description="Profesionales de medicina interna, cirugía, dermatología, traumatología, cardiología, oncología y rehabilitación, con el apoyo de un equipo auxiliar que acompaña a cada familia."
          />
        </Container>
      </section>

      <Section>
        <p className="mb-8 text-sm text-charcoal-900/65">
          Pulsa en cualquier tarjeta para ver los detalles.
        </p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.slug} className="reveal">
              <TeamFlipCard member={member} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="¿Quieres que te atienda nuestro equipo?"
        text="Pide cita en la clínica que mejor te venga y te asignamos el profesional más adecuado."
      />
    </>
  );
}
