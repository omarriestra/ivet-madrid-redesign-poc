import Link from 'next/link';
import Image from 'next/image';
import { getClinics, EMERGENCY_LABEL, OPENING_HOURS, site } from '@/lib/content';
import { IconMail, IconPhone, IconPin } from '@/components/ui/Icons';

const sections = [
  {
    title: 'Atención',
    links: [
      { href: '/urgencias', label: 'Urgencias' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/contacto', label: 'Pedir cita' },
      { href: '/tienda', label: 'Alimentación y productos' },
    ],
  },
  {
    title: 'IVET Madrid',
    links: [
      { href: '/sobre-nosotros', label: 'Sobre nosotros' },
      { href: '/equipo', label: 'Equipo' },
      { href: '/clinicas', label: 'Nuestras clínicas' },
      { href: '/blog', label: 'Blog' },
    ],
  },
];

export function Footer() {
  const clinics = getClinics();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-charcoal-950 text-bone-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/images/brand/ivet-lockup.webp"
                alt=""
                width={600}
                height={526}
                className="h-16 w-auto"
              />
              <span className="sr-only">IVET Madrid</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-100/70">
              Medicina veterinaria de proximidad en Madrid. Cuatro clínicas con un mismo
              equipo y una misma forma de cuidar.
            </p>

            <p className="mt-6 text-sm font-semibold text-amber-100">{EMERGENCY_LABEL}</p>
            <ul className="mt-3 space-y-1.5">
              {clinics.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`tel:${c.emergencyPhoneHref}`}
                    className="group inline-flex items-center gap-2 text-sm text-bone-100/80 transition-colors hover:text-white"
                  >
                    <IconPhone className="h-4 w-4 text-sage-400 transition-colors group-hover:text-amber-100" />
                    <span className="font-medium">{c.shortName}</span>
                    <span className="tabular-nums">{c.emergencyPhone}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-8 lg:col-span-1">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-serif text-base font-semibold text-white">{s.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-bone-100/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <h2 className="font-serif text-base font-semibold text-white">Clínicas</h2>
            <ul className="mt-4 space-y-4">
              {clinics.map((c) => (
                <li key={c.slug} className="text-sm">
                  <Link
                    href={`/clinicas/${c.slug}`}
                    className="font-medium text-bone-100 transition-colors hover:text-amber-100"
                  >
                    {c.shortName}
                  </Link>
                  <span className="mt-1 flex items-start gap-2 text-bone-100/60">
                    <IconPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {c.address}, {c.city}
                  </span>
                  <a
                    href={`mailto:${c.email}`}
                    className="mt-1 inline-flex items-center gap-2 text-bone-100/60 transition-colors hover:text-white"
                  >
                    <IconMail className="h-3.5 w-3.5 shrink-0" />
                    {c.email}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-serif text-base font-semibold text-white">Horario</h2>
            <ul className="mt-3 space-y-1 text-sm text-bone-100/70">
              {OPENING_HOURS.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="tabular-nums">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-bone-100/60">
            <span>
              © {year} {site.legalName}
            </span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span>Aviso legal</span>
            <span>Política de privacidad</span>
            <span>Política de cookies</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-100/70 transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-100/70 transition-colors hover:text-white"
            >
              Facebook
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-100/70 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <p className="mt-8 rounded-xl bg-white/5 px-4 py-3 text-xs leading-relaxed text-bone-100/75">
          Prueba de concepto de rediseño, sin relación comercial ni operativa con la web
          en producción. Los textos e imágenes pertenecen a IVET Madrid y se muestran
          únicamente a efectos de propuesta. Los formularios no envían datos.
        </p>
      </div>
    </footer>
  );
}
