import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "AstolixGen insights — practical notes on AI, automation, data, IoT and what actually works for small businesses.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Blog</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Insights, <span className="text-gradient">not hype.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              Practical notes on AI, automation, data and IoT — written from real work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="All articles"
          title="Latest posts"
          description="Short, honest reads on technology that actually helps businesses."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-border group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-8"
              >
                <p className="text-xs text-slate-500">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-accent sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 leading-relaxed text-slate-400">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                  Read article
                  <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
