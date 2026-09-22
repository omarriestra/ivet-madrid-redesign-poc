import { Container } from '@/components/ui/Container';

/**
 * Cabecera de pagina con el mismo lenguaje que la portada: banda a sangre de
 * carbon y titular en dos voces, la segunda en italica verde salvia.
 *
 * Sustituye al patron anterior (gradiente verde claro + eyebrow + parrafo
 * centrado), que hacia que las paginas interiores parecieran de otro sitio.
 */
export function PageHero({
  title,
  accent,
  description,
  children,
}: {
  /** Primera linea del titular, en redonda. */
  title: string;
  /** Segunda linea, en italica y verde. Es la que da el tono. */
  accent?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[46svh] items-center bg-charcoal-950 text-bone-50 sm:min-h-[52svh]">
      {/* Altura minima para que todas las cabeceras ocupen lo mismo, tenga el
          titular una linea o tres. Sin ella, unas paginas abren con una franja
          fina y otras con un bloque alto. */}
      <Container className="py-14 sm:py-16 lg:py-20">
        <h1 className="max-w-4xl font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
          {title}
          {accent && (
            <>
              <br />
              <span className="italic text-sage-500">{accent}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-100/75">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
