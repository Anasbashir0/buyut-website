import { Quote } from "lucide-react";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal, { ImageReveal } from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureRows from "../components/FeatureRows.jsx";
import TeamCard from "../components/TeamCard.jsx";
import CTASection from "../components/CTASection.jsx";
import { company } from "../data/company.js";
import { about, messages, team, coreValues, csr } from "../data/content.js";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description={`About ${company.name}: a CAC-registered Nigerian construction and engineering company based in Abuja, and a subsidiary of ${company.parent}.`}
        path="/about"
      />
      <PageHero
        eyebrow="About us"
        title="Engineering excellence, built on integrity"
        text={`${company.name} is a subsidiary of ${company.parent}, registered with the Corporate Affairs Commission as ${company.rcNumber}.`}
        trail={[{ label: "About Us" }]}
        image="/images/hero-skyline.webp"
      />

      {/* Story + identity panel */}
      <section className="section-pad bg-cream">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Who we are" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-charcoal/75 sm:text-lg">
              {about.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <aside className="rounded-3xl bg-ink p-8 text-white sm:p-10">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Company details
              </h3>
              <dl className="mt-6 space-y-5">
                {company.facts.map((f) => (
                  <div key={f.label} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-wider text-white/50">{f.label}</dt>
                    <dd className="mt-1.5 text-sm leading-snug text-white/90">{f.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs uppercase tracking-wider text-white/50">Parent company</dt>
                  <dd className="mt-1.5 text-sm text-white/90">Subsidiary of {company.parent}</dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Image banner */}
      <section className="bg-cream pb-20 lg:pb-28">
        <div className="container-page">
          <ImageReveal>
            <img
              src="/images/estate.webp"
              alt="Contemporary residential development with timber-clad gables"
              loading="lazy"
              className="aspect-[21/9] w-full rounded-3xl object-cover"
            />
          </ImageReveal>
        </div>
      </section>

      {/* Vision, mission, commitment */}
      <section className="section-pad bg-ink text-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading light eyebrow="Direction" title="Vision, mission and commitment" />
          </Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {[
              { n: "01", t: "Our vision", p: about.vision },
              { n: "02", t: "Our mission", p: about.mission },
              { n: "03", t: "Our commitment", p: about.commitment },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 0.1}>
                <div className="border-t border-white/20 pt-6">
                  <p className="font-display text-5xl font-bold text-gradient">{b.n}</p>
                  <h3 className="mt-5 text-2xl font-semibold">{b.t}</h3>
                  <p className="mt-4 leading-relaxed text-white/70">{b.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Messages from leadership */}
      <section className="section-pad bg-cream">
        <div className="container-page space-y-20 lg:space-y-28">
          {messages.map((m, i) => (
            <div
              key={m.name}
              className={`grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div className="relative mx-auto max-w-sm">
                  <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl border-2 border-gold" aria-hidden="true" />
                  <img
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    loading="lazy"
                    className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <Quote className="text-orange" size={40} aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{m.title}</h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal/75">
                  {m.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <p className="mt-6 font-display text-lg font-semibold">{m.name}</p>
                <p className="text-sm font-medium text-terracotta">{m.role}, {company.legalName}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Capability + values */}
      <section className="section-pad bg-sand/60">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow="Our capability" title="End-to-end delivery capacity" />
            <div className="mt-8 space-y-5 leading-relaxed text-charcoal/75">
              {about.capability.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h3 className="font-display text-xl font-semibold text-rust">Core values</h3>
            </Reveal>
            <ol className="mt-4 divide-y divide-charcoal/10 border-y border-charcoal/10">
              {coreValues.map((v, i) => (
                <li key={v.title}>
                  <Reveal delay={i * 0.05} y={14}>
                    <div className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                      <span className="font-display text-xl font-bold text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-display text-lg font-semibold">{v.title}</h4>
                        <p className="mt-1 text-sm text-charcoal/70">{v.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CSR */}
      <section className="section-pad bg-cream">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow="Responsibility" title="Corporate social responsibility and local content" text={csr.intro} />
          </Reveal>
          <FeatureRows items={csr.items} />
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-pad scroll-mt-24 bg-ink text-white">
        <div className="container-page">
          <Reveal>
            <SectionHeading light eyebrow="Leadership" title="Meet our team" />
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {team.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <TeamCard person={p} />
                <p className="mt-5 text-sm leading-relaxed text-white/70">{p.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
