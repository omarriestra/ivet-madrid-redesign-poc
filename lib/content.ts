/**
 * Capa de acceso al contenido.
 *
 * Las paginas importan SIEMPRE desde aqui, nunca desde content/*.ts directamente.
 * Esta indireccion es la costura para conectar un CMS mas adelante: basta con
 * reescribir estas funciones como `async` (los Server Components ya hacen await)
 * y conservar los tipos de content/types.ts como contrato. Ningun componente cambia.
 */
import { clinics } from '@/content/clinics';
import { services } from '@/content/services';
import { team } from '@/content/team';
import { products } from '@/content/products';
import { posts } from '@/content/posts.generated';
import type { Clinic, Post, Product, Service, TeamMember } from '@/content/types';

export function getClinics(): Clinic[] {
  return clinics;
}

export function getClinic(slug: string): Clinic | undefined {
  return clinics.find((c) => c.slug === slug);
}

export function getServices(): Service[] {
  return services;
}

export function getTeam(): TeamMember[] {
  return team;
}

export function getProducts(): Product[] {
  return products;
}

export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  return posts.filter((p) => p.slug !== slug).slice(0, limit);
}

export { EMERGENCY_LABEL, EMERGENCY_NOTE, OPENING_HOURS } from '@/content/clinics';
export { site, history, solidarityProject } from '@/content/site';
