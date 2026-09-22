/**
 * Descarga los recursos públicos de ivetmadrid.com y genera content/posts.generated.ts
 *
 * Se ejecuta UNA VEZ en local (`npm run fetch:assets`), nunca en el build de Vercel.
 * El resultado se commitea, de modo que el despliegue no depende de que
 * ivetmadrid.com siga sirviendo los ficheros.
 *
 * Regla importante: las URLs de /wp-content/uploads/ NO se construyen a mano.
 * La biblioteca de medios tiene variantes duplicadas (Cesar-Bezos.png vs -1.png,
 * carlota.jpg vs carlota2.jpg) y rutas que dan 404 segun como se compongan, asi
 * que cada recurso se resuelve consultando la propia web y se verifica antes de
 * descargarlo. Si algo no resuelve, el script sale con codigo != 0.
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import sanitizeHtml from 'sanitize-html';

const SITE = 'https://ivetmadrid.com';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
const ROOT = path.resolve(import.meta.dirname, '..');
const IMG_DIR = path.join(ROOT, 'public', 'images');

const failures = [];
const report = [];

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

async function fetchJson(url) {
  return JSON.parse(await fetchText(url));
}

/** Descarga una imagen y la convierte a WebP. Devuelve la ruta publica o null. */
async function saveImage(url, category, name, { width = 1200 } = {}) {
  const outRel = `/images/${category}/${name}.webp`;
  const outAbs = path.join(IMG_DIR, category, `${name}.webp`);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) throw new Error(`demasiado pequeno (${buf.length}B)`);

    await mkdir(path.dirname(outAbs), { recursive: true });
    const img = sharp(buf);
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outAbs);

    report.push(`  OK   ${outRel}  (${meta.width}x${meta.height} -> webp)`);
    return outRel;
  } catch (err) {
    failures.push(`${category}/${name}: ${err.message}  <- ${url}`);
    return null;
  }
}

/**
 * Resuelve la URL real de un recurso buscando su nombre de fichero en el HTML
 * publicado. Asi usamos exactamente las imagenes que la web esta sirviendo hoy.
 */
function resolveFromHtml(html, hints) {
  const all = [
    ...html.matchAll(
      /https:\/\/ivetmadrid\.com\/wp-content\/uploads\/[^"'\s)\\]+?\.(?:png|jpe?g|webp)/gi,
    ),
  ].map((m) => m[0]);

  for (const hint of hints) {
    const rx = new RegExp(hint, 'i');
    // Preferimos la variante sin sufijo de miniatura (-300x300) y mas "original".
    const matches = all
      .filter((u) => rx.test(decodeURIComponent(u)))
      .filter((u) => !/-\d{2,4}x\d{2,4}\.[a-z]+$/i.test(u));
    if (matches.length) {
      // La mas corta suele ser el original sin sufijos numericos anadidos.
      return matches.sort((a, b) => a.length - b.length)[0];
    }
  }
  return null;
}

async function main() {
  console.log('Descargando recursos publicos de ivetmadrid.com\n');

  // ---------------------------------------------------------------- paginas
  console.log('· Leyendo paginas de origen...');
  const [homeHtml, nosotrosHtml, serviciosHtml] = await Promise.all([
    fetchText(`${SITE}/`),
    fetchText(`${SITE}/nosotros`),
    fetchText(`${SITE}/services`),
  ]);
  const allHtml = homeHtml + nosotrosHtml + serviciosHtml;

  // ------------------------------------------------------------------ marca
  console.log('· Logotipo...');
  const logoUrl = resolveFromHtml(allHtml, ['IVET-Logo-letras-blancas', 'IVET-Logo']);
  if (logoUrl) await saveImage(logoUrl, 'brand', 'ivet-logo', { width: 600 });
  else failures.push('brand/ivet-logo: no se encontro el logotipo en el HTML');

  // --------------------------------------------------------------- servicios
  console.log('· Imagenes de servicios...');
  const serviceImages = {
    cirugia: ['2025/03/Cirugia', 'Cirugia\\.png'],
    ecografia: ['2025/03/ECO', 'ECO\\.png'],
    hospitalizacion: ['HospitalizaCION'],
    'medicina-preventiva': ['Medicina-preventiva'],
    dermatologia: ['Derma-1', 'Derma'],
    rehabilitacion: ['Rehabilitacion'],
    formacion: ['Formacion'],
  };
  for (const [name, hints] of Object.entries(serviceImages)) {
    const url = resolveFromHtml(allHtml, hints);
    if (url) await saveImage(url, 'services', name, { width: 900 });
    else failures.push(`services/${name}: no resuelto`);
  }

  // ------------------------------------------------------------------ equipo
  console.log('· Fotografias del equipo...');
  // Carlos Iglesias (director) no tiene foto publica: se usa un placeholder
  // tipografico en la UI. Ver components/blocks/TeamMemberCard.tsx
  const teamImages = {
    'marta-malagon': ['Marta-Malagon'],
    'teresa-esteban': ['Teresa'],
    'nuria-martin': ['Nuria-Martin'],
    'lucia-martos': ['Lucia-Martos'],
    'nuria-carrillo': ['Nuria-Carrillo'],
    'julia-esteban': ['Julia-Esteban'],
    chus: ['Chus-rehabilitacion'],
    'laura-sanchez': ['Laura1', 'Laura\\.png'],
    'jose-antonio-segurado': ['Jose-Antonio-Segurado'],
    'cesar-bezos': ['Cesar-Bezos'],
    'pablo-siguenza': ['Pablo-Siguenza'],
    'carlota-vegas': ['carlota2', 'carlota'],
    'paula-hernandez': ['paula2', 'paula'],
    'maialen-de-la-fuente': ['mailalen2', 'mailen'],
    patricia: ['patricia2', 'patricia'],
  };
  for (const [name, hints] of Object.entries(teamImages)) {
    const url = resolveFromHtml(nosotrosHtml, hints);
    if (url) await saveImage(url, 'team', name, { width: 700 });
    else failures.push(`team/${name}: no resuelto`);
  }

  // -------------------------------------------------------------------- blog
  console.log('· Articulos del blog...');
  const posts = await fetchJson(
    `${SITE}/wp-json/wp/v2/posts?per_page=50&_embed=wp:featuredmedia`,
  );
  const generated = [];

  for (const p of posts) {
    const slug = p.slug;
    let image = null;
    const remote = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    if (remote) image = await saveImage(remote, 'blog', slug, { width: 1400 });
    else failures.push(`blog/${slug}: sin imagen destacada`);

    // El HTML se sanea aqui, en build-time, para no hacerlo nunca en runtime.
    const html = sanitizeHtml(p.content.rendered, {
      allowedTags: [
        'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'br', 'a',
      ],
      allowedAttributes: { a: ['href', 'title'] },
      transformTags: {
        // Los titulos del cuerpo bajan un nivel: el <h1> lo pone la pagina.
        h1: 'h2',
        a: (tagName, attribs) => ({
          tagName,
          attribs: { ...attribs, rel: 'noopener noreferrer' },
        }),
      },
    })
      .replace(/<p>\s*(&nbsp;)?\s*<\/p>/g, '')
      .trim();

    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = sanitizeHtml(p.excerpt.rendered, { allowedTags: [] })
      .replace(/\s+/g, ' ')
      .replace(/\[…\]|\[\.\.\.\]/g, '')
      .trim();

    generated.push({
      slug,
      title: sanitizeHtml(p.title.rendered, { allowedTags: [] }).trim(),
      date: p.date.slice(0, 10),
      excerpt,
      image,
      readingMinutes: Math.max(2, Math.round(text.split(' ').length / 200)),
      html,
    });
  }

  generated.sort((a, b) => b.date.localeCompare(a.date));

  const file = `// Generado por scripts/fetch-assets.mjs. No editar a mano.
// Contenido original de ivetmadrid.com, saneado en build-time.
import type { Post } from './types';

export const posts: Post[] = ${JSON.stringify(generated, null, 2)};
`;
  await writeFile(path.join(ROOT, 'content', 'posts.generated.ts'), file, 'utf8');
  report.push(`  OK   content/posts.generated.ts (${generated.length} articulos)`);

  // ----------------------------------------------------------------- informe
  console.log('\n--- Recursos descargados ---');
  report.forEach((r) => console.log(r));

  if (failures.length) {
    console.error(`\n--- FALLOS (${failures.length}) ---`);
    failures.forEach((f) => console.error(`  FALLO  ${f}`));
    console.error('\nEl script termina con error: revisa los recursos anteriores.');
    process.exit(1);
  }

  console.log(`\nTodo correcto: ${report.length} recursos.`);
}

main().catch((err) => {
  console.error('\nError irrecuperable:', err);
  process.exit(1);
});
