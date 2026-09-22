'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { IconClose, IconMenu, IconPhone } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/clinicas', label: 'Clínicas' },
  { href: '/equipo', label: 'Equipo' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menu al navegar.
  useEffect(() => setOpen(false), [pathname]);

  // Bloquea el scroll de fondo y permite cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-out-soft',
        scrolled
          ? 'border-b border-bone-200 bg-bone-50/90 backdrop-blur-md'
          : 'border-b border-transparent bg-bone-50',
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="IVET Madrid, ir a la portada"
        >
          {/* Marca en dos piezas: el cuadro carbon lleva solo la V, y la
              palabra IVET va fuera, en texto. Asi el simbolo puede ser
              compacto y el nombre crecer sin tener que agrandar la barra.
              El texto replica el logotipo: mayusculas, peso ligero y mucho
              espaciado entre letras. */}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-charcoal-950 sm:h-12 sm:w-12">
            <Image
              src="/images/brand/ivet-v.webp"
              alt=""
              width={240}
              height={240}
              className="h-6 w-auto sm:h-7"
              priority
            />
          </span>
          <span className="text-2xl font-light uppercase leading-none tracking-[0.3em] text-charcoal-950 sm:text-[1.75rem]">
            Ivet
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                      active
                        ? 'text-charcoal-950'
                        : 'text-charcoal-900/70 hover:text-charcoal-950',
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-sage-1000 transition-transform duration-300 ease-out-soft',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/urgencias"
            variant="emergency"
            size="sm"
            className="hidden whitespace-nowrap sm:inline-flex"
          >
            <IconPhone className="h-4 w-4" />
            Urgencias
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal-900 transition-colors hover:bg-sage-100 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu movil */}
      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-bone-200 bg-bone-50 lg:hidden"
      >
        <nav aria-label="Principal (móvil)" className="px-4 py-4 sm:px-6">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium transition-colors',
                      active
                        ? 'bg-sage-100 text-charcoal-950'
                        : 'text-charcoal-900 hover:bg-sage-100',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 grid gap-2">
            <Button href="/urgencias" variant="emergency" size="lg">
              <IconPhone className="h-5 w-5" />
              Urgencias 24 h
            </Button>
            <Button href="/contacto" variant="secondary" size="lg">
              Pedir cita
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
