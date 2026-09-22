import type { TeamMember } from './types';

/**
 * Personas y cargos tal y como figuran en ivetmadrid.com/nosotros.
 *
 * PENDIENTE: Carlos Iglesias no tiene fotografia publica en la web actual.
 * Se muestra un placeholder tipografico (ver TeamMemberCard). Sustituir
 * `image` por '/images/team/carlos-iglesias.webp' cuando el cliente la facilite.
 */
export const team: TeamMember[] = [
  {
    slug: 'carlos-iglesias',
    name: 'Carlos Iglesias',
    role: 'Director IVET Madrid · Medicina interna y cirugía',
    image: null, // PENDIENTE: fotografia facilitada por el cliente
  },
  {
    slug: 'paula-hernandez',
    name: 'Paula Hernández Navia',
    role: 'Directora clínica',
    image: '/images/team/paula-hernandez.webp',
  },
  {
    slug: 'marta-malagon',
    name: 'Marta Malagón',
    role: 'Dermatología',
    clinic: 'Las Rozas',
    image: '/images/team/marta-malagon.webp',
  },
  {
    slug: 'teresa-esteban',
    name: 'Teresa Esteban Gómez',
    role: 'Auxiliar de veterinaria y administrativa',
    clinic: 'Las Rozas',
    image: '/images/team/teresa-esteban.webp',
  },
  {
    slug: 'nuria-martin',
    name: 'Nuria Martín',
    role: 'Dermatología y diagnóstico por imagen',
    clinic: 'Ríos Rosas',
    image: '/images/team/nuria-martin.webp',
  },
  {
    slug: 'lucia-martos',
    name: 'Lucía Martos',
    role: 'Cirugía de tejidos blandos',
    clinic: 'Ríos Rosas',
    image: '/images/team/lucia-martos.webp',
  },
  {
    slug: 'nuria-carrillo',
    name: 'Nuria Carrillo',
    role: 'Auxiliar de veterinaria',
    clinic: 'Ríos Rosas',
    image: '/images/team/nuria-carrillo.webp',
  },
  {
    slug: 'julia-esteban',
    name: 'Julia Esteban',
    role: 'Cirugía y medicina de urgencias',
    clinic: 'El Burgo',
    image: '/images/team/julia-esteban.webp',
  },
  {
    slug: 'patricia',
    name: 'Patricia',
    role: 'Veterinaria de medicina interna',
    image: '/images/team/patricia.webp',
  },
  {
    slug: 'laura-sanchez',
    name: 'Laura Sánchez',
    role: 'Oncología',
    image: '/images/team/laura-sanchez.webp',
  },
  {
    slug: 'jose-antonio-segurado',
    name: 'José Antonio Segurado',
    role: 'Traumatología',
    image: '/images/team/jose-antonio-segurado.webp',
  },
  {
    slug: 'cesar-bezos',
    name: 'César Bezos',
    role: 'Cardiología · Eccoa',
    image: '/images/team/cesar-bezos.webp',
  },
  {
    slug: 'pablo-siguenza',
    name: 'Pablo Sigüenza',
    role: 'Anatomía patológica y oncología · Onkos',
    image: '/images/team/pablo-siguenza.webp',
  },
  {
    slug: 'chus',
    name: 'Chus',
    role: 'Rehabilitación',
    image: '/images/team/chus.webp',
  },
  {
    slug: 'carlota-vegas',
    name: 'Carlota Vegas García',
    role: 'Auxiliar clínico',
    image: '/images/team/carlota-vegas.webp',
  },
  {
    slug: 'maialen-de-la-fuente',
    name: 'Maialen de la Fuente Bartolomé',
    role: 'Auxiliar clínica',
    image: '/images/team/maialen-de-la-fuente.webp',
  },
];
