import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import Lightbox from "../components/Lightbox.jsx";
import CTASection from "../components/CTASection.jsx";
import { StatusPill } from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [lightbox, setLightbox] = useState(null);
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "Client", value: project.client },
    project.initiative && { label: "Initiative", value: project.initiative },
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
    { label: "Scope", value: project.scope },
    project.status && { label: "Status", value: project.status },
  ].filter(Boolean);

  return (
    <>
      <SEO title={project.title} description={project.summary} path={`/projects/${project.slug}`} />
      <PageHero
        eyebrow={project.category}
        title={project.title}
        trail={[{ label: "Projects", to: "/projects" }, { label: project.title }]}
        image={project.cover}
      />

      <section className="section-pad bg-cream">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status={project.status} />
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Project overview</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/75">
              {project.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="rounded-3xl bg-ink p-8 text-white sm:p-10">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Project details
              </h3>
              <dl className="mt-6 space-y-5">
                {facts.map((f) => (
                  <div key={f.label} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-wider text-white/50">{f.label}</dt>
                    <dd className="mt-1.5 text-sm leading-snug text-white/90">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Button to="/contact" className="mt-8 w-full">
                Discuss a similar project
              </Button>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand/60 pb-20 pt-4 sm:pb-24 lg:pb-32">
        <div className="container-page">
          <Reveal>
            <h2 className="pt-16 text-2xl font-semibold sm:text-3xl">Site photographs</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {project.images.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.07}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-charcoal"
                  aria-label={`Enlarge photo ${i + 1}: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 text-white opacity-0 transition group-hover:bg-ink/40 group-hover:opacity-100">
                    <Expand size={24} aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-rust">
              <ArrowLeft size={16} aria-hidden="true" /> All projects
            </Link>
            {next && next.slug !== project.slug && (
              <Link
                to={`/projects/${next.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-rust"
              >
                Next: {next.title} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Lightbox images={project.images} index={lightbox} onChange={setLightbox} />
      <CTASection />
    </>
  );
}
