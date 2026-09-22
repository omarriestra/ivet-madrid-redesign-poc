import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IconArrow, IconPhone } from '@/components/ui/Icons';
import {
  EMERGENCY_LABEL,
  EMERGENCY_NOTE,
  OPENING_HOURS,
  getClinics,
  getServices,
  getTeam,
  history,
  site,
  solidarityProject,
} from '@/lib/content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Clínicas veterinarias en Madrid con urgencias telefónicas 24 h',
  description: site.description,
  alternates: { canonical: '/' },
};

/* -------------------------------------------------------------------------- */
/*  Piezas locales de la portada                                              */
/* -------------------------------------------------------------------------- */

/** Linea del titular del hero con retardo escalonado (ver .hero-line). */
function HeroLine({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn('hero-line block', className)}
      style={{ '--i': index } as CSSProperties}
    >
      {children}
    </span>
  );
}

/** Fotografias de equipo en contexto (bata azul IVET, fondo neutro). */
const TEAM_IN_CONTEXT = [
  '/images/editorial/equipo-1.webp',
  '/images/editorial/equipo-2.webp',
  '/images/editorial/equipo-3.webp',
  '/images/editorial/equipo-4.webp',
];

/* -------------------------------------------------------------------------- */
/*  Portada                                                                   */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const clinics = getClinics();
  const services = getServices();
  const team = getTeam();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  1 · El momento de duda                                             */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-charcoal-950 text-bone-50"
      >
        {/* La foto: labrador sobre negro. En movil ocupa todo el hero; en
            escritorio, el 70 % derecho, fundida al carbon por la izquierda. */}
        <div className="absolute inset-0 lg:left-[30%]">
          <Image
            src="/images/editorial/labrador.webp"
            alt="Labrador chocolate mirando a cámara sobre fondo negro"
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            /* El perro ocupa el tercio central de la foto y el resto es negro:
               en escritorio encuadramos a la izquierda para que quede dentro
               del 70 % visible, en lugar de caer fuera del recorte. */
            className="object-cover object-center lg:object-[38%_center]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-charcoal-950 from-8% via-charcoal-950/70 via-38% to-transparent to-68% lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-2/5 bg-linear-to-r from-charcoal-950 to-transparent lg:block"
          />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl flex-col justify-end px-4 pb-8 pt-72 sm:px-6 sm:pt-80 lg:min-h-[min(calc(100svh-4.5rem),56rem)] lg:justify-center lg:px-8 lg:py-24">
          <div className="max-w-2xl xl:max-w-3xl">
            <p className="hero-line mb-5 text-sm font-medium tracking-wide text-bone-100/75 sm:text-base">
              {EMERGENCY_LABEL}
            </p>

            <h1
              id="hero-title"
              className="font-display text-5xl font-semibold text-bone-50 sm:text-6xl xl:text-7xl"
            >
              <HeroLine index={1}>No está bien</HeroLine>
              <HeroLine index={2}>y no sabes si</HeroLine>
              <HeroLine index={3}>puede esperar.</HeroLine>
              <HeroLine index={4} className="mt-2 italic text-sage-500">
                Llámanos
                <span className="hidden sm:inline"> y te lo decimos</span>.
              </HeroLine>
            </h1>

            <div
              className="hero-line mt-8 flex flex-wrap gap-3 sm:mt-10"
              style={{ '--i': 6 } as CSSProperties}
            >
              <Button href="#urgencias" variant="emergency" size="lg">
                <IconPhone className="h-5 w-5" />
                Urgencias
              </Button>
              <Button href="/contacto" variant="onDark" size="lg">
                Pedir cita
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  2 · La respuesta: cuatro telefonos                                 */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="urgencias"
        aria-labelledby="urgencias-title"
        className="scroll-mt-20 border-t border-bone-50/10 bg-charcoal-900 text-bone-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2
              id="urgencias-title"
              className="font-display text-4xl font-semibold sm:text-5xl lg:col-span-7"
            >
              Si es urgente, <span className="italic text-sage-500">llama.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-bone-100/75 lg:col-span-5 lg:justify-self-end lg:text-lg">
              {EMERGENCY_LABEL}. {EMERGENCY_NOTE}
            </p>
          </div>

          <ul className="mt-10 border-b border-bone-50/15 sm:mt-14">
            {clinics.map((clinic) => (
              <li key={clinic.slug} className="border-t border-bone-50/15">
                <a
                  href={`tel:${clinic.emergencyPhoneHref}`}
                  className="group -mx-4 flex flex-col gap-1 px-4 py-5 transition-colors duration-200 hover:bg-sage-500 hover:text-charcoal-950 focus-visible:bg-sage-500 focus-visible:text-charcoal-950 sm:-mx-6 sm:grid sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-x-8 sm:px-6 sm:py-6 lg:-mx-8 lg:grid-cols-[12rem_1fr_auto] lg:px-8"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-bone-100/60 transition-colors duration-200 group-hover:text-charcoal-950/70 group-focus-visible:text-charcoal-950/70">
                    {clinic.shortName}
                  </span>
                  <span className="font-serif text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl lg:text-6xl">
                    {clinic.emergencyPhone}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-bone-100/70 transition-colors duration-200 group-hover:text-charcoal-950 group-focus-visible:text-charcoal-950 sm:mt-0">
                    <IconPhone className="h-4 w-4" />
                    Llamar
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 text-sm text-bone-100/65 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-medium text-bone-100/85">
              Las clínicas tienen horario. El teléfono, no.
            </p>
            <dl className="flex flex-wrap gap-x-6 gap-y-1">
              {OPENING_HOURS.map((slot) => (
                <div key={slot.days} className="flex gap-2">
                  <dt>{slot.days}</dt>
                  <dd className="tabular-nums text-bone-50">{slot.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  3 · Por que aqui: cuatro barrios                                    */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="clinicas-title"
        className="bg-bone-50 text-charcoal-950 lg:grid lg:grid-cols-2"
      >
        {/* Pareja fotografica: pastor aleman y dobermann, ambos mirando hacia
            el texto. Sin tarjeta: la placa gris de la foto es el bloque. */}
        <div className="reveal grid grid-cols-2 lg:sticky lg:top-18 lg:order-2 lg:h-[calc(100svh-4.5rem)] lg:self-start">
          <div className="relative aspect-[2/3] lg:aspect-auto lg:h-full">
            <Image
              src="/images/editorial/pastor-aleman.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover object-[45%_100%]"
            />
          </div>
          <div className="relative aspect-[2/3] lg:aspect-auto lg:h-full">
            <Image
              src="/images/editorial/dobermann.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover object-[25%_100%]"
            />
          </div>
        </div>

        <div className="px-4 py-16 sm:px-6 sm:py-20 lg:order-1 lg:py-24 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16 xl:pr-24">
          <div className="reveal">
            <h2
              id="clinicas-title"
              className="font-display text-4xl font-semibold sm:text-5xl"
            >
              Medicina especializada,
              <br />
              <span className="italic text-sage-700">sin cruzar Madrid.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal-900/80">
              Desde 2022, cuatro clínicas de barrio en Chamberí, Malasaña, Las Rozas
              y El Burgo. La especialización viene a tu calle; tú no tienes que
              cruzar la ciudad con el transportín.
            </p>
          </div>

          <ul className="mt-10 border-b border-bone-300 sm:mt-12">
            {clinics.map((clinic) => (
              <li
                key={clinic.slug}
                className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 border-t border-bone-300 py-5 sm:py-6"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-900/55">
                    {clinic.name}
                  </p>
                  <h3 className="mt-1.5 text-3xl font-semibold sm:text-4xl">
                    <Link
                      href={`/clinicas/${clinic.slug}`}
                      className="link-grow [--underline:var(--color-sage-600)] [--underline-h:2px] after:absolute after:inset-0"
                    >
                      {clinic.neighbourhood}
                    </Link>
                  </h3>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-charcoal-900/70">
                    <span>
                      {clinic.address}, {clinic.postalCode} {clinic.city}
                    </span>
                    <a
                      href={`tel:${clinic.phoneHref}`}
                      className="link-grow relative z-10 font-medium tabular-nums text-charcoal-950"
                    >
                      {clinic.phone}
                    </a>
                  </p>
                </div>
                <IconArrow className="h-6 w-6 text-sage-700 transition-transform duration-300 ease-out-soft group-hover:translate-x-1.5" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  4 · Quien te atiende                                                */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="equipo-title"
        className="overflow-hidden bg-charcoal-950 text-bone-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="reveal grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h2
              id="equipo-title"
              className="font-display text-4xl font-semibold sm:text-5xl lg:col-span-6"
            >
              Quien te atiende
              <br />
              <span className="italic text-sage-500">tiene nombre y cara.</span>
            </h2>
            <div className="text-base leading-relaxed text-bone-100/75 lg:col-span-6 lg:col-start-7 lg:pt-3 lg:text-lg">
              <p>
                Somos {team.length} personas repartidas entre las cuatro clínicas:
                medicina interna, cirugía, dermatología, traumatología, cardiología,
                oncología, neurología y rehabilitación, con las auxiliares que
                sostienen cada día. Lo dirige{' '}
                <span className="font-serif text-xl font-semibold text-bone-50">
                  Carlos Iglesias
                </span>
                , que tras pasar por hospitales de referencia en España trajo a Madrid
                un proyecto familiar nacido en Ribadesella.
              </p>
              <p className="mt-4 text-sm text-bone-100/60">
                Y desde hace nueve años, fuera de Madrid:{' '}
                <a
                  href={solidarityProject.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-grow font-medium text-bone-100/85"
                >
                  {solidarityProject.name}
                </a>
                , salud animal y humana en una comunidad remota de Etiopía.
              </p>
            </div>
          </div>

          {/* Cuatro personas reales con la bata azul. Fotografia como copia
              en papel sobre carbon: sin borde, sin tarjeta, con desnivel. */}
          <ul className="reveal mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4 sm:pb-10 lg:gap-6">
            {TEAM_IN_CONTEXT.map((src, i) => (
              <li
                key={src}
                className={cn(
                  'group relative aspect-[3/4] overflow-hidden bg-charcoal-800',
                  i % 2 === 1 && 'mt-8 sm:mt-0 sm:translate-y-10',
                )}
              >
                <Image
                  src={src}
                  alt="Miembro del equipo de IVET Madrid con el uniforme azul de la clínica"
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 24vw, 45vw"
                  className="object-cover object-top transition-transform duration-300 ease-out-soft group-hover:scale-[1.03]"
                />
              </li>
            ))}
          </ul>

          <p className="mt-10 sm:mt-6">
            <Link
              href="/equipo"
              className="link-grow inline-flex items-center gap-2 font-serif text-xl font-semibold text-bone-50 [--underline:var(--color-sage-500)] [--underline-h:2px] sm:text-2xl"
            >
              Conoce a las {team.length} personas del equipo
              <IconArrow className="h-5 w-5 text-sage-500" />
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  5 · Que sabemos hacer                                               */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="servicios-title"
        className="bg-bone-50 text-charcoal-950"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-24">
          <div className="reveal lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2
                id="servicios-title"
                className="font-display text-4xl font-semibold sm:text-5xl"
              >
                De la vacuna
                <br />
                <span className="italic text-sage-700">al quirófano.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-900/80">
                {services.length} áreas clínicas en las cuatro clínicas, de la
                medicina preventiva a la cirugía mínimamente invasiva, la neurología o
                la rehabilitación. Sin catálogo: lo que sabemos hacer, dicho en una
                línea.
              </p>
              <p className="mt-8">
                <Link
                  href="/servicios"
                  className="link-grow inline-flex items-center gap-2 font-medium text-charcoal-950 [--underline:var(--color-sage-600)]"
                >
                  Ver todos los servicios
                  <IconArrow className="h-4 w-4 text-sage-700" />
                </Link>
              </p>
            </div>
          </div>

          <ul className="mt-12 border-b border-bone-300 lg:col-span-7 lg:mt-0">
            {services.map((service) => (
              <li
                key={service.slug}
                className="group border-t border-bone-300 py-5 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-x-8 sm:py-6"
              >
                <h3 className="text-xl font-semibold leading-snug sm:text-2xl">
                  <Link
                    href={`/servicios#${service.slug}`}
                    className="link-grow [--underline:var(--color-sage-600)] [--underline-h:2px]"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-900/70 sm:mt-1">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  6 · Cierre: pedir cita                                              */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="cita-title"
        className="bg-charcoal-900 text-bone-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="reveal grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2
                id="cita-title"
                className="font-display text-5xl font-semibold sm:text-6xl xl:text-7xl"
              >
                Pide cita
                <br />
                <span className="italic text-sage-500">en la que te pille cerca.</span>
              </h2>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sage-500 px-7 py-3.5 text-base font-semibold text-charcoal-950 transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-sage-400 active:translate-y-0 sm:text-lg"
                >
                  Pedir cita
                  <IconArrow className="h-5 w-5" />
                </Link>
                <Button href="/urgencias" variant="onDark" size="lg">
                  <IconPhone className="h-5 w-5" />
                  Urgencias
                </Button>
              </div>
            </div>

            <dl className="grid gap-3 text-sm text-bone-100/65 lg:col-span-4 lg:justify-self-end lg:text-base">
              {OPENING_HOURS.map((slot) => (
                <div
                  key={slot.days}
                  className="flex items-baseline justify-between gap-6 border-t border-bone-50/15 pt-3"
                >
                  <dt>{slot.days}</dt>
                  <dd className="tabular-nums text-bone-50">{slot.hours}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 border-t border-bone-50/15 pt-3">
                <dt>Urgencias por teléfono</dt>
                <dd className="text-sage-500">24 h</dd>
              </div>
            </dl>
          </div>

          <p className="mt-14 text-sm text-bone-100/50">
            {history.milestones.at(-1)?.text}
          </p>
        </div>
      </section>
    </>
  );
}
