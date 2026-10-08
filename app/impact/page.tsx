import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import { impactStories, impactPhotos, company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "AstolixGen in the field — spreading AI and IT education across Pakistan, from rural KPK mountain communities to low-cost schools in Karachi. Real visits, real videos.",
};

export default function ImpactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Impact
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Taking AI education <span className="text-gradient">where it&apos;s needed most.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              AstolixGen works practically to spread advanced AI and IT education across the
              world — starting at home in Pakistan, with special focus on rural areas. Our team
              has visited remote communities in KPK, run awareness sessions in Karachi&apos;s
              low-cost schools, and represented at ITCN Asia. These are real visits,
              documented on the ground.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={company.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gradient-to-r from-accent to-viol px-5 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Watch on YouTube
              </a>
              <Link
                href="/contact"
                className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                Partner with us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Field stories */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Field stories"
          title="On the ground, on camera"
          description="Documented visits from our YouTube channel — the work as it happened."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {impactStories.map((story, i) => (
            <Reveal key={story.id} delay={(i % 2) * 120}>
              <article>
                <VideoEmbed youtubeId={story.youtubeId} title={story.title} />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  {story.kicker}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-white">
                  {story.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-400">{story.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Storytelling partner */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Told through film
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
                Documented with BlackInkMotion
              </h2>
              <p className="mt-4 leading-relaxed text-slate-400">
                Our field stories are captured and produced with{" "}
                <a
                  href="https://blackinkmotion.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline decoration-accent/60 underline-offset-4 hover:text-accent"
                >
                  BlackInkMotion
                </a>
                , the AI video production studio founded by our co-founder Taha Ahmed.
                Cinematic storytelling turns these visits into material that travels —
                so a classroom session in Karachi or a mountain village in KPK can inspire
                educators anywhere.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-white/10 bg-ink/60 p-8">
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-accent">▸</span>
                    Field documentaries from every visit, published openly on YouTube
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">▸</span>
                    Educational explainers that make AI concepts click for beginners
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">▸</span>
                    Motion graphics and animation for awareness campaigns
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Photos from the field"
          description="Real moments from our visits — schools, communities and events."
        />
        {impactPhotos.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {impactPhotos.map((photo) => (
              <Reveal key={photo.src}>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <p className="text-slate-400">
                Field photos are being added — check back soon, or follow the visits as they
                happen on{" "}
                <a
                  href={company.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline decoration-accent/60 underline-offset-4 hover:text-accent"
                >
                  YouTube
                </a>
                .
              </p>
            </div>
          </Reveal>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent/10 via-transparent to-viol/10 p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Bring AI education to your community
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              School, college, community organization or event — if you want an AI and IT
              awareness session, we&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-gradient-to-r from-accent to-viol px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Invite the team
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
