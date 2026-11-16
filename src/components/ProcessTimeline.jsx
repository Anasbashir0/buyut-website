import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { processSteps } from "../data/content.js";
import { getIcon } from "../utils/icons.js";

// Four-stage delivery process. A line draws itself across as the section scrolls.
export default function ProcessTimeline() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="bg-blueprint absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            light
            eyebrow="How we work"
            title="A structured four-step delivery process"
            text="From the first conversation to handover, every project follows the same disciplined workflow."
          />
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Track and animated progress line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/15 lg:block" aria-hidden="true" />
          <motion.div
            style={{ scaleX: reduce ? 1 : scale }}
            className="absolute left-0 right-0 top-8 hidden h-0.5 origin-left bg-gradient-to-r from-gold via-orange to-ember lg:block"
            aria-hidden="true"
          />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <li key={s.title}>
                  <Reveal delay={i * 0.12}>
                    <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-charcoal text-gold">
                      <Icon size={26} aria-hidden="true" />
                    </div>
                    <p className="mt-6 font-display text-sm font-semibold tracking-widest text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
