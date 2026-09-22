import type { Metadata } from 'next';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/blocks/CtaBand';
import { getServices } from '@/lib/content';
import {
  IconPaw,
  IconPhone,
  IconShield,
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Servicios veterinarios',
  description:
    'Medicina preventiva, cirugía, diagnóstico por imagen, dermatología, rehabilitación y más, en las cuatro clínicas de IVET Madrid.',
};

export default function ServiciosPage() {
  const services = getServices();

  return (
    <>
      <section className="border-b border-bone-200 bg-gradient-to-b from-sage-100 to-bone-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Servicios"
            title="Tus seres queridos, primero"
            description="Ofrecemos una amplia gama de servicios veterinarios diseñados para garantizar el bienestar y la salud de tu mascota en cada etapa de su vida, desde consultas de rutina y diagnósticos avanzados hasta cirugías especializadas y cuidados preventivos."
          />
        </Container>
      </section>

      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const isEmergency = service.slug === 'urgencias';
            return (
              <li
                key={service.slug}
                id={service.slug}
                className={`reveal scroll-mt-28 rounded-2xl border p-6 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-xl hover:shadow-charcoal-950/8 ${
                  isEmergency
                    ? 'border-amber-500/40 bg-amber-100/50 hover:border-amber-500'
                    : 'border-bone-200 bg-white hover:border-sage-400'
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isEmergency ? 'bg-amber-600 text-white' : 'bg-sage-100 text-sage-700'
                  }`}
                >
                  {isEmergency ? (
                    <IconPhone className="h-6 w-6" />
                  ) : service.slug === 'medicina-preventiva' ? (
                    <IconShield className="h-6 w-6" />
                  ) : (
                    <IconPaw className="h-6 w-6" />
                  )}
                </span>
                <h2 className="mt-5 text-xl">{service.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-900/75">
                  {service.description}
                </p>
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
