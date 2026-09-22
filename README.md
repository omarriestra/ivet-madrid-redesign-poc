# IVET Madrid — Prueba de concepto de rediseño

Propuesta de rediseño completo para [ivetmadrid.com](https://ivetmadrid.com), construida como
web estática moderna en lugar de WordPress.

**Demo pública:** https://ivet-madrid-redesign-poc.vercel.app

> **Esto es una prueba de concepto comercial.** No sustituye a la web en producción, no
> envía formularios ni correos, no procesa pagos y no está indexada en buscadores
> (`robots.txt` la bloquea para no competir con el sitio real).

---

## Por qué dejar WordPress

Datos medidos sobre la home actual el 22 de septiembre de 2026:

| | Web actual (WordPress) | Esta propuesta (Next.js) |
|---|---|---|
| Portada transferida | 262 KB sin comprimir | **28 KB** (gzip) |
| Hojas de estilo | 49 peticiones | 1 |
| Scripts | 65 peticiones | 8 (los del framework) |
| Plugins que mantener | 10 | 0 |
| Constructores de páginas | 2 a la vez (Elementor + WPBakery) | ninguno |
| Superficie de ataque | PHP, base de datos, plugins, `wp-admin` | HTML estático en CDN |
| Mantenimiento | actualizaciones continuas de núcleo y plugins | despliegue automático desde Git |

La diferencia real no está tanto en el peso del HTML como en **lo que el navegador tiene que
pedir y ejecutar**: pasar de 114 peticiones de CSS y JavaScript a 9.

La web actual carga además Bridge, Revslider y WooCommerce simultáneamente. Cada uno es una
dependencia que actualizar, que puede romperse y que hay que vigilar.

---

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000. No hacen falta claves ni variables de entorno.

```bash
npm run build   # build de producción
npm start       # servir el build
```

### Actualizar contenido e imágenes desde la web actual

```bash
npm run fetch:assets
```

Descarga logotipo, fotografías del equipo y artículos del blog desde ivetmadrid.com,
los convierte a WebP en `public/images/` y regenera `content/posts.generated.ts`.
Se ejecuta **en local**, nunca en el despliegue: el resultado se guarda en el repositorio,
de modo que la web no depende de que ivetmadrid.com siga disponible.

El script resuelve cada imagen consultando el HTML publicado en lugar de construir rutas a
mano (la biblioteca de medios tiene variantes duplicadas y rutas que fallan), y **termina con
error si algún recurso no se encuentra**, para que un fallo se detecte al momento.

---

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Portada: propuesta de valor, urgencias, servicios, clínicas, equipo y blog |
| `/urgencias` | Teléfonos de urgencias, señales de alarma y horarios |
| `/servicios` | Los 13 servicios, con anclas por servicio (`/servicios#dermatologia`) |
| `/clinicas` | Índice de las cuatro clínicas |
| `/clinicas/[slug]` | Ficha de clínica con mapa, horario y profesionales |
| `/equipo` | Las 16 personas del equipo |
| `/sobre-nosotros` | Historia, trayectoria y proyecto One Health Nyangatom |
| `/tienda` | Escaparate visual de alimentación y productos (sin compra) |
| `/blog` | Índice de artículos |
| `/blog/[slug]` | Artículo |
| `/contacto` | Formulario de cita en modo demo y datos de las cuatro clínicas |
| `404` | Página de error con accesos útiles y teléfonos de urgencias |

Las 25 páginas se generan de forma estática en el build.

---

## Arquitectura

```
app/          Rutas (App Router). Todo son Server Components salvo Header y ContactForm.
components/   layout/ (Header, Footer) · ui/ (Button, Icons, Section…) · blocks/ (tarjetas, formulario…)
content/      Contenido tipado en TypeScript + posts.generated.ts (generado)
lib/          content.ts (capa de acceso) · utils.ts
scripts/      fetch-assets.mjs
```

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
`next/font` (Fraunces + Inter) · `sharp` y `sanitize-html` solo en el script.

### Preparado para conectar un CMS

Todas las páginas leen el contenido a través de `lib/content.ts`, nunca directamente de
`content/*.ts`. Esa indirección es la costura de integración: para conectar Sanity, Strapi o
Contentful basta con reescribir esas funciones como `async` —los Server Components ya usan
`await`— manteniendo los tipos de `content/types.ts` como contrato. **Ningún componente
cambia.**

Lo mismo aplica al comercio electrónico: `/tienda` es hoy un escaparate visual que lee de
`content/products.ts`; conectarlo a Shopify, Stripe o una API de catálogo es sustituir esa
fuente de datos.

### Rendimiento y accesibilidad

- Imágenes locales optimizadas a WebP y servidas por `next/image` (~1 MB en total).
- HTML semántico, un solo `<h1>` por página, jerarquía de encabezados sin saltos.
- Todas las imágenes con `alt`; los enlaces tienen nombre accesible.
- Foco visible en todo el sitio, enlace «Saltar al contenido» y menú móvil que cierra con
  `Escape` y bloquea el scroll de fondo.
- Animaciones de entrada sin JavaScript (`animation-timeline: view()`), anuladas por completo
  bajo `prefers-reduced-motion`.
- Mapas en `iframe` con `loading="lazy"` para no penalizar el LCP.

---

## Sobre el contenido

Textos, fotografías y datos de contacto proceden de la web pública de IVET Madrid y se
reutilizan **únicamente dentro de esta propuesta**, dirigida a su propietario.

No se ha inventado ningún servicio, profesional, acreditación, horario, precio ni testimonio.

**Matiz importante sobre las urgencias:** la web actual anuncia «Atención telefónica 24 h» y
los horarios de clínica terminan a las 20:30. Esta demo dice por tanto *«atención telefónica
de urgencias 24 h»* y nunca que la clínica esté abierta las 24 horas. El texto está
centralizado en la constante `EMERGENCY_LABEL` de `content/clinics.ts`: si la clínica confirma
que sí hay urgencias presenciales, se cambia en un único sitio.

---

## Pendiente antes de una migración real

**Información que debe aportar la clínica**

- [ ] Fotografía de Carlos Iglesias (ahora se muestra un placeholder con sus iniciales).
- [ ] Confirmar si las urgencias son solo telefónicas o también presenciales 24 h.
- [ ] Revisar los teléfonos: en Ríos Rosas, el de contacto y el de urgencias coinciden.
- [ ] Fotografías propias de las clínicas y de las instalaciones (no hay en la web actual).
- [ ] Textos legales reales: aviso legal, privacidad y cookies (enlazados pero sin contenido).
- [ ] Decidir el futuro de los 31 productos de WooCommerce: hoy existen en la base de datos
      pero `/tienda` está vacía y no aparece en el menú, así que no hay tienda visible.

**Trabajo técnico**

- [ ] Dominio propio y certificado (Vercel lo gestiona automáticamente).
- [ ] Formulario de contacto real, con aviso de protección de datos y protección antispam.
- [ ] Banner de cookies solo si se añade analítica (ahora no hay ningún rastreador).
- [ ] Analítica respetuosa con la privacidad (Vercel Analytics o Plausible).
- [ ] CMS para el blog si la clínica quiere publicar sin intervención técnica.
- [ ] Redirecciones 301 desde las URLs actuales para conservar el posicionamiento.
- [ ] Datos estructurados `VeterinaryCare` por clínica, para búsqueda local.
- [ ] Quitar el `noindex` de `app/robots.ts` al pasar a producción.
- [ ] Revisar la cobertura de servicios por clínica (ahora se listan como comunes).

---

## Licencia y propiedad

El código es una propuesta técnica. Los textos, imágenes, marca y datos de IVET Madrid
pertenecen a sus titulares y se emplean exclusivamente con fines de presentación comercial.
