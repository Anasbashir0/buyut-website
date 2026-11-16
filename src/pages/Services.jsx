import { ArrowRight, Check } from "lucide-react";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ProcessTimeline from "../components/ProcessTimeline.jsx";
import CTASection from "../components/CTASection.jsx";
import { company } from "../data/company.js";
import { services, additionalCapabilities } from "../data/services.js";
import { about } from "../data/content.js";
import { getIcon } from "../utils/icons.js";

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description={`Building construction, civil works, roads and structures, construction management and consultancy from ${company.name} in Abuja.`}
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title="What we build, manage and advise on"
        text="Five core service lines, delivered by an in-house multidisciplinary team."
        trail={[{ label: "Services" }]}
        image="/images/hero-skyline.webp"
      />

      <section className="section-pad bg-cream">
        <div className="container-page divide-y divide-charcoal/10">
          {services.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-32 gap-8 py-14 first:pt-0 last:pb-0 lg:grid-cols-[1fr_1.7fr] lg:gap-20"
              >
                <Reveal>
                  <div className="lg:sticky lg:top-32">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold to-orange text-ink">
                      <Icon size={30} aria-hidden="true" />
                    </span>
                    <p className="eyebrow mt-7">Service {String(i + 1).padStart(2, "0")}</p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{s.title}</h2>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-lg leading-relaxed text-charcoal/85">{s.summary}</p>
                  <p className="mt-4 leading-relaxed text-charcoal/65">{s.details}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-charcoal/80">
                        <Check size={18} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button
                    to={`/contact?service=${encodeURIComponent(s.title)}`}
                    variant="secondary"
                    className="mt-8"
                  >
                    Enquire about this service <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-pad bg-sand/60">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading
              eyebrow="Also available"
              title="Further business lines"
              text={about.intro[2]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-px overflow-hidden rounded-2xl bg-charcoal/10 sm:grid-cols-2">
              {additionalCapabilities.map((c) => (
                <li key={c} className="bg-white px-6 py-5 text-sm font-medium">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ProcessTimeline />
      <CTASection />
    </>
  );
}
