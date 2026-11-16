import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import CTASection from "../components/CTASection.jsx";
import { company } from "../data/company.js";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        description={`Residential and public housing projects delivered by ${company.name} in Abuja, including work for Navy Holdings Limited and the Federal Ministry of Housing and Urban Development.`}
        path="/projects"
      />
      <PageHero
        eyebrow="Projects"
        title="Selected work across Abuja"
        text="Residential and public housing developments delivered end to end."
        trail={[{ label: "Projects" }]}
        image="/images/projects/renewed-hope-3.webp"
      />

      <section className="section-pad bg-cream">
        <div className="container-page">
          {projects.length === 0 ? (
            <p className="text-charcoal/70">Projects will be listed here soon.</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 0.1}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
