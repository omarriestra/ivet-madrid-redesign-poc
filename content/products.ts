import type { Product } from './types';

/**
 * Catalogo de muestra basado en los productos que la clinica ya maneja.
 *
 * DEMO: esta seccion es unicamente visual. No hay carrito, pagos ni stock real.
 * Los precios NO se muestran a proposito: cambian y no deben fijarse en una POC.
 */
export const products: Product[] = [
  { name: "Hill's Prescription Diet i/d", category: 'Dieta digestiva', brand: "Hill's" },
  { name: "Hill's Prescription Diet c/d", category: 'Dieta urinaria', brand: "Hill's" },
  { name: "Hill's Prescription Diet z/d", category: 'Dieta hipoalergénica', brand: "Hill's" },
  { name: "Hill's Metabolic", category: 'Control de peso', brand: "Hill's" },
  { name: "Hill's Vet Essentials Dental", category: 'Salud dental', brand: "Hill's" },
  { name: 'Gosbi Exclusive Grain Free', category: 'Alimentación sin cereales', brand: 'Gosbi' },
  { name: 'Gosbi Life Salmón', category: 'Alimentación diaria', brand: 'Gosbi' },
  { name: 'Gosbi Life Cordero', category: 'Alimentación diaria', brand: 'Gosbi' },
  { name: 'Correa extensible Flexi Comfort', category: 'Paseo', brand: 'Flexi' },
  { name: 'Arena de sílice Baspet', category: 'Higiene felina', brand: 'Baspet' },
  { name: 'Heno Plus Kiki', category: 'Pequeños mamíferos', brand: 'Kiki' },
  { name: 'Lecho higiénico Arquivet', category: 'Higiene', brand: 'Arquivet' },
];
