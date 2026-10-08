import { processSteps } from "@/lib/data";
import Reveal from "./Reveal";

/** "How we work" — 4-step process rendered as a responsive grid. */
export default function ProcessSteps() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s, i) => (
        <Reveal key={s.step} delay={i * 90}>
          <div className="card-border relative h-full rounded-2xl p-6">
            <p className="font-display text-sm font-bold tracking-widest text-accent">{s.step}</p>
            <h3 className="mt-2 font-display text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.detail}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
