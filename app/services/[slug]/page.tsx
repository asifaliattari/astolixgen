import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import InstantDashboard from "@/components/InstantDashboard";
import { company, services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.short,
    openGraph: {
      title: `${service.name} | AstolixGen`,
      description: service.short,
      url: `https://astolixgen.com/services/${service.slug}`,
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <Link href="/services" className="text-sm text-slate-500 transition-colors hover:text-accent">
              ← All services
            </Link>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{service.short}</p>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-white">Overview</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-slate-400">
              {service.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">What we offer</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.offerings.map((o) => (
                <li key={o} className="card-border flex items-start gap-2.5 rounded-xl p-4 text-sm text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Use cases sidebar */}
          <Reveal delay={120}>
            <div className="card-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-white">Typical use cases</h3>
              <div className="mt-4 space-y-5">
                {service.useCases.map((u) => (
                  <div key={u.title}>
                    <p className="text-sm font-semibold text-accent">{u.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{u.detail}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-5 py-3 text-sm font-semibold text-ink transition-all hover:brightness-110"
              >
                Discuss this service
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive demo — data analytics only */}
      {service.slug === "data-analytics" && (
        <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <Reveal>
            <InstantDashboard />
          </Reveal>
        </section>
      )}

      {/* Other services */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">Explore other services</h2>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card-border group block rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
                >
                  <h3 className="font-display text-base font-semibold text-white transition-colors group-hover:text-accent">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{s.short}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
