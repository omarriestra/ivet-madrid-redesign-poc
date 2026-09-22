/**
 * Iconografia propia en linea, alineada con la paleta azul petroleo.
 *
 * Los iconos de la web actual son verde salvia y no encajan con el rediseno,
 * asi que se dibujan aqui con `currentColor` para heredar el color del contexto.
 */
type IconProps = { className?: string };

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export function IconPhone({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M6.6 3.5h-2a1.6 1.6 0 0 0-1.6 1.8c.4 3.4 1.8 6.6 4 9.2 2 2.4 4.6 4.2 7.6 5.1a1.6 1.6 0 0 0 1.9-1.1l.5-1.8a1.3 1.3 0 0 0-.8-1.6l-2.4-.9a1.3 1.3 0 0 0-1.4.4l-.7.8a11.6 11.6 0 0 1-4.6-4.6l.8-.7a1.3 1.3 0 0 0 .4-1.4l-.9-2.4a1.3 1.3 0 0 0-1.2-.8Z" />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 6.8 7.3 5.2a1.6 1.6 0 0 0 1.8 0l7.3-5.2" />
    </svg>
  );
}

export function IconWhatsApp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm0 1.9a8.1 8.1 0 1 1-4.1 15.1l-.3-.2-2.8.8.7-2.8-.2-.3A8.1 8.1 0 0 1 12 3.9Zm-2.5 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3l-1.8-.9c-.3-.1-.5-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.3-.1-.5l-.8-1.8c-.2-.4-.4-.4-.6-.4h-.4Z" />
    </svg>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M5 12h13m-5.5-5.5L19 12l-6.5 5.5" />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 3 5 5.8v5.6c0 4.2 2.9 8 7 9.1 4.1-1.1 7-4.9 7-9.1V5.8L12 3Z" />
      <path d="m9.2 12 2 2 3.6-3.7" />
    </svg>
  );
}

export function IconPaw({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <ellipse cx="7.5" cy="9" rx="1.9" ry="2.4" />
      <ellipse cx="12" cy="7.3" rx="1.9" ry="2.5" />
      <ellipse cx="16.5" cy="9" rx="1.9" ry="2.4" />
      <path d="M12 12.6c-2.4 0-4.3 1.8-4.3 3.9 0 1.6 1.2 2.6 2.7 2.6.7 0 1.1-.3 1.6-.3s.9.3 1.6.3c1.5 0 2.7-1 2.7-2.6 0-2.1-1.9-3.9-4.3-3.9Z" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
