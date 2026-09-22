import { cn } from '@/lib/utils';
import { Container } from './Container';

export function Section({
  children,
  className,
  containerClassName,
  size = 'default',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: 'default' | 'narrow' | 'wide';
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-28', className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petrol-500">
          {eyebrow}
        </p>
      )}
      <Tag className={Tag === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}>
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-petrol-800/80">{description}</p>
      )}
    </div>
  );
}
