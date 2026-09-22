import type { Metadata } from 'next';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ScheduleTable } from '@/components/blocks/ScheduleTable';
import { Button } from '@/components/ui/Button';
import { IconPhone, IconPin, IconWhatsApp } from '@/components/ui/Icons';
import { getClinics, EMERGENCY_LABEL, EMERGENCY_NOTE } from '@/lib/content';
import { whatsappUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Urgencias veterinarias',
  description:
    'Atención telefónica de urgencias 24 h en las cuatro clínicas de IVET Madrid. Llama antes de venir y te indicamos cómo actuar.',
};

/** Señales de alarma de consenso clínico general, no cifras inventadas. */
const warningSigns = [
  'Dificultad para respirar o encías pálidas o azuladas',
  'Vómitos o diarrea persistentes, sobre todo con sangre',
  'Ingestión de tóxicos, medicamentos o cuerpos extraños',
  'Traumatismos, atropellos o caídas importantes',
  'Convulsiones o pérdida de consciencia',
  'Imposibilidad de orinar, especialmente en gatos macho',
  'Abdomen hinchado y duro, con intentos de vomitar sin éxito',
  'Parto que se prolonga sin avanzar',
];

export default function UrgenciasPage() {
  const clinics = getClinics();

  return (
    <>
      <section className="bg-charcoal-950 py-16 text-bone-50 sm:py-20">
        <Container>
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-4 py-1.5 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            {EMERGENCY_LABEL}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl text-bone-50 sm:text-5xl">
            Si tu mascota no puede esperar, llámanos
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-100/80">
            {EMERGENCY_NOTE} Nuestro equipo te orienta por teléfono a cualquier hora y
            prepara la atención en la clínica que te corresponda.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {clinics.map((clinic) => (
              <li
                key={clinic.slug}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="font-serif text-lg font-semibold text-bone-50">
                  {clinic.name}
                </p>
                <p className="mt-1 flex items-start gap-2 text-sm text-bone-100/65">
                  <IconPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {clinic.address}, {clinic.city}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`tel:${clinic.emergencyPhoneHref}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
                  >
                    <IconPhone className="h-5 w-5" />
                    <span className="tabular-nums">{clinic.emergencyPhone}</span>
                  </a>
                  <a
                    href={whatsappUrl(
                      clinic.whatsapp,
                      `Hola, necesito atención urgente en ${clinic.name}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-3 text-sm font-semibold text-bone-50 transition-colors hover:bg-white/15"
                  >
                    <IconWhatsApp className="h-5 w-5" />
                    WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Cuándo llamar"
              title="Señales que no conviene dejar para mañana"
              description="Ante cualquiera de estas situaciones, llama antes de desplazarte: podemos indicarte los primeros pasos mientras preparamos tu llegada."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {warningSigns.map((sign) => (
                <li
                  key={sign}
                  className="flex gap-3 rounded-xl border border-bone-200 bg-white p-4 text-sm leading-relaxed text-charcoal-900/80"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500"
                  />
                  {sign}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-amber-100 px-5 py-4 text-sm leading-relaxed text-amber-700">
              Esta lista es orientativa y no sustituye una valoración veterinaria. Ante la
              duda, llama: preferimos una consulta de más que una urgencia tarde.
            </p>
          </div>

          <aside className="space-y-6">
            <ScheduleTable title="Horario de las clínicas" />
            <div className="rounded-2xl border border-bone-200 bg-white p-6">
              <h2 className="font-serif text-lg font-semibold">Fuera de horario</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-900/75">
                El teléfono de urgencias atiende las 24 horas. Si llamas cuando la clínica
                está cerrada, te orientamos sobre cómo actuar y te indicamos el centro de
                referencia más adecuado.
              </p>
              <Button href="/contacto" variant="secondary" size="sm" className="mt-5">
                Consulta no urgente
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
