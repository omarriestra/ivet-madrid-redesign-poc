import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/blocks/PageHero';
import { PostCard } from '@/components/blocks/PostCard';
import { CtaBand } from '@/components/blocks/CtaBand';
import { getPosts } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { IconArrow } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Consejos veterinarios de IVET Madrid: alimentación, prevención, cuidado dental, mascotas mayores y bienestar animal.',
};

export default function BlogPage() {
  const [featured, ...rest] = getPosts();

  return (
    <>
      <PageHero
        title="Consejos del equipo"
        accent="para el día a día."
        description="Prevención, alimentación y bienestar animal, explicado por quienes atienden a tu mascota."
      />

      {featured && (
        <Section className="pb-0">
          <article className="group relative grid gap-8 overflow-hidden rounded-3xl border border-bone-200 bg-white lg:grid-cols-2 lg:items-center">
            {featured.image && (
              <div className="relative aspect-[16/10] overflow-hidden bg-bone-200 lg:aspect-auto lg:h-full lg:min-h-[380px]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="p-6 sm:p-10">
              <p className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                Último artículo
              </p>
              <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 flex items-center gap-2 text-sm text-charcoal-900/60">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span aria-hidden>·</span>
                <span>{featured.readingMinutes} min de lectura</span>
              </p>
              <p className="mt-5 text-lg leading-relaxed text-charcoal-900/80">
                {featured.excerpt}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold text-sage-700">
                Leer artículo
                <IconArrow className="h-5 w-5 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        </Section>
      )}

      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug} className="reveal">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="¿Tienes dudas sobre tu mascota?"
        text="Nuestro equipo resuelve tus preguntas en consulta. Pide cita en la clínica que prefieras."
      />
    </>
  );
}
