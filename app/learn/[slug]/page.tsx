import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import books from "@/lib/books.json";
import bookparts from "@/lib/bookparts.json";

type Book = (typeof books)[number];

function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

/** Book HTML is stored in <90KB chunks (deploy upload limit); reassemble. */
function getHtml(slug: string): string {
  const parts: string[] = (bookparts as Record<string, string[]>)[slug] ?? [];
  return parts
    .map((p) => fs.readFileSync(path.join(process.cwd(), "lib", "bookparts", p), "utf8"))
    .join("");
}

/** Extract h2 sections for the table of contents. */
function getToc(html: string): { id: string; title: string }[] {
  const toc: { id: string; title: string }[] = [];
  const re = /<h2 id="([^"]+)">(.+?)<\/h2>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    toc.push({ id: m[1], title: m[2].replace(/<[^>]+>/g, "") });
  }
  return toc;
}

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = getBook(params.slug);
  if (!book) return { title: "Book not found" };
  return {
    title: `${book.title} — Free Book`,
    description: book.description,
    openGraph: {
      title: `${book.title} | AstolixGen Learning Library`,
      description: book.description,
      url: `https://astolixgen.com/learn/${book.slug}`,
      type: "article",
      images: book.cover ? [{ url: `https://astolixgen.com${book.cover}` }] : undefined,
    },
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getBook(params.slug);
  if (!book) notFound();
  const html = getHtml(book.slug);
  const toc = getToc(html);
  const idx = books.findIndex((b) => b.slug === book.slug);
  const prev = idx > 0 ? books[idx - 1] : null;
  const next = idx < books.length - 1 ? books[idx + 1] : null;

  return (
    <>
      <article className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <Link
              href="/learn"
              className="text-sm text-slate-500 transition-colors hover:text-accent"
            >
              ← All 50 books
            </Link>
            <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
              {book.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.cover}
                  alt={`${book.title} cover`}
                  className="w-40 rounded-xl border border-white/10 shadow-2xl md:w-full"
                />
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Book {book.number} of 50 · Free
                </p>
                <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  {book.title}
                </h1>
                <p className="mt-3 text-sm text-slate-500">
                  {book.words.toLocaleString()} words · {book.chapters} chapters ·
                  illustrated
                </p>
                {toc.length > 0 && (
                  <nav aria-label="Table of contents" className="card-border mt-6 rounded-2xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      In this book
                    </p>
                    <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
                      {toc.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="text-sm text-slate-400 transition-colors hover:text-accent"
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <div
          className="book-content mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <nav className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/learn/${prev.slug}`}
              className="card-border rounded-2xl p-5 transition-colors hover:border-accent/40"
            >
              <p className="text-xs text-slate-500">← Previous book</p>
              <p className="mt-1 font-semibold text-white">{prev.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/learn/${next.slug}`}
              className="card-border rounded-2xl p-5 text-right transition-colors hover:border-accent/40"
            >
              <p className="text-xs text-slate-500">Next book →</p>
              <p className="mt-1 font-semibold text-white">{next.title}</p>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
