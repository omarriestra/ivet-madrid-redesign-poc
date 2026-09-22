import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/content/types';
import { formatDate } from '@/lib/utils';

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-bone-200 bg-white transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-sage-400 hover:shadow-xl hover:shadow-charcoal-950/8">
      {post.image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-bone-200">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs text-charcoal-900/60">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min de lectura</span>
        </p>
        <h3 className="mt-3 text-xl leading-snug">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-charcoal-900/70">
          {post.excerpt}
        </p>
        <span className="mt-5 text-sm font-semibold text-sage-700 transition-colors group-hover:text-charcoal-900">
          Leer artículo
        </span>
      </div>
    </article>
  );
}
