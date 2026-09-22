import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ClinicMap } from '@/components/blocks/ClinicMap';
import { ScheduleTable } from '@/components/blocks/ScheduleTable';
import { CtaBand } from '@/components/blocks/CtaBand';
import { TeamMemberCard } from '@/components/blocks/TeamMemberCard';
import {
  getClinic,
  getClinics,
  getTeam,
  EMERGENCY_LABEL,
  EMERGENCY_NOTE,
} from '@/lib/content';
import { whatsappUrl } from '@/lib/utils';
import { IconMail, IconPhone, IconPin, IconWhatsApp } from '@/components/ui/Icons';

export function generateStaticParams() {
  return getClinics().map((clinic) => ({ slug: clinic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) return {};

  return {
    // La plantilla ya antepone "IVET Madrid", asi que aqui va solo el barrio
    // para no repetir la marca dos veces en la pestana.
    title: `Clínica en ${clinic.neighbourhood}`,
    description: `${clinic.name}: ${clinic.address}, ${clinic.city}. ${clinic.blurb}`,
  };
}

export default async function ClinicaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) notFound();

  const others = getClinics().filter((c) => c.slug !== clinic.slug);
  // Profesionales asignados explicitamente a esta clinica en la web actual.
  const staff = getTeam().filter((m) => m.clinic === clinic.shortName);

  return (
    <>
      <section className="border-b border-bone-200 bg-gradient-to-b from-sage-100 to-bone-50 py-14 sm:py-20">
        <Container>
          <nav aria-label="Migas de pan" className="mb-6 text-sm text-charcoal-900/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/clinicas" className="hover:text-charcoal-950">
                  Clínicas
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-charcoal-950">{clinic.shortName}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-700">
                {clinic.neighbourhood}
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl">{clinic.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal-900/80">
                {clinic.blurb}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`tel:${clinic.phoneHref}`} size="lg">
                  <IconPhone className="h-5 w-5" />
                  Llamar <span className="tabular-nums">{clinic.phone}</span>
                </Button>
                <Button href={clinic.mapsUrl} variant="secondary" size="lg">
                  <IconPin className="h-5 w-5" />
                  Cómo llegar
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-bone-200 bg-white p-6">
              <h2 className="font-serif text-lg font-semibold">Datos de contacto</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <dt className="sr-only">Dirección</dt>
                  <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" />
                  <dd className="text-charcoal-900/80">
                    {clinic.address}
                    <br />
                    {clinic.postalCode} {clinic.city}
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Teléfono</dt>
                  <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" />
                  <dd>
                    <a
                      href={`tel:${clinic.phoneHref}`}
                      className="font-medium tabular-nums text-charcoal-950 hover:text-sage-700"
                    >
                      {clinic.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Correo electrónico</dt>
                  <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" />
                  <dd>
                    <a
                      href={`mailto:${clinic.email}`}
                      className="break-all text-charcoal-900/80 hover:text-sage-700"
                    >
                      {clinic.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">WhatsApp</dt>
                  <IconWhatsApp className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" />
                  <dd>
                    <a
                      href={whatsappUrl(
                        clinic.whatsapp,
                        `Hola, quiero pedir cita en ${clinic.name}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal-900/80 hover:text-sage-700"
                    >
                      Escribir por WhatsApp
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 rounded-xl bg-charcoal-950 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">
                  {EMERGENCY_LABEL}
                </p>
                <a
                  href={`tel:${clinic.emergencyPhoneHref}`}
                  className="mt-2 inline-flex items-center gap-2 font-serif text-xl font-semibold tabular-nums text-bone-50 hover:text-amber-100"
                >
                  <IconPhone className="h-5 w-5" />
                  {clinic.emergencyPhone}
                </a>
                <p className="mt-2 text-xs leading-relaxed text-bone-100/60">
                  {EMERGENCY_NOTE}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <ClinicMap query={clinic.mapEmbedQuery} name={clinic.name} />
          <ScheduleTable />
        </div>
      </Section>

      {staff.length > 0 && (
        <Section className="border-t border-bone-200 bg-white">
          <SectionHeading
            eyebrow="Equipo"
            title={`Profesionales en ${clinic.shortName}`}
          />
          <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {staff.map((member) => (
              <li key={member.slug}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-charcoal-900/60">
            Además, contamos con especialistas que atienden en todas nuestras clínicas.{' '}
            <Link href="/equipo" className="font-medium text-sage-700 underline">
              Ver el equipo completo
            </Link>
            .
          </p>
        </Section>
      )}

      <Section className="border-t border-bone-200">
        <SectionHeading eyebrow="Otras clínicas" title="También estamos aquí" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/clinicas/${other.slug}`}
                className="group block rounded-2xl border border-bone-200 bg-white p-5 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-sage-400 hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">
                  {other.neighbourhood}
                </p>
                <p className="mt-1.5 font-serif text-lg font-semibold text-charcoal-950">
                  {other.shortName}
                </p>
                <p className="mt-1 text-sm text-charcoal-900/65">{other.address}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title={`¿Pedimos cita en ${clinic.shortName}?`} />
    </>
  );
}
