import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | AstolixGen`,
      description: post.excerpt,
      url: `https://astolixgen.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <Link href="/blog" className="text-sm text-slate-500 transition-colors hover:text-accent">
              ← All articles
            </Link>
            <p className="mt-6 text-xs text-slate-500">
              {post.date} · {post.readTime}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">{post.excerpt}</p>
          </Reveal>
        </div>
      </article>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <Reveal>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-slate-300">
            {post.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="card-border rounded-2xl p-6 text-center sm:p-8">
            <h2 className="font-display text-xl font-bold text-white">
              Want this applied to your business?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Tell us what you&apos;re working on — we&apos;ll give you an honest take on what
              would help.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-6 py-3 text-sm font-semibold text-ink transition-all hover:brightness-110"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>

        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-white">Keep reading</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blog/${o.slug}`}
                  className="card-border group rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <p className="text-xs text-slate-500">{o.date}</p>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-white transition-colors group-hover:text-accent">
                    {o.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
