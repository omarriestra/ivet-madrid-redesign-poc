import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
import { ContactForm } from '@/components/blocks/ContactForm';
import { EmergencyStrip } from '@/components/blocks/EmergencyStrip';
import { ScheduleTable } from '@/components/blocks/ScheduleTable';
import { getClinics } from '@/lib/content';
import { whatsappUrl } from '@/lib/utils';
import { IconMail, IconPhone, IconPin, IconWhatsApp } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Contacto y cita',
  description:
    'Pide cita en IVET Madrid o contacta con cualquiera de nuestras cuatro clínicas: Ríos Rosas, Las Rozas, El Burgo y Malasaña.',
};

export default function ContactoPage() {
  const clinics = getClinics();

  return (
    <>
      <PageHero
        title="Pide cita"
        accent="para tu mascota."
        description="Rellena el formulario y te confirmamos la cita, o llama directamente a la clínica que prefieras."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-14">
          <div>
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-bone-200 bg-white p-6">
              <h2 className="font-serif text-lg font-semibold">Llámanos directamente</h2>
              <ul className="mt-5 space-y-5">
                {clinics.map((clinic) => (
                  <li key={clinic.slug} className="border-b border-bone-200 pb-5 last:border-0 last:pb-0">
                    <p className="font-serif font-semibold text-charcoal-950">
                      {clinic.name}
                    </p>
                    <p className="mt-1.5 flex items-start gap-2 text-sm text-charcoal-900/70">
                      <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" />
                      {clinic.address}, {clinic.city}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <a
                        href={`tel:${clinic.phoneHref}`}
                        className="inline-flex items-center gap-1.5 font-medium tabular-nums text-charcoal-900 hover:text-sage-700"
                      >
                        <IconPhone className="h-4 w-4" />
                        {clinic.phone}
                      </a>
                      <a
                        href={whatsappUrl(
                          clinic.whatsapp,
                          `Hola, quiero pedir cita en ${clinic.name}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-charcoal-900 hover:text-sage-700"
                      >
                        <IconWhatsApp className="h-4 w-4" />
                        WhatsApp
                      </a>
                      <a
                        href={`mailto:${clinic.email}`}
                        className="inline-flex items-center gap-1.5 break-all text-charcoal-900 hover:text-sage-700"
                      >
                        <IconMail className="h-4 w-4 shrink-0" />
                        {clinic.email}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ScheduleTable as="h2" />
          </aside>
        </div>

        <div className="mt-12">
          <EmergencyStrip />
        </div>
      </Section>
    </>
  );
}
