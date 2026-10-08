import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AstolixGen projects and R&D: the AgriSense IoT concept, WhatsApp business automation prototype, and AI creative production.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-grid bg-glow pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Projects</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What we&apos;re <span className="text-gradient">building & researching.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              Concepts, prototypes and R&D — labeled honestly. No fake client work, no inflated
              claims.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="All projects"
          title="Concepts & prototypes"
          description="Each project page explains what it is, what stage it's at, and how to get involved."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
