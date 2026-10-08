import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { team } from "@/lib/data";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const member = team.find((m) => m.slug === params.slug);
  if (!member) return { title: "Team member not found" };
  return {
    title: member.name,
    description: `${member.name} — ${member.role} at AstolixGen.`,
    openGraph: {
      title: `${member.name} | AstolixGen`,
      description: `${member.name} — ${member.role}.`,
      url: `https://astolixgen.com/team/${member.slug}`,
      type: "profile",
    },
  };
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = team.find((m) => m.slug === params.slug);
  if (!member) notFound();

  const others = team.filter((m) => m.slug !== member.slug);

  return (
    <>
      {/* Profile header */}
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <Link href="/about" className="text-sm text-slate-500 transition-colors hover:text-accent">
              ← Our team
            </Link>
            <div className="mt-8 flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-viol/30 font-display text-2xl font-bold text-white">
                {member.initials}
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {member.name}
                </h1>
                <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bio */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="space-y-5 leading-relaxed text-slate-300">
            {member.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        {member.highlights.length > 0 && (
          <Reveal delay={100}>
            <h2 className="mt-10 font-display text-xl font-bold text-white">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {member.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-slate-300">
                  <span className="text-accent">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-viol px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              Connect on LinkedIn
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              Work with us
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Other members */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="font-display text-xl font-bold text-white">Meet the rest of the team</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((m, i) => (
              <Reveal key={m.slug} delay={i * 80}>
                <Link
                  href={`/team/${m.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-accent/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/30 to-viol/30 font-display text-sm font-bold text-white">
                    {m.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-accent">{m.name}</p>
                    <p className="text-xs text-slate-500">{m.role}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
