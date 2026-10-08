import Link from "next/link";
import { company } from "@/lib/data";

/** Homepage hero: headline, subhead, CTAs and a CSS-only visual. */
export default function Hero() {
  return (
    <section className="bg-grid bg-glow relative overflow-hidden pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
            {company.tagline}
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI. Automation.
            <br />
            Software. <span className="text-gradient">IoT.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {company.heroSubhead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-6 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40 hover:brightness-110"
            >
              {company.primaryCta}
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/60 hover:text-white"
            >
              {company.heroSecondaryCta}
            </Link>
          </div>
        </div>

        {/* Visual: layered glow cards, CSS only */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="true">
          <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-accent/15 via-transparent to-viol/15 blur-2xl" />
          <div className="card-border relative animate-float rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Live system</p>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-emerald-400" /> Online
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { label: "AI Agent", detail: "Lead qualified — WhatsApp", pct: "92%" },
                { label: "Automation", detail: "n8n workflow — 14 tasks run", pct: "100%" },
                { label: "IoT Sensor", detail: "Soil moisture — field A", pct: "68%" },
              ].map((row) => (
                <div key={row.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-200">{row.label}</span>
                    <span className="font-display text-accent">{row.pct}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{row.detail}</p>
                  <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-viol"
                      style={{ width: row.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Floating chips */}
          <div className="absolute -left-6 top-10 animate-float rounded-xl border border-white/10 bg-surface/90 px-4 py-2.5 text-xs font-medium text-slate-300 shadow-xl" style={{ animationDelay: "1.2s" }}>
            RAG Assistant <span className="text-accent">ready</span>
          </div>
          <div className="absolute -right-4 bottom-12 animate-float rounded-xl border border-white/10 bg-surface/90 px-4 py-2.5 text-xs font-medium text-slate-300 shadow-xl" style={{ animationDelay: "2.4s" }}>
            Dashboard <span className="text-viol">live</span>
          </div>
        </div>
      </div>
    </section>
  );
}
