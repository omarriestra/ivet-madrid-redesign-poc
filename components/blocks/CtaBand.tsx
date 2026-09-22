import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { IconArrow, IconPhone } from '@/components/ui/Icons';

export function CtaBand({
  title = '¿Hablamos de tu mascota?',
  text = 'Pide cita en la clínica que mejor te venga o llámanos si necesitas atención urgente.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-charcoal-900 px-6 py-14 text-center sm:px-12 sm:py-16">
          {/* Textura decorativa, puramente visual */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sage-600/50 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-charcoal-900/60 blur-2xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-xl text-3xl text-bone-50 sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-bone-100/80">{text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contacto" variant="emergency" size="lg">
                Pedir cita
                <IconArrow className="h-5 w-5" />
              </Button>
              <Button href="/urgencias" variant="onDark" size="lg">
                <IconPhone className="h-5 w-5" />
                Urgencias
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
