import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { founder, values, company } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About AstolixGen — an AI, automation and digital solutions company founded by Asif Ali in Karachi, Pakistan. Practical intelligent systems, honest scoping, clean code.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">About</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Practical intelligence, <span className="text-gradient">honestly delivered.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              AstolixGen is a technology company focused on AI, automation, software, data and IoT.
              We build intelligent digital systems that connect AI, automation, software and the
              physical world — systems that do real work, not demos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">Our story</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-slate-400">
              <p>
                AstolixGen was founded on a simple observation: most businesses don&apos;t need
                more software — they need their existing work to flow. Repetitive tasks eat hours,
                data sits unused in spreadsheets, and the physical world (fields, machines,
                buildings) remains invisible to the systems that could manage it.
              </p>
              <p>
                We started by doing the unglamorous work well: automation that removes busywork,
                dashboards that replace manual reporting, websites that load fast and convert.
                On top of that foundation we layer modern AI — assistants grounded in your own
                documents, agents that handle routine conversations, and IoT concepts that bring
                the physical world into view.
              </p>
              <p>
                We&apos;re a small, senior team. You talk directly to the people building your
                system, and everything we ship is documented, maintainable and yours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-2xl font-bold text-white">What we believe</h2>
            <div className="mt-4 space-y-4">
              {values.map((v) => (
                <div key={v.title} className="card-border rounded-2xl p-5">
                  <h3 className="font-display text-base font-semibold text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{v.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="border-y border-white/5 bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Founder"
            title="Asif Ali"
            description="Founder & CEO of AstolixGen · Co-founder of BlackInkMotion · Karachi, Pakistan"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Reveal>
              <div className="card-border rounded-2xl p-6 sm:p-8">
                <div className="space-y-4 leading-relaxed text-slate-300">
                  {founder.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                      Certifications
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                      {founder.certifications.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                      Achievements
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                      {founder.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-viol" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={company.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-accent/60 hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={company.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-accent/60 hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={company.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-accent/60 hover:text-white"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Co-Founders */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Leadership"
          title="Co-Founders"
          description="The team building AstolixGen together."
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
          {founder.cofounders.map((name, i) => (
            <Reveal key={name} delay={i * 90}>
              <div className="card-border rounded-2xl p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-accent to-viol font-display text-lg font-bold text-ink">
                  {name.charAt(0)}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{name}</h3>
                <p className="mt-1 text-sm text-slate-400">Co-Founder</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Want to work together?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Tell us what you want to automate or build — we&apos;ll respond honestly about what
            we can do.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-8 py-3.5 text-sm font-semibold text-ink transition-all hover:brightness-110"
          >
            {company.primaryCta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
