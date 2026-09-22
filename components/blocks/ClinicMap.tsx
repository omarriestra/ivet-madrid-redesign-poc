/**
 * Mapa incrustado sin clave de API.
 *
 * `loading="lazy"` para no penalizar el LCP: el mapa queda por debajo del pliegue.
 */
export function ClinicMap({ query, name }: { query: string; name: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=es`;

  return (
    <div className="overflow-hidden rounded-2xl border border-bone-200 bg-bone-200">
      <iframe
        src={src}
        title={`Mapa de ubicación de ${name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[320px] w-full border-0 sm:h-[380px]"
      />
    </div>
  );
}
