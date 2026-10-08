import Link from "next/link";
import type { Service } from "@/lib/data";

/* Minimal stroke icons keyed by service slug — no icon library needed. */
const iconPaths: Record<string, React.ReactNode> = {
  "ai-solutions": <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />,
  "ai-automation-agents": <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />,
  "software-web-development": <path d="M8 6 3 12l5 6M16 6l5 6-5 6M13 4l-2 16" />,
  "data-analytics": <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />,
  "iot-solutions": (
    <>
      <path d="M12 20h.01" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M5.5 13.5a9.5 9.5 0 0 1 13 0" />
      <path d="M2.6 10.4a14 14 0 0 1 18.8 0" />
    </>
  ),
  "ai-creative-studio": <path d="M8 5.5v13l11-6.5-11-6.5z" />,
  "ai-education-training": <path d="M12 4 2 9l10 5 10-5-10-5zM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6" />,
};

function ServiceIcon({ slug }: { slug: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[slug]}
    </svg>
  );
}

/** Card for a single service on the homepage and services hub. */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-border group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_8px_40px_-12px_rgba(34,211,238,0.35)]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-viol/15 text-accent transition-colors group-hover:text-white">
        <ServiceIcon slug={service.slug} />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-white">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{service.short}</p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
        Learn more
        <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
