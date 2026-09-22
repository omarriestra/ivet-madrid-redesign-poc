import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
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
      <PageHero
        title="Quien te atiende"
        accent="tiene nombre y cara."
        description="Medicina interna, cirugía, dermatología, traumatología, cardiología, oncología y rehabilitación, con las auxiliares que sostienen cada día."
      />

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
