'use client';

import { useId, useRef, useState } from 'react';
import { getClinics } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { IconCheck } from '@/components/ui/Icons';

/**
 * Formulario en MODO DEMO.
 *
 * No envia datos a ningun servidor ni correo: la confirmacion es local.
 * Al conectar un backend real (Resend, Formspree, una route handler...),
 * sustituir `handleSubmit` y anadir el aviso de proteccion de datos.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ nombre: '', clinica: '', motivo: '' });
  const confirmationRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const clinics = getClinics();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setValues({
      nombre: String(data.get('nombre') ?? ''),
      clinica: String(data.get('clinica') ?? ''),
      motivo: String(data.get('motivo') ?? ''),
    });
    setSent(true);
    // Lleva el foco a la confirmacion para quien navega con teclado o lector.
    requestAnimationFrame(() => confirmationRef.current?.focus());
  }

  if (sent) {
    const clinic = clinics.find((c) => c.slug === values.clinica);
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        className="rounded-2xl border border-petrol-300/60 bg-white p-8 text-center"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-petrol-100">
          <IconCheck className="h-7 w-7 text-petrol-700" />
        </span>
        <h3 className="mt-5 text-2xl">
          Gracias{values.nombre ? `, ${values.nombre.split(' ')[0]}` : ''}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-petrol-800/75">
          Hemos recibido tu solicitud{clinic ? ` para ${clinic.name}` : ''}. Te
          responderemos en horario de clínica para confirmar la cita.
        </p>

        <p className="mx-auto mt-6 max-w-md rounded-xl bg-amber-100 px-4 py-3 text-sm text-amber-700">
          <strong className="font-semibold">Esto es una demostración.</strong> No se ha
          enviado ningún dato ni correo. Si tu mascota necesita atención urgente, llama
          directamente a la clínica.
        </p>

        <Button
          variant="secondary"
          size="sm"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="rounded-2xl border border-bone-200 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-nombre`} label="Nombre y apellidos" required>
          <input
            id={`${id}-nombre`}
            name="nombre"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field id={`${id}-telefono`} label="Teléfono" required>
          <input
            id={`${id}-telefono`}
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </Field>

        <Field id={`${id}-email`} label="Correo electrónico" className="sm:col-span-2">
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field id={`${id}-mascota`} label="Nombre de tu mascota">
          <input id={`${id}-mascota`} name="mascota" type="text" className={inputClass} />
        </Field>

        <Field id={`${id}-clinica`} label="Clínica" required>
          <select
            id={`${id}-clinica`}
            name="clinica"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Elige una clínica
            </option>
            {clinics.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} · {c.neighbourhood}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${id}-motivo`}
          label="Motivo de la consulta"
          className="sm:col-span-2"
          hint="Cuéntanos brevemente qué le ocurre a tu mascota."
        >
          <textarea
            id={`${id}-motivo`}
            name="motivo"
            rows={4}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-petrol-800/60">
          Demostración: al enviar no se transmite ningún dato. Para urgencias, llama por
          teléfono.
        </p>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Solicitar cita
        </Button>
      </div>
    </form>
  );
}

const inputClass =
  'w-full rounded-xl border border-bone-300 bg-bone-50/60 px-4 py-3 text-base text-petrol-900 transition-colors duration-200 placeholder:text-petrol-800/40 hover:border-petrol-300 focus:border-petrol-500 focus:bg-white focus:outline-none';

function Field({
  id,
  label,
  children,
  required,
  className,
  hint,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  hint?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-petrol-900">
        {label}
        {required && (
          <span className="ml-1 text-amber-600" aria-hidden>
            *
          </span>
        )}
        {required && <span className="sr-only"> (obligatorio)</span>}
      </label>
      {hint && <p className="mt-1 text-xs text-petrol-800/60">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}
