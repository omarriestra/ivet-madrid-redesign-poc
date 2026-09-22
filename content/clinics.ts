import type { Clinic } from './types';

/**
 * UNICA fuente del copy de urgencias.
 *
 * IMPORTANTE: la web actual anuncia "ATENCION TELEFONICA 24H" y los horarios de
 * clinica terminan a las 20:30. Es decir: el TELEFONO atiende 24 h, la clinica no
 * esta abierta 24 h. No cambiar esta cadena por "urgencias 24 h" a secas ni por
 * "abierto 24 h" sin confirmarlo antes con la clinica.
 */
export const EMERGENCY_LABEL = 'Atención telefónica de urgencias 24 h';
export const EMERGENCY_NOTE =
  'Llama antes de venir: te indicamos cómo actuar y preparamos la llegada.';

export const OPENING_HOURS = [
  { days: 'Lunes a viernes', hours: '10:00 – 20:30' },
  { days: 'Sábado', hours: '10:30 – 14:00' },
  { days: 'Domingo', hours: 'Cerrado' },
] as const;

export const clinics: Clinic[] = [
  {
    slug: 'rios-rosas',
    name: 'IVET Ríos Rosas',
    shortName: 'Ríos Rosas',
    neighbourhood: 'Chamberí',
    address: 'C/ Ríos Rosas, 12',
    postalCode: '28003',
    city: 'Madrid',
    phone: '640 958 024',
    phoneHref: '+34640958024',
    emergencyPhone: '640 958 024',
    emergencyPhoneHref: '+34640958024',
    whatsapp: '34640958024',
    email: 'ivetriosrosas@gmail.com',
    mapsUrl:
      'https://www.google.com/maps/place/C.+de+R%C3%ADos+Rosas,+12,+Chamber%C3%AD,+28003+Madrid,+Espa%C3%B1a',
    mapEmbedQuery: 'C/ Ríos Rosas 12, 28003 Madrid',
    blurb:
      'Tratamientos específicos para cada tipo de mascota, con una atención rápida y efectiva en pleno Chamberí.',
  },
  {
    slug: 'las-rozas',
    name: 'IVET Las Rozas',
    shortName: 'Las Rozas',
    neighbourhood: 'Las Rozas',
    address: 'Av. de la Coruña, 50',
    postalCode: '28231',
    city: 'Las Rozas de Madrid',
    phone: '916 37 50 00',
    phoneHref: '+34916375000',
    emergencyPhone: '656 848 025',
    emergencyPhoneHref: '+34656848025',
    whatsapp: '34656848025',
    email: 'ivetlasrozas@gmail.com',
    mapsUrl: 'https://www.google.com/maps/place/IVET+CLINICA+VETERINARIA+LAS+ROZAS',
    mapEmbedQuery: 'IVET Clínica Veterinaria Las Rozas, Av. de la Coruña 50',
    blurb:
      'Años de experiencia en un ambiente familiar, con un amplio rango de servicios veterinarios centrados en la calidad.',
  },
  {
    slug: 'el-burgo',
    name: 'IVET El Burgo',
    shortName: 'El Burgo',
    neighbourhood: 'El Burgo de Las Rozas',
    address: 'C/ Principado de Asturias, 4',
    postalCode: '28231',
    city: 'Las Rozas de Madrid',
    phone: '916 361 560',
    phoneHref: '+34916361560',
    emergencyPhone: '676 333 992',
    emergencyPhoneHref: '+34676333992',
    whatsapp: '34676333992',
    email: 'ivetelburgo@gmail.com',
    mapsUrl: 'https://www.google.com/maps/place/IVET+Cl%C3%ADnica+Veterinaria+El+Burgo',
    mapEmbedQuery: 'IVET Clínica Veterinaria El Burgo, C/ Principado de Asturias 4',
    blurb:
      'Tecnología avanzada y trato cercano, con un equipo comprometido con el bienestar de cada paciente.',
  },
  {
    slug: 'malasana',
    name: 'IVET Malasaña',
    shortName: 'Malasaña',
    neighbourhood: 'Malasaña',
    address: 'Calle Valverde, 48',
    postalCode: '28004',
    city: 'Madrid',
    phone: '915 325 689',
    phoneHref: '+34915325689',
    emergencyPhone: '640 806 439',
    emergencyPhoneHref: '+34640806439',
    whatsapp: '34640806439',
    email: 'ivetmalasana@gmail.com',
    mapsUrl: 'https://www.google.com/maps/search/Calle+Valverde+48+28004+Madrid',
    mapEmbedQuery: 'Calle Valverde 48, 28004 Madrid',
    blurb:
      'Cuidado dedicado a cada paciente en el centro de Madrid, con un trato cercano y profesional.',
  },
];
