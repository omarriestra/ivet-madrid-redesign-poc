import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'onDark' | 'emergency' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out-soft disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-charcoal-900 text-bone-50 hover:bg-charcoal-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-charcoal-950/20 active:translate-y-0',
  secondary:
    'border border-sage-400/70 bg-white/70 text-charcoal-900 hover:border-sage-600 hover:bg-white hover:-translate-y-0.5 active:translate-y-0',
  // Secundario sobre fondos oscuros (hero, bandas de cierre).
  onDark:
    'border border-white/30 bg-white/10 text-bone-50 backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0',
  emergency:
    'bg-amber-600 text-white hover:bg-amber-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-700/25 active:translate-y-0',
  ghost: 'text-charcoal-900 hover:bg-sage-100 hover:text-charcoal-950',
};

// min-h-11 = 44px: objetivo tactil minimo recomendado. La web la usan
// familias de todas las edades desde el movil, muchas veces con prisa.
const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 py-2 text-sm',
  md: 'min-h-12 px-5 py-2.5 text-base',
  lg: 'min-h-14 px-7 py-3.5 text-base sm:text-lg',
};

interface Props {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  external?: boolean;
  'aria-label'?: string;
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  onClick,
  external,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    // tel:, mailto: y enlaces externos usan <a> nativo.
    if (external || /^(tel:|mailto:|https?:)/.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
