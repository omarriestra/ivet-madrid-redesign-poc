import { cn } from '@/lib/utils';

/** Precio formateado en euros. Server Component: no necesita interactividad. */
export function ProductPrice({
  price,
  compact = false,
}: {
  price: number;
  compact?: boolean;
}) {
  const formatted = price.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <p
      className={cn(
        'font-display font-semibold tabular-nums',
        compact ? 'mt-1.5 text-base' : 'mt-4 text-3xl',
      )}
    >
      {formatted}
    </p>
  );
}
