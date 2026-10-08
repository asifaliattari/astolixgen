import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import { company, services, projects, posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "AstolixGen — AI, Automation & Digital Solutions",
  description:
    "We build intelligent digital systems that connect AI, automation, software and the physical world. Explore AI solutions, automation & agents, software, data, IoT, creative studio and training.",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---- Capabilities ---- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title="What we build"
          description="Seven practice areas, one goal: intelligent systems that do real work for your business."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- IoT spotlight ---- */}
      <section className="border-y border-white/5 bg-surface/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              IoT Spotlight — R&D Concept
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From ideas to <span className="text-gradient">intelligent systems</span>
            </h2>
            <p className="mt-4 leading-relaxed text-slate-400">
              We don&apos;t just build websites and applications. We experiment with technologies
              that connect intelligent software with the physical world — like our AgriSense
              concept: sensor-based agriculture and environment monitoring with AI-assisted
              insights.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
              {[
                "Smart agriculture monitoring concepts",
                "Indoor air-quality monitoring",
                "Sensor dashboards with threshold alerts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects/agrisense-iot-concept"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-6 py-3 text-sm font-semibold text-ink transition-all hover:brightness-110"
              >
                See the AgriSense concept
              </Link>
              <Link
                href="/services/iot-solutions"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/60 hover:text-white"
              >
                IoT services
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="bg-grid card-border relative overflow-hidden rounded-2xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-viol/15" />
              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Field A — live concept feed
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    { k: "Soil moisture", v: "42%", d: "Optimal range" },
                    { k: "Temperature", v: "28.4°C", d: "Field sensor 03" },
                    { k: "Humidity", v: "61%", d: "Greenhouse zone" },
                    { k: "Air quality", v: "Good", d: "Indoor monitor 01" },
                  ].map((m) => (
                    <div key={m.k} className="rounded-xl border border-white/5 bg-ink/60 p-4">
                      <p className="text-xs text-slate-500">{m.k}</p>
                      <p className="mt-1 font-display text-2xl font-bold text-white">{m.v}</p>
                      <p className="mt-1 text-xs text-slate-500">{m.d}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-600">
                  Illustrative concept data — not live readings.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Selected projects ---- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects & experiments"
          description="A few things we're building and researching. Everything is labeled honestly — concepts, prototypes and R&D."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-accent hover:text-white">
            View all projects
            <svg className="ml-1.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </Reveal>
      </section>

      {/* ---- Process ---- */}
      <section className="border-y border-white/5 bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="How we work"
            title="From idea to running system"
            description="A straightforward process that keeps you in control at every step."
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* ---- Insights preview ---- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Insights"
          title="From the blog"
          description="Practical notes on AI, automation, data and IoT — written from real work."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-border group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                <p className="text-xs text-slate-500">
                  {post.date} · {post.readTime}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-accent">Read article</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="bg-grid relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center sm:px-12">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-viol/15" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Build smarter. Automate faster. <span className="text-gradient">Grow with AI.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Tell us what&apos;s slowing you down — we&apos;ll tell you honestly what
                automation or AI can do about it.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-8 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-accent/20 transition-all hover:brightness-110"
              >
                {company.primaryCta}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
