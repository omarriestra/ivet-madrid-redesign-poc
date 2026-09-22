import Image from 'next/image';
import type { TeamMember } from '@/content/types';

/** Iniciales para el placeholder de quien no tiene fotografia publicada. */
function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <figure className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-bone-200">
        {member.image ? (
          <Image
            src={member.image}
            alt={`Retrato de ${member.name}`}
            fill
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
          />
        ) : (
          /* PENDIENTE: sustituir por la fotografia real cuando el cliente la facilite. */
          <div className="flex h-full w-full items-center justify-center bg-charcoal-900">
            <span
              aria-hidden
              className="font-serif text-4xl font-semibold text-bone-50/90"
            >
              {initials(member.name)}
            </span>
            <span className="sr-only">Fotografía pendiente</span>
          </div>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-serif text-lg font-semibold text-charcoal-950">{member.name}</p>
        <p className="mt-1 text-sm leading-snug text-charcoal-900/70">{member.role}</p>
        {member.clinic && (
          <p className="mt-1.5 inline-flex rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-charcoal-900">
            {member.clinic}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
