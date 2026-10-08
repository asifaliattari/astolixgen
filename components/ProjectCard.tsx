import Link from "next/link";
import type { Project } from "@/lib/data";

/** Card for a single project / case study. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-border group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-viol/50 hover:shadow-[0_8px_40px_-12px_rgba(139,92,246,0.4)]"
    >
      {/* Visual header strip */}
      <div className="bg-grid relative h-28 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-viol/15" />
        <div className="absolute left-5 top-5">
          <span className="rounded-full border border-accent/30 bg-ink/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent backdrop-blur">
            {project.status}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-400">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
