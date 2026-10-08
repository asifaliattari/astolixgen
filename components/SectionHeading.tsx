import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Pass JSX to include a gradient accent span. */
  description?: string;
  align?: "left" | "center";
}

/** Consistent section header: small eyebrow, display headline, muted lede. */
export default function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignCls}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>}
    </Reveal>
  );
}
