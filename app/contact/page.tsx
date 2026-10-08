import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AstolixGen — tell us what you want to automate or build. Phone, email and socials for Asif Ali in Karachi, Pakistan.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Contact</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {company.primaryCta}<span className="text-gradient">.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              Describe your project, timeline and goals. We respond to every serious inquiry —
              honestly, and usually within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Direct contact details */}
          <Reveal className="lg:col-span-2">
            <SectionHeading align="left" eyebrow="Reach us directly" title="Contact details" />
            <div className="mt-6 space-y-4">
              <ContactRow
                label="Phone / WhatsApp"
                value={company.phone}
                href={`tel:${company.phone.replace(/\s/g, "")}`}
              />
              <ContactRow label="Email" value={company.email} href={`mailto:${company.email}`} />
              <ContactRow label="Location" value={company.location} />
            </div>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Follow along
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { label: "LinkedIn", href: company.socials.linkedin },
                { label: "GitHub", href: company.socials.github },
                { label: "YouTube", href: company.socials.youtube },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-accent/60 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="card-border mt-8 rounded-2xl p-5">
              <p className="text-sm font-semibold text-white">Prefer a quick call?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Message us on WhatsApp at {company.phone} with a one-line description of what you
                need — we&apos;ll take it from there.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = href ? (
    <a href={href} className="text-white transition-colors hover:text-accent">
      {value}
    </a>
  ) : (
    <span className="text-white">{value}</span>
  );
  return (
    <div className="card-border rounded-xl p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 break-all text-sm font-medium">{content}</p>
    </div>
  );
}
