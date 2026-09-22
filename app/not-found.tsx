import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { IconArrow, IconPaw, IconPhone } from '@/components/ui/Icons';
import { getClinics } from '@/lib/content';

const suggestions = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/clinicas', label: 'Nuestras clínicas' },
  { href: '/equipo', label: 'Equipo' },
  { href: '/blog', label: 'Blog' },
];

export default function NotFound() {
  const clinics = getClinics();

  return (
    <section className="flex flex-1 items-center py-20 sm:py-28">
      <Container size="narrow" className="text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-petrol-50">
          <IconPaw className="h-10 w-10 text-petrol-500" />
        </span>
        <p className="mt-8 font-serif text-6xl font-semibold text-petrol-300">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Esta página se nos ha escapado</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-petrol-800/75">
          No hemos encontrado lo que buscabas. Puede que el enlace haya cambiado o que la
          página ya no exista.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Volver al inicio
            <IconArrow className="h-5 w-5" />
          </Button>
          <Button href="/contacto" variant="secondary" size="lg">
            Pedir cita
          </Button>
        </div>

        <nav aria-label="Páginas sugeridas" className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-petrol-500">
            Quizá buscabas
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex rounded-full border border-bone-300 bg-white px-4 py-2 text-sm text-petrol-800 transition-colors hover:border-petrol-300 hover:text-petrol-900"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 rounded-2xl bg-petrol-900 p-6 text-left">
          <p className="text-sm font-semibold text-amber-100">
            ¿Es una urgencia? Llama a tu clínica
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {clinics.map((c) => (
              <li key={c.slug}>
                <a
                  href={`tel:${c.emergencyPhoneHref}`}
                  className="inline-flex items-center gap-2 text-sm text-bone-100/80 hover:text-white"
                >
                  <IconPhone className="h-4 w-4 text-petrol-300" />
                  <span className="font-medium">{c.shortName}</span>
                  <span className="tabular-nums">{c.emergencyPhone}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
