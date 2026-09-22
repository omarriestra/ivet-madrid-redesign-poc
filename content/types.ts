/** Contrato de contenido. Se conserva intacto al conectar un CMS. */

export type ClinicSlug = 'rios-rosas' | 'las-rozas' | 'el-burgo' | 'malasana';

export interface Clinic {
  slug: ClinicSlug;
  name: string;
  shortName: string;
  neighbourhood: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  phoneHref: string;
  emergencyPhone: string;
  emergencyPhoneHref: string;
  whatsapp: string;
  email: string;
  mapsUrl: string;
  mapEmbedQuery: string;
  blurb: string;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  image?: string | null;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  clinic?: string;
  image: string | null;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  readingMinutes: number;
  html: string;
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  shortDescription: string;
  categories: string[];
  image: string | null;
  inStock: boolean;
}
