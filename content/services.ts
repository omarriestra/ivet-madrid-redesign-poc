import type { Service } from './types';

/**
 * Descripciones tomadas literalmente de ivetmadrid.com/services.
 * No anadir servicios, acreditaciones ni titulaciones que no aparezcan alli.
 */
export const services: Service[] = [
  {
    slug: 'urgencias',
    name: 'Urgencias',
    description:
      'Atención telefónica 24 h para orientarte cuando tu mascota no puede esperar. Llámanos y te indicamos cómo actuar y a qué centro acudir.',
  },
  {
    slug: 'medicina-preventiva',
    name: 'Medicina preventiva',
    description:
      'Planes de vacunación y desparasitación personalizada para perros, gatos y conejos, teniendo en cuenta su raza, edad y posibles movimientos geográficos por España y el extranjero.',
  },
  {
    slug: 'cirugia-general',
    name: 'Cirugía general',
    description:
      'Servicio integral de cirugía. Disponemos de quirófano perfectamente equipado y un equipo humano en constante formación.',
  },
  {
    slug: 'cirugia-minimamente-invasiva',
    name: 'Cirugía mínimamente invasiva',
    description:
      'La cirugía de mínima invasión es menos dolorosa y ofrece un tiempo de curación más rápido porque causa menos daño a los tejidos circundantes.',
  },
  {
    slug: 'traumatologia',
    name: 'Traumatología',
    description:
      'Servicio de traumatología y ortopedia avalado por el Máster de la Universidad Complutense durante el curso 2017/2018.',
  },
  {
    slug: 'dermatologia',
    name: 'Dermatología',
    description:
      'Alteraciones dermatológicas. Debido a nuestro clima tenemos gran cantidad de perros y gatos alérgicos, lo que nos ha hecho estar en la vanguardia en tratamientos dermatológicos.',
  },
  {
    slug: 'diagnostico-por-imagen',
    name: 'Ecografía, ecocardiografía y radiología',
    description:
      'Ofrecemos tecnología de vanguardia en nuestros servicios de ecografía veterinaria, realizados por personal cualificado que garantiza diagnósticos precisos.',
  },
  {
    slug: 'hospitalizacion',
    name: 'Hospitalización y cuidados intensivos',
    description:
      'Nuestro servicio de hospitalización está diseñado para ofrecer un entorno seguro y confortable para mascotas que requieran atención médica continua y vigilancia las 24 horas.',
  },
  {
    slug: 'oftalmologia',
    name: 'Oftalmología',
    description:
      'Servicios especializados para el cuidado de los ojos de tu mascota, con atención personalizada y cuidados minuciosos para mantener su salud visual.',
  },
  {
    slug: 'neurologia',
    name: 'Neurología',
    description:
      'Apoyo especializado a los animales que presentan problemas neurológicos como epilepsia, hernias discales o meningitis.',
  },
  {
    slug: 'rehabilitacion',
    name: 'Rehabilitación y fisioterapia',
    description:
      'Entendemos la rehabilitación y la fisioterapia como la suma de tratamientos dirigidos a mejorar las capacidades físicas y la calidad de vida de las mascotas.',
  },
  {
    slug: 'laser-terapia',
    name: 'Láser terapia',
    description:
      'El láser terapéutico tiene la capacidad de disminuir el dolor, reducir la inflamación e incrementar la microcirculación.',
  },
  {
    slug: 'formacion',
    name: 'Formación',
    description:
      'Equipamos a cada miembro de nuestro personal veterinario con las habilidades y conocimientos necesarios para brindar el mejor cuidado a nuestros pacientes y clientes.',
  },
];
