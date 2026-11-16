import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Button from "./Button.jsx";
import { services } from "../data/services.js";
import { getIcon } from "../utils/icons.js";

// Interactive services explorer: pick a service on the left, read it on the right.
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const s = services[active];
  const Icon = getIcon(s.icon);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.3fr] lg:gap-14">
      <div role="tablist" aria-label="Services" className="border-y border-charcoal/10">
        {services.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.slug}
              role="tab"
              id={`tab-${item.slug}`}
              aria-selected={on}
              aria-controls="service-panel"
              onClick={() => setActive(i)}
              onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
              className={`group relative flex w-full items-center gap-5 border-b border-charcoal/10 px-2 py-5 text-left transition-colors last:border-b-0 ${
                on ? "bg-white" : "hover:bg-white/60"
              }`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-gold to-ember transition-transform duration-300 ${
                  on ? "scale-y-100" : "scale-y-0"
                }`}
                aria-hidden="true"
              />
              <span className={`font-display text-sm font-semibold ${on ? "text-rust" : "text-charcoal/40"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`flex-1 font-display text-lg font-semibold sm:text-xl ${on ? "text-charcoal" : "text-charcoal/70"}`}>
                {item.title}
              </span>
              <ArrowRight
                size={18}
                aria-hidden="true"
                className={`transition ${on ? "translate-x-0 text-rust opacity-100" : "-translate-x-2 opacity-0"}`}
              />
            </button>
          );
        })}
      </div>

      <div
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`tab-${s.slug}`}
        className="relative min-h-[22rem] overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-10"
      >
        <div className="bg-blueprint absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-gold/40 to-ember/20 blur-3xl"
          aria-hidden="true"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-orange text-ink">
              <Icon size={28} aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold sm:text-3xl">{s.title}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">{s.summary}</p>
            <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {s.points.slice(0, 6).map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-white/85">
                  <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={`/services#${s.slug}`} variant="outline" className="!py-3">
                Full details
              </Button>
              <Link
                to={`/contact?service=${encodeURIComponent(s.title)}`}
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-gold"
              >
                Enquire about this service <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
