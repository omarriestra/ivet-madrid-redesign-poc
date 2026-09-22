import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PostCard } from '@/components/blocks/PostCard';
import { CtaBand } from '@/components/blocks/CtaBand';
import { getPost, getPosts, getRelatedPosts } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  return (
    <>
      <article>
        <header className="border-b border-bone-200 bg-gradient-to-b from-sage-100 to-bone-50 py-14 sm:py-16">
          <Container size="narrow">
            <nav aria-label="Migas de pan" className="mb-6 text-sm text-charcoal-900/60">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/blog" className="hover:text-charcoal-950">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="line-clamp-1 text-charcoal-950">{post.title}</li>
              </ol>
            </nav>
            <h1 className="text-4xl leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-charcoal-900/65">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min de lectura</span>
              <span aria-hidden>·</span>
              <span>Equipo IVET Madrid</span>
            </p>
          </Container>
        </header>

        {post.image && (
          <Container size="narrow" className="-mt-2">
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-bone-200">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </Container>
        )}

        <Section size="narrow" className="pt-12">
          {/* HTML ya saneado en build-time por scripts/fetch-assets.mjs */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal-950 prose-p:text-charcoal-900/85 prose-li:text-charcoal-900/85 prose-strong:text-charcoal-950 prose-a:text-sage-700 prose-a:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <p className="mt-12 rounded-2xl bg-sage-100 px-6 py-5 text-sm leading-relaxed text-charcoal-900/80">
            Este artículo tiene carácter divulgativo y no sustituye una consulta
            veterinaria. Si tu mascota presenta síntomas, pide cita o llama a tu clínica.
          </p>
        </Section>
      </article>

      {related.length > 0 && (
        <Section className="border-t border-bone-200 bg-white">
          <SectionHeading eyebrow="Seguir leyendo" title="Otros artículos" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <PostCard post={item} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
