import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
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
                {"aka" in member && member.aka && (
                  <p className="mt-1 text-xs text-slate-500">Also known as {member.aka}</p>
                )}
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

        {/* Spotlight: research desk, CoreEd, etc. */}
        {"spotlight" in member && member.spotlight && (
          <section className="mt-14 border-t border-white/5 pt-10">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {member.spotlight.kicker}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white">
                {member.spotlight.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-400">{member.spotlight.intro}</p>
            </Reveal>

            {member.spotlight.sections.map((sec, si) => (
              <Reveal key={si} delay={60}>
                <h3 className="mt-8 font-display text-lg font-bold text-white">{sec.heading}</h3>
                {sec.paragraphs?.map((p, pi) => (
                  <p key={pi} className="mt-3 leading-relaxed text-slate-400">{p}</p>
                ))}
                {sec.bullets && (
                  <ul className="mt-3 space-y-2.5">
                    {sec.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-0.5 shrink-0 text-accent">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}

            {member.spotlight.videos && member.spotlight.videos.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {member.spotlight.videos.map((v) => (
                  <Reveal key={v.youtubeId}>
                    <VideoEmbed youtubeId={v.youtubeId} title={v.title} />
                  </Reveal>
                ))}
              </div>
            )}

            {"note" in member.spotlight && member.spotlight.note && (
              <p className="mt-6 text-sm italic text-slate-500">{member.spotlight.note}</p>
            )}

            {member.spotlight.cta && (
              <Reveal>
                <a
                  href={member.spotlight.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {member.spotlight.cta.label} →
                </a>
              </Reveal>
            )}
          </section>
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
            {"whatsapp" in member && member.whatsapp && (
              <a
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88zm8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.41z" />
                </svg>
                WhatsApp{"whatsappDisplay" in member && member.whatsappDisplay ? ` ${member.whatsappDisplay}` : ""}
              </a>
            )}
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
