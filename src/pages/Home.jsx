import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import SEO from "../components/SEO.jsx";
import Button from "../components/Button.jsx";
import Reveal, { ImageReveal } from "../components/Reveal.jsx";
import Counter from "../components/Counter.jsx";
import AnimatedHeadline from "../components/AnimatedHeadline.jsx";
import Marquee from "../components/Marquee.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ServicesShowcase from "../components/ServicesShowcase.jsx";
import ProcessTimeline from "../components/ProcessTimeline.jsx";
import FeatureRows from "../components/FeatureRows.jsx";
import ProjectCard, { StatusPill } from "../components/ProjectCard.jsx";
import TeamCard from "../components/TeamCard.jsx";
import CTASection from "../components/CTASection.jsx";
import { company } from "../data/company.js";
import { projects } from "../data/projects.js";
import { services } from "../data/services.js";
import { about, team, marqueeItems, qualityAssurance, hse, processSteps } from "../data/content.js";

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const current = projects.find((p) => p.status === "Ongoing") || projects[0];

  // Slow parallax on the background photograph.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const stats = [
    { value: services.length, label: "Core service lines" },
    { value: processSteps.length, label: "Stage delivery process" },
    { value: current.stat.value, label: "Units in our current federal housing project" },
  ];

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-white">
      <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-x-0 -top-[8%] -z-30 h-[116%]">
        <img
          src="/images/hero-skyline.webp"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-80 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div
        className="absolute inset-y-0 right-0 -z-10 hidden w-[36%] bg-rust/90 lg:block"
        style={{ clipPath: "polygon(34% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />

      <div className="container-page grid min-h-[min(46rem,calc(100svh-8rem))] items-center gap-12 pb-12 pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:pt-20">
        <div>
          <motion.p className="eyebrow !text-gold" {...fade(0)}>
            Construction &middot; Civil Works &middot; Consultancy
          </motion.p>
          <AnimatedHeadline
            text={company.heroHeadline}
            delay={0.15}
            className="mt-6 text-[2.25rem] font-bold leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
          />
          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            {...fade(0.7)}
          >
            {company.heroIntro}
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" {...fade(0.85)}>
            <Button to="/contact">
              Request a Quote <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button to="/projects" variant="outline">
              View our projects
            </Button>
          </motion.div>
        </div>

        {/* Current project spotlight */}
        <motion.div {...fade(1)} className="relative lg:justify-self-end">
          <Link
            to={`/projects/${current.slug}`}
            className="group block max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-ink/70 shadow-2xl backdrop-blur-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={current.cover}
                alt={current.images[0]?.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4">
                <StatusPill status={current.status || "Featured"} />
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Current project</p>
              <h2 className="mt-2 font-display text-lg font-semibold leading-snug">{current.title}</h2>
              <p className="mt-2 text-sm text-white/65">{current.client}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                View project <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Verified figures drawn from the company profile */}
      <div className="border-t border-white/10 bg-ink/60 backdrop-blur">
        <dl className="container-page grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col pr-4">
              <dt className="order-2 mt-1 text-xs leading-snug text-white/60">{s.label}</dt>
              <dd className="order-1 font-display text-4xl font-bold text-gradient sm:text-5xl">
                <Counter to={s.value} />
              </dd>
            </div>
          ))}
          <div className="flex flex-col pr-4">
            <dt className="order-2 mt-1 text-xs leading-snug text-white/60">CAC-registered limited liability company</dt>
            <dd className="order-1 font-display text-3xl font-bold leading-[2.5rem] text-white sm:text-4xl sm:leading-[3rem]">
              {company.rcNumber}
            </dd>
          </div>
        </dl>
        <div className="container-page hidden justify-center pb-5 md:flex" aria-hidden="true">
          <ChevronDown size={20} className="animate-bounce text-white/40" />
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="section-pad overflow-hidden bg-cream">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <div
            className="absolute -bottom-6 -left-6 hidden h-2/3 w-2/3 rounded-3xl bg-gradient-to-br from-gold via-orange to-ember opacity-90 sm:block"
            aria-hidden="true"
          />
          <ImageReveal className="relative">
            <img
              src="/images/estate.webp"
              alt="Contemporary residential development with timber-clad gables"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            />
          </ImageReveal>
        </div>
        <Reveal>
          <SectionHeading eyebrow="Who we are" title="A multi-disciplinary Nigerian construction and engineering company" />
          <p className="mt-6 text-base leading-relaxed text-charcoal/75 sm:text-lg">{about.intro[0]}</p>
          <p className="mt-4 leading-relaxed text-charcoal/65">{about.welcome}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button to="/about" variant="dark">
              About Buyut <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <p className="text-sm text-charcoal/60">
              A subsidiary of <span className="font-semibold text-charcoal">{company.parent}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section-pad bg-sand/60">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Engineering and construction services"
            text="Five core service lines, supported by general contracting, property development and project management."
          />
        </Reveal>
        <Reveal className="mt-14" delay={0.1}>
          <ServicesShowcase />
        </Reveal>
      </div>
    </section>
  );
}

function Standards() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why Buyut"
            title="Quality and safety built into every stage"
            text="Our commitments to quality assurance and a zero-harm site culture apply to every project we undertake."
          />
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="font-display text-xl font-semibold text-rust">Quality assurance</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{qualityAssurance.intro}</p>
            <div className="mt-6">
              <FeatureRows items={qualityAssurance.items} />
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-rust">Health, safety &amp; environment</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{hse.intro}</p>
            <div className="mt-6">
              <FeatureRows items={hse.items} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="section-pad bg-sand/60">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading eyebrow="Our work" title="Featured projects" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/projects" variant="secondary">
              All projects <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading eyebrow="Leadership" title="The people behind Buyut" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/about#team" variant="secondary">
              Meet the team <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <TeamCard person={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        description="Buyut Integrated Services is a CAC-registered Nigerian company delivering building construction, civil works, roads and structures, construction management and consultancy from Abuja."
        path="/"
      />
      <Hero />
      <Marquee items={marqueeItems} />
      <Intro />
      <Services />
      <ProcessTimeline />
      <Standards />
      <FeaturedProjects />
      <Leadership />
      <CTASection />
    </>
  );
}
