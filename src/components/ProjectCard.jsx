import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Building } from "lucide-react";

export function StatusPill({ status }) {
  if (!status) return null;
  const ongoing = status.toLowerCase() === "ongoing";
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
      <span className={`h-2 w-2 rounded-full ${ongoing ? "animate-pulse-dot bg-gold" : "bg-gold"}`} />
      {status}
    </span>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-ink text-white">
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
          <img
            src={project.cover}
            alt={project.images[0]?.alt || project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute left-5 top-5">
            <StatusPill status={project.status} />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {project.category}
            </p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
              {project.title}
            </h3>
          </div>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
          <div className="space-y-2 text-sm text-white/70">
            <p className="flex items-start gap-2">
              <Building size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              {project.client}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-gold" aria-hidden="true" />
              {project.location}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
            View project
            <ArrowUpRight
              size={18}
              className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
