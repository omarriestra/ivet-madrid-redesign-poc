import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import {
  IconArrow,
  IconCheck,
  IconClock,
  IconPaw,
  IconPhone,
  IconPin,
  IconShield,
} from '@/components/ui/Icons';
import {
  EMERGENCY_LABEL,
  EMERGENCY_NOTE,
  OPENING_HOURS,
  getClinics,
  getPosts,
  getServices,
  getTeam,
  history,
  site,
  solidarityProject,
} from '@/lib/content';
import type { Service, TeamMember } from '@/content/types';
import { cn, formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Clínicas veterinarias en Madrid con urgencias telefónicas 24 h',
  description: site.description,
};

/* -------------------------------------------------------------------------- */
/*  Iconografia local para servicios (mismo trazo que components/ui/Icons)     */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string };
type IconComponent = (props: IconProps) => React.ReactElement;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

function IconScalpel({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="m3.5 20.5 6.2-6.2" />
      <path d="M9.7 14.3 18.3 5.7a2.1 2.1 0 0 1 3 3l-8.6 8.6-3-3Z" />
      <path d="m12.7 11.3 3 3" />
    </svg>
  );
}

function IconPrecision({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
    </svg>
  );
}

function IconJoint({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <circle cx="6.5" cy="17.5" r="2.6" />
      <circle cx="17.5" cy="6.5" r="2.6" />
      <path d="m8.4 15.6 7.2-7.2" />
      <path d="m10.5 9.5 4 4" />
    </svg>
  );
}

function IconDrop({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5Z" />
      <path d="M9.2 14.2a2.9 2.9 0 0 0 2.4 2.7" />
    </svg>
  );
}

function IconPulse({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M3 12h3l2.2-5 3.4 10 2.8-7.5 1.8 2.5H21" />
    </svg>
  );
}

function IconBed({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M3 18.5v-10" />
      <path d="M3 14.5h18v4" />
      <path d="M21 14.5v-3.2a2 2 0 0 0-2-2h-8.5v5.2" />
      <circle cx="7" cy="11" r="1.9" />
    </svg>
  );
}

function IconRecover({ className }: IconProps) {
  return (
    <svg {...stroke} className={className}>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 4v4.5h-4.5" />
      <path d="m9.5 12.5 1.8 1.8 3.6-3.8" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Seleccion editorial de datos (los datos siempre vienen de lib/content)     */
/* -------------------------------------------------------------------------- */

const FEATURED_SERVICES: ReadonlyArray<{ slug: string; icon: IconComponent }> = [
  { slug: 'medicina-preventiva', icon: IconShield },
  { slug: 'cirugia-general', icon: IconScalpel },
  { slug: 'cirugia-minimamente-invasiva', icon: IconPrecision },
  { slug: 'traumatologia', icon: IconJoint },
  { slug: 'dermatologia', icon: IconDrop },
  { slug: 'diagnostico-por-imagen', icon: IconPulse },
  { slug: 'hospitalizacion', icon: IconBed },
  { slug: 'rehabilitacion', icon: IconRecover },
];

const HERO_PORTRAITS = [
  'paula-hernandez',
  'julia-esteban',
  'lucia-martos',
  'marta-malagon',
  'nuria-martin',
] as const;

function pickTeam(team: TeamMember[], slugs: readonly string[]) {
  return slugs
    .map((slug) => team.find((m) => m.slug === slug))
    .filter((m): m is TeamMember & { image: string } => Boolean(m && m.image));
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/* -------------------------------------------------------------------------- */
/*  Sub-bloques visuales                                                       */
/* -------------------------------------------------------------------------- */

/** Anillos concentricos: firma grafica del rediseno, sin fotografia de stock. */
function Rings({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      fill="none"
      className={cn('pointer-events-none absolute', className)}
    >
      {[296, 236, 176, 116, 56].map((r) => (
        <circle
          key={r}
          cx="300"
          cy="300"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex h-2.5 w-2.5', className)} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/70" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
    </span>
  );
}

function ArrowLink({
  href,
  children,
  className,
  light,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors',
        light ? 'text-bone-50 hover:text-white' : 'text-petrol-700 hover:text-petrol-900',
        className,
      )}
    >
      {children}
      <IconArrow className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
    </Link>
  );
}

function ServiceCard({
  service,
  index,
  Icon,
}: {
  service: Service;
  index: number;
  Icon: IconComponent;
}) {
  return (
    <li className="reveal">
      <Link
        href={`/servicios#${service.slug}`}
        className="group flex h-full gap-5 rounded-2xl p-5 transition-colors duration-300 hover:bg-white sm:p-6"
      >
        <div className="flex shrink-0 flex-col items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-petrol-50 text-petrol-700 ring-1 ring-petrol-100 transition-colors duration-300 group-hover:bg-petrol-700 group-hover:text-bone-50">
            <Icon className="h-6 w-6" />
          </span>
          <span className="font-serif text-sm text-petrol-300">{pad(index + 1)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-start justify-between gap-3 text-xl leading-snug text-petrol-900">
            <span>{service.name}</span>
            <IconArrow className="mt-1 h-5 w-5 shrink-0 text-petrol-300 transition-all duration-300 ease-out-soft group-hover:translate-x-1 group-hover:text-petrol-700" />
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-petrol-800/75 sm:text-base">
            {service.description}
          </p>
        </div>
      </Link>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pagina                                                                     */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const clinics = getClinics();
  const services = getServices();
  const team = getTeam();
  const posts = [...getPosts()]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  const featuredServices = FEATURED_SERVICES.flatMap(({ slug, icon }) => {
    const service = services.find((s) => s.slug === slug);
    return service ? [{ service, icon }] : [];
  });

  const heroPortraits = pickTeam(team, HERO_PORTRAITS);
  const withPhoto = team.filter((m): m is TeamMember & { image: string } => Boolean(m.image));
  const teamPreview = withPhoto.slice(0, 5);
  const [featuredPost, ...otherPosts] = posts;

  const neighbourhoods = clinics.map((c) => c.neighbourhood);
  const neighbourhoodList =
    neighbourhoods.length > 1
      ? `${neighbourhoods.slice(0, -1).join(', ')} y ${neighbourhoods.at(-1)}`
      : neighbourhoods.join('');

  const facts = [
    { value: String(clinics.length), label: 'clínicas en Madrid' },
    { value: history.milestones[0]?.year ?? '2022', label: 'año de nacimiento' },
    { value: '2', label: 'centros en Asturias' },
    { value: '9', label: 'años en One Health Nyangatom' },
  ];

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-petrol-900 text-bone-50"
      >
        {/* Fondo: gradiente radial + anillos */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_0%,var(--color-petrol-700),transparent_70%)]"
        />
        <Rings className="-right-40 -top-56 h-[38rem] w-[38rem] text-petrol-500/25 sm:-right-32 lg:-top-40 lg:right-[38%] lg:h-[52rem] lg:w-[52rem]" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-petrol-900 to-transparent"
        />

        <Container size="wide" className="relative">
          <div className="grid gap-12 pb-28 pt-12 sm:pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-36 lg:pt-20">
            {/* Texto */}
            <div className="lg:col-span-7">
              <p className="inline-flex min-h-9 items-center gap-2.5 rounded-full border border-petrol-500/40 bg-petrol-800/60 py-1.5 pl-3 pr-4 text-sm font-semibold text-petrol-100 backdrop-blur-sm">
                <LiveDot />
                {EMERGENCY_LABEL}
              </p>

              <h1
                id="hero-title"
                className="mt-6 max-w-[14ch] text-5xl leading-[1.02] text-bone-50 sm:max-w-[16ch] lg:max-w-none lg:text-[clamp(3.25rem,4.6vw,4.75rem)]"
              >
                Veterinarios de barrio en Madrid.{' '}
                <span className="font-normal italic text-amber-500">
                  Urgencias al teléfono, las 24 h.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-50/75 sm:text-xl">
                {site.tagline}: {clinics.length} clínicas en {neighbourhoodList}. Medicina
                especializada cerca de casa, sin largos desplazamientos, con el espíritu
                de un proyecto familiar.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/urgencias" variant="emergency" size="lg">
                  <IconPhone className="h-5 w-5" />
                  Urgencias
                </Button>
                <Button href="/contacto" variant="onDark" size="lg">
                  Pedir cita
                  <IconArrow className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-bone-50/70">
                <span className="inline-flex items-center gap-2">
                  <IconClock className="h-4.5 w-4.5 text-petrol-300" />
                  {OPENING_HOURS[0].days} {OPENING_HOURS[0].hours}
                </span>
                <span className="inline-flex items-center gap-2">
                  <IconPin className="h-4.5 w-4.5 text-petrol-300" />
                  {clinics.length} clínicas en Madrid
                </span>
              </div>

              {/* Movil: fila compacta de retratos */}
              {heroPortraits.length > 0 && (
                <div className="mt-8 flex items-center gap-4 lg:hidden">
                  <ul className="flex -space-x-3" aria-label="Parte del equipo de IVET Madrid">
                    {heroPortraits.map((m) => (
                      <li key={m.slug}>
                        <Image
                          src={m.image}
                          alt={`${m.name}, ${m.role}`}
                          width={48}
                          height={48}
                          sizes="48px"
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-petrol-900"
                        />
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm leading-snug text-bone-50/70">
                    <span className="font-semibold text-bone-50">{team.length} profesionales</span>
                    <br />
                    en {clinics.length} clínicas
                  </p>
                </div>
              )}
            </div>

            {/* Escritorio: mosaico editorial del equipo */}
            {heroPortraits.length >= 3 && (
              <div className="hidden lg:col-span-5 lg:block">
                <div className="grid aspect-[5/6] grid-cols-6 grid-rows-6 gap-3">
                  <figure className="relative col-span-3 row-span-4 overflow-hidden rounded-[1.75rem] bg-petrol-800">
                    <Image
                      src={heroPortraits[0].image}
                      alt={`${heroPortraits[0].name}, ${heroPortraits[0].role}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="object-cover"
                    />
                  </figure>
                  <figure className="relative col-span-3 col-start-4 row-span-3 row-start-2 overflow-hidden rounded-[1.75rem] bg-petrol-800">
                    <Image
                      src={heroPortraits[1].image}
                      alt={`${heroPortraits[1].name}, ${heroPortraits[1].role}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="object-cover"
                    />
                  </figure>
                  <div className="col-span-3 col-start-4 row-start-1 flex items-end">
                    <p className="pb-1 pl-2 font-serif text-sm italic leading-snug text-petrol-300">
                      Bata azul, trato de barrio.
                    </p>
                  </div>
                  <div className="col-span-1 row-span-2 row-start-5 flex flex-col items-center justify-center gap-1.5 rounded-[1.25rem] bg-amber-500 px-1 text-petrol-900">
                    <IconPaw className="h-8 w-8" />
                    <span className="text-center font-serif text-[0.7rem] font-semibold leading-tight">
                      Desde
                      <br />
                      2022
                    </span>
                  </div>
                  <figure className="relative col-span-2 col-start-2 row-span-2 row-start-5 overflow-hidden rounded-[1.25rem] bg-petrol-800">
                    <Image
                      src={heroPortraits[2].image}
                      alt={`${heroPortraits[2].name}, ${heroPortraits[2].role}`}
                      fill
                      sizes="(min-width: 1024px) 14vw, 33vw"
                      className="object-cover"
                    />
                  </figure>
                  <div className="col-span-3 col-start-4 row-span-2 row-start-5 flex flex-col justify-between rounded-[1.25rem] bg-bone-50 p-4 text-petrol-900">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-petrol-600">
                      <IconClock className="h-4 w-4" />
                      Horario
                    </p>
                    <dl className="space-y-0.5 text-sm">
                      {OPENING_HOURS.map((h) => (
                        <div key={h.days} className="flex justify-between gap-3">
                          <dt className="text-petrol-800/70">{h.days}</dt>
                          <dd className="font-semibold tabular-nums">{h.hours}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. TIRA DE URGENCIAS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="urgencias-title" className="relative z-10 -mt-16 sm:-mt-20">
        <Container size="wide">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-petrol-900/20 ring-1 ring-petrol-900/5">
            <div className="flex flex-col gap-2 border-b border-bone-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <h2
                id="urgencias-title"
                className="flex items-center gap-3 font-sans text-base font-semibold tracking-normal text-petrol-900"
              >
                <LiveDot />
                {EMERGENCY_LABEL}
              </h2>
              <p className="text-sm text-petrol-800/70">{EMERGENCY_NOTE}</p>
            </div>
            <ul className="grid grid-cols-2 gap-px bg-bone-200 lg:grid-cols-4">
              {clinics.map((clinic) => (
                <li key={clinic.slug} className="bg-white">
                  <a
                    href={`tel:${clinic.emergencyPhoneHref}`}
                    className="group flex min-h-24 flex-col justify-between gap-2 px-4 py-4 transition-colors duration-200 hover:bg-amber-100/50 sm:px-6"
                    aria-label={`Llamar a urgencias de ${clinic.name}: ${clinic.emergencyPhone}`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-petrol-500">
                      {clinic.shortName}
                    </span>
                    <span className="flex items-center gap-2 font-serif text-xl text-petrol-900 sm:text-2xl">
                      <IconPhone className="h-5 w-5 shrink-0 text-amber-600 transition-transform duration-300 ease-out-soft group-hover:-rotate-12" />
                      <span className="tabular-nums">{clinic.emergencyPhone}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SERVICIOS                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="servicios-title" className="pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-28 lg:pt-32">
        <Container size="wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="reveal">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petrol-500">
                Servicios
              </p>
              <h2 id="servicios-title" className="max-w-2xl text-3xl sm:text-4xl">
                Medicina especializada, a la vuelta de la esquina.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-petrol-800/80">
                De la vacuna anual al quirófano: {services.length} servicios para que tu
                mascota no tenga que salir del barrio para recibir la atención que
                necesita.
              </p>
            </div>
            <ArrowLink href="/servicios" className="shrink-0">
              Ver los {services.length} servicios
            </ArrowLink>
          </div>

          <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:mt-14 lg:gap-3 xl:grid-cols-4">
            {featuredServices.map(({ service, icon }, i) => (
              <ServiceCard key={service.slug} service={service} index={i} Icon={icon} />
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. LAS 4 CLINICAS                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="clinicas-title" className="bg-bone-100 py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="reveal">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petrol-500">
                Clínicas
              </p>
              <h2 id="clinicas-title" className="max-w-2xl text-3xl sm:text-4xl">
                Del centro a Las Rozas: cuatro clínicas de barrio.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-petrol-800/80">
                Del centro a la sierra. Elige la clínica más cercana: en todas te atiende el
                mismo equipo y la misma forma de hacer las cosas.
              </p>
            </div>
            <ArrowLink href="/clinicas" className="shrink-0">
              Todas las clínicas
            </ArrowLink>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4">
            {clinics.map((clinic, i) => (
              <li key={clinic.slug} className="reveal">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-petrol-900/5 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-xl hover:shadow-petrol-900/10">
                  <Rings className="-right-24 -top-24 h-64 w-64 text-petrol-100 transition-transform duration-500 ease-out-soft group-hover:scale-110" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-petrol-500">
                        {clinic.neighbourhood}
                      </p>
                      <span className="font-serif text-sm text-petrol-300">{pad(i + 1)}</span>
                    </div>
                    <h3 className="mt-3 text-2xl text-petrol-900">
                      <Link
                        href={`/clinicas/${clinic.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {clinic.shortName}
                      </Link>
                    </h3>
                    <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-petrol-800/75">
                      <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-petrol-500" />
                      <span>
                        {clinic.address}
                        <br />
                        {clinic.postalCode} {clinic.city}
                      </span>
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-bone-200 pt-4">
                    <a
                      href={`tel:${clinic.phoneHref}`}
                      className="relative z-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-petrol-800 transition-colors hover:text-petrol-900"
                      aria-label={`Llamar a ${clinic.name}: ${clinic.phone}`}
                    >
                      <IconPhone className="h-4 w-4 text-petrol-500" />
                      <span className="tabular-nums">{clinic.phone}</span>
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-petrol-700">
                      Ver clínica
                      <IconArrow className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. CONFIANZA / HISTORIA                                             */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="historia-title" className="py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="reveal lg:sticky lg:top-28">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petrol-500">
                  Nuestra historia
                </p>
                <h2 id="historia-title" className="text-3xl sm:text-4xl">
                  Un proyecto familiar que nació en Ribadesella y echó raíces en Madrid.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-petrol-800/80">{history.intro}</p>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-bone-300 pt-8">
                  {facts.map((f) => (
                    <div key={f.label} className="flex flex-col-reverse">
                      <dt className="mt-2 text-sm text-petrol-800/70">{f.label}</dt>
                      <dd className="font-serif text-4xl leading-none text-petrol-700">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ol className="relative border-l border-petrol-100 pl-8 sm:pl-10">
                {history.milestones.map((m, i) => (
                  <li key={`${m.year}-${m.title}`} className="reveal relative pb-10 last:pb-0">
                    <span
                      aria-hidden
                      className={cn(
                        'absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-bone-50 sm:-left-[calc(2.5rem+5px)]',
                        i === history.milestones.length - 1 ? 'bg-amber-500' : 'bg-petrol-500',
                      )}
                    />
                    <p className="font-serif text-3xl leading-none text-petrol-500">{m.year}</p>
                    <h3 className="mt-2 text-xl text-petrol-900">{m.title}</h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-petrol-800/75">{m.text}</p>
                  </li>
                ))}
              </ol>

              <aside
                aria-labelledby="solidario-title"
                className="reveal relative mt-12 overflow-hidden rounded-3xl bg-petrol-800 p-6 text-bone-50 sm:p-8"
              >
                <Rings className="-bottom-40 -right-32 h-96 w-96 text-petrol-500/30" />
                <div className="relative">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-petrol-300">
                    <IconPaw className="h-4 w-4" />
                    Proyecto solidario
                  </p>
                  <h3 id="solidario-title" className="mt-3 text-2xl text-bone-50 sm:text-3xl">
                    {solidarityProject.name}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-bone-50/75">
                    {solidarityProject.text}
                  </p>
                  <a
                    href={solidarityProject.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-100 transition-colors hover:text-white"
                  >
                    Seguir el proyecto en Instagram
                    <IconArrow className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. EQUIPO                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="equipo-title" className="bg-petrol-50 py-16 sm:py-20 lg:py-28">
        <Container size="wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="reveal">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petrol-500">
                Equipo
              </p>
              <h2 id="equipo-title" className="max-w-2xl text-3xl sm:text-4xl">
                Caras conocidas en cada consulta.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-petrol-800/80">
                {team.length} profesionales entre veterinarios y auxiliares, con áreas de
                dedicación como cirugía, dermatología, traumatología o rehabilitación.
              </p>
            </div>
            <ArrowLink href="/equipo" className="shrink-0">
              Conocer al equipo
            </ArrowLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-14 lg:grid-cols-6 lg:gap-4">
            {teamPreview.map((m) => (
              <li key={m.slug} className="reveal">
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-petrol-100">
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-petrol-900/90 via-petrol-900/40 to-transparent px-3 pb-3 pt-10 text-bone-50">
                    <p className="font-serif text-base leading-tight">{m.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-bone-50/80">
                      {m.role}
                      {m.clinic ? ` · ${m.clinic}` : ''}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
            <li className="reveal">
              <Link
                href="/equipo"
                className="group flex aspect-[4/5] flex-col justify-between rounded-2xl bg-petrol-700 p-4 text-bone-50 transition-colors duration-300 hover:bg-petrol-800"
              >
                <span className="font-serif text-4xl leading-none">
                  +{Math.max(team.length - teamPreview.length, 0)}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Todo el equipo
                  <IconArrow className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. BLOG                                                             */}
      {/* ------------------------------------------------------------------ */}
      {featuredPost && (
        <section aria-labelledby="blog-title" className="py-16 sm:py-20 lg:py-28">
          <Container size="wide">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="reveal">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petrol-500">
                  Consejos veterinarios
                </p>
                <h2 id="blog-title" className="max-w-2xl text-3xl sm:text-4xl">
                  Lo último del blog.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-petrol-800/80">
                  Guías escritas por el equipo para el día a día con tu mascota.
                </p>
              </div>
              <ArrowLink href="/blog" className="shrink-0">
                Todos los artículos
              </ArrowLink>
            </div>

            <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
              <article className="reveal group lg:col-span-7">
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-petrol-100">
                    {featuredPost.image && (
                      <Image
                        src={featuredPost.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="mt-5 flex flex-wrap items-center gap-x-3 text-xs font-semibold uppercase tracking-[0.14em] text-petrol-500">
                    <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{featuredPost.readingMinutes} min de lectura</span>
                  </p>
                  <h3 className="mt-3 text-2xl leading-snug text-petrol-900 transition-colors group-hover:text-petrol-700 sm:text-3xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-petrol-800/75">
                    {featuredPost.excerpt}
                  </p>
                </Link>
              </article>

              <div className="flex flex-col divide-y divide-bone-200 lg:col-span-5">
                {otherPosts.map((post) => (
                  <article key={post.slug} className="reveal group py-6 first:pt-0 lg:first:pt-0">
                    <Link href={`/blog/${post.slug}`} className="flex gap-5">
                      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-petrol-100 sm:w-32">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt=""
                            fill
                            sizes="(min-width: 640px) 128px, 96px"
                            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-[0.14em] text-petrol-500">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span aria-hidden>·</span>
                          <span>{post.readingMinutes} min</span>
                        </p>
                        <h3 className="mt-2 line-clamp-3 text-lg leading-snug text-petrol-900 transition-colors group-hover:text-petrol-700 sm:text-xl">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 8. CTA FINAL                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="cta-title"
        className="relative overflow-hidden bg-petrol-900 py-16 text-bone-50 sm:py-20 lg:py-28"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_100%,var(--color-petrol-700),transparent_70%)]"
        />
        <Rings className="-left-48 -top-48 h-[34rem] w-[34rem] text-petrol-500/20" />
        <Container size="wide" className="relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="reveal lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petrol-300">
                Pide cita
              </p>
              <h2 id="cta-title" className="text-4xl text-bone-50 sm:text-5xl">
                ¿Hablamos de la salud de tu mascota?
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-50/75">
                Cuéntanos qué necesita y te proponemos hora en la clínica que mejor te venga.
                Y si no puede esperar, llámanos: {EMERGENCY_LABEL.toLowerCase()}.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contacto" variant="onDark" size="lg">
                  Pedir cita
                  <IconArrow className="h-5 w-5" />
                </Button>
                <Button href="/urgencias" variant="emergency" size="lg">
                  <IconPhone className="h-5 w-5" />
                  Urgencias
                </Button>
              </div>
            </div>

            <div className="reveal lg:col-span-5">
              <div className="rounded-3xl border border-petrol-500/30 bg-petrol-800/60 p-6 backdrop-blur-sm sm:p-8">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-petrol-300">
                  <IconClock className="h-4 w-4" />
                  Horario de las clínicas
                </p>
                <dl className="mt-4 divide-y divide-petrol-500/20">
                  {OPENING_HOURS.map((h) => (
                    <div key={h.days} className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-bone-50/75">{h.days}</dt>
                      <dd className="font-serif text-lg tabular-nums text-bone-50">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex items-start gap-2 text-sm text-bone-50/70">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <span>
                    {EMERGENCY_LABEL}. {EMERGENCY_NOTE}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
