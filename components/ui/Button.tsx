import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'onDark' | 'emergency' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out-soft disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-petrol-700 text-bone-50 hover:bg-petrol-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-petrol-900/15 active:translate-y-0',
  secondary:
    'border border-petrol-300/70 bg-white/70 text-petrol-800 hover:border-petrol-500 hover:bg-white hover:-translate-y-0.5 active:translate-y-0',
  // Secundario sobre fondos oscuros (hero, bandas de cierre).
  onDark:
    'border border-white/30 bg-white/10 text-bone-50 backdrop-blur-sm hover:border-white/50 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0',
  emergency:
    'bg-amber-600 text-white hover:bg-amber-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-700/25 active:translate-y-0',
  ghost: 'text-petrol-700 hover:bg-petrol-50 hover:text-petrol-900',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-base sm:text-lg',
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
