import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import books from "@/lib/books.json";

export const metadata: Metadata = {
  title: "Learning Library — 50 Free Illustrated Books",
  description:
    "AstolixGen's free learning library: 50 illustrated books covering AI, machine learning, data analytics, Power BI, IoT, and automation — written for researcher and publication students.",
  openGraph: {
    title: "Learning Library | AstolixGen",
    description:
      "50 free illustrated books on AI, data, and IoT — written for researcher and publication students.",
    url: "https://astolixgen.com/learn",
    type: "website",
  },
};

export default function LearnPage() {
  return (
    <>
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Free learning library
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              50 books. <span className="text-gradient">Zero cost.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
              Illustrated, practical books on AI, machine learning, data analytics,
              Power&nbsp;BI, IoT, and automation — written for researcher and
              publication students. Read them all right here, free.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="The collection"
          title="Browse the library"
          description="Pick a cover and start reading. Every book includes diagrams, worked examples, and real references."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {books.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 5) * 60}>
              <Link
                href={`/learn/${b.slug}`}
                className="card-border group block overflow-hidden rounded-2xl transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                  {b.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.cover}
                      alt={`${b.title} cover`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5 p-4 text-center text-sm text-slate-500">
                      {b.title}
                    </div>
                  )}
                  <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-accent backdrop-blur">
                    Book {b.number}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-semibold leading-snug text-white group-hover:text-accent">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {b.words.toLocaleString()} words · {b.chapters} chapters
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
