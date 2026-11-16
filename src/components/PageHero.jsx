import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AnimatedHeadline from "./AnimatedHeadline.jsx";
import { motion, useReducedMotion } from "framer-motion";

// Dark banner used at the top of every inner page.
export default function PageHero({ eyebrow, title, text, trail = [], image }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30 grayscale"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div
        className="absolute inset-y-0 right-0 -z-10 hidden w-[30%] bg-rust lg:block"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div className="container-page py-20 sm:py-28 lg:py-32">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-white/60">
          <Link to="/" className="transition hover:text-gold">Home</Link>
          {trail.map((t) => (
            <span key={t.label} className="flex items-center gap-2">
              <ChevronRight size={14} aria-hidden="true" />
              {t.to ? (
                <Link to={t.to} className="transition hover:text-gold">{t.label}</Link>
              ) : (
                <span className="text-white/90">{t.label}</span>
              )}
            </span>
          ))}
        </nav>
        <p className="eyebrow mt-8 !text-gold">{eyebrow}</p>
        <AnimatedHeadline
          text={title}
          className="mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
        />
        {text && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  );
}
