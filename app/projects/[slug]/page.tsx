import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { company, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | AstolixGen`,
      description: project.summary,
      url: `https://astolixgen.com/projects/${project.slug}`,
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <Link href="/projects" className="text-sm text-slate-500 transition-colors hover:text-accent">
              ← All projects
            </Link>
            <div className="mt-4">
              <span className="rounded-full border border-accent/30 bg-ink/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {project.status}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{project.summary}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4 leading-relaxed text-slate-300">
              {project.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-white">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-viol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-5 py-3 text-sm font-semibold text-ink transition-all hover:brightness-110"
              >
                {company.primaryCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
