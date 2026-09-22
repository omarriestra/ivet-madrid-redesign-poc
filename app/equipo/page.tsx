import type { Metadata } from 'next';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { TeamMemberCard } from '@/components/blocks/TeamMemberCard';
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
      <section className="border-b border-bone-200 bg-gradient-to-b from-petrol-50 to-bone-50 py-16 sm:py-20">
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
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.slug} className="reveal">
              <TeamMemberCard member={member} />
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
