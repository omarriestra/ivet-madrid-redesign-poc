import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
import { CtaBand } from '@/components/blocks/CtaBand';
import { getClinics, getServices } from '@/lib/content';
import { IconPhone } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Servicios veterinarios',
  description:
    'Medicina preventiva, cirugía, diagnóstico por imagen, dermatología, rehabilitación y más, en las cuatro clínicas de IVET Madrid.',
};

export default function ServiciosPage() {
  const services = getServices();
  const clinics = getClinics();

  return (
    <>
      <PageHero
        title="De la vacuna anual"
        accent="al quirófano."
        description="Trece servicios para que tu mascota no tenga que salir del barrio para recibir la atención que necesita, en cada etapa de su vida."
      />

      <Section>
        {/* Lista tipografica, no rejilla de tarjetas: los servicios se leen
            como la carta de una consulta, con la urgencia destacada arriba. */}
        <ul className="border-b border-bone-300">
          {services.map((service) => {
            const isEmergency = service.slug === 'urgencias';
            return (
              <li
                key={service.slug}
                id={service.slug}
                className="reveal scroll-mt-28 border-t border-bone-300 py-7 sm:py-8"
              >
                <div className="grid gap-3 lg:grid-cols-12 lg:gap-8">
                  <h2
                    className={`font-display text-2xl font-semibold sm:text-3xl lg:col-span-5 ${
                      isEmergency ? 'text-amber-700' : ''
                    }`}
                  >
                    {service.name}
                  </h2>
                  <p className="text-base leading-relaxed text-charcoal-900/75 lg:col-span-7 lg:pt-1.5">
                    {service.description}
                  </p>
                </div>

                {isEmergency && (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {clinics.map((clinic) => (
                      <a
                        key={clinic.slug}
                        href={`tel:${clinic.emergencyPhoneHref}`}
                        className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-amber-600 px-5 py-2.5 font-semibold text-white transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-amber-700 active:translate-y-0"
                      >
                        <IconPhone className="h-5 w-5" />
                        <span className="text-sm">{clinic.shortName}</span>
                        <span className="tabular-nums">{clinic.emergencyPhone}</span>
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-sm text-charcoal-900/60">
          La disponibilidad de cada servicio puede variar según la clínica. Consúltanos y
          te indicamos el centro más adecuado.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
