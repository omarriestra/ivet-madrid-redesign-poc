import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, SectionHeading } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
import { CtaBand } from '@/components/blocks/CtaBand';
import { Button } from '@/components/ui/Button';
import { history, solidarityProject, getClinics } from '@/lib/content';
import { IconArrow } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description:
    'IVET Madrid nace en 2022 como continuidad de un proyecto familiar iniciado en Ribadesella, Asturias. Medicina veterinaria de proximidad con cuatro clínicas en Madrid.',
};

export default function SobreNosotrosPage() {
  const clinics = getClinics();

  return (
    <>
      <PageHero
        title="Un proyecto familiar"
        accent="con vocación clínica."
        description={history.intro}
      />

      <Section size="narrow">
        <div className="space-y-6 text-lg leading-relaxed text-charcoal-900/80">
          {history.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section className="border-y border-bone-200 bg-white">
        <SectionHeading eyebrow="Trayectoria" title="Cómo hemos llegado hasta aquí" />
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {history.milestones.map((milestone) => (
            <li
              key={`${milestone.year}-${milestone.title}`}
              className="reveal relative rounded-2xl border border-bone-200 bg-bone-50 p-6"
            >
              <span className="font-serif text-3xl font-semibold text-sage-700">
                {milestone.year}
              </span>
              <h3 className="mt-3 text-lg">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-900/75">
                {milestone.text}
              </p>
            </li>
          ))}
        </ol>

        <dl className="mt-12 grid gap-6 rounded-2xl bg-charcoal-950 p-8 text-bone-50 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-bone-100/65">Clínicas en Madrid</dt>
            <dd className="mt-1 font-serif text-4xl font-semibold">{clinics.length}</dd>
          </div>
          <div>
            <dt className="text-sm text-bone-100/65">Desde</dt>
            <dd className="mt-1 font-serif text-4xl font-semibold">2022</dd>
          </div>
          <div>
            <dt className="text-sm text-bone-100/65">Centros en Asturias</dt>
            <dd className="mt-1 font-serif text-4xl font-semibold">2</dd>
          </div>
        </dl>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Compromiso"
              title={solidarityProject.name}
              description={solidarityProject.text}
            />
            <Button
              href={solidarityProject.instagram}
              variant="secondary"
              size="md"
              className="mt-7"
            >
              Seguir el proyecto
              <IconArrow className="h-5 w-5" />
            </Button>
          </div>
          <div className="rounded-2xl border border-bone-200 bg-white p-8">
            <p className="font-serif text-xl leading-relaxed text-charcoal-950">
              «Lo que comenzó desparasitando ovejas, cabras y vacas ha evolucionado en una
              misión que no solo cuida el ganado, sino también a las personas.»
            </p>
            <p className="mt-5 text-sm text-charcoal-900/65">
              Proyecto {solidarityProject.name}, en una comunidad remota de Etiopía.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-bone-200">
        <SectionHeading eyebrow="Dónde estamos" title="Cuatro clínicas en Madrid" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clinics.map((clinic) => (
            <li key={clinic.slug}>
              <Link
                href={`/clinicas/${clinic.slug}`}
                className="group block rounded-2xl border border-bone-200 bg-white p-5 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-sage-400 hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">
                  {clinic.neighbourhood}
                </p>
                <p className="mt-1.5 font-serif text-lg font-semibold">
                  {clinic.shortName}
                </p>
                <p className="mt-1 text-sm text-charcoal-900/65">{clinic.address}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
