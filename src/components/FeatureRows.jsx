import Reveal from "./Reveal.jsx";
import { getIcon } from "../utils/icons.js";

// Icon + title + text rows separated by hairlines. Used for QA, HSE and CSR lists.
export default function FeatureRows({ items, light = false }) {
  return (
    <ul className={`divide-y ${light ? "divide-white/10 border-y border-white/10" : "divide-charcoal/10 border-y border-charcoal/10"}`}>
      {items.map((it, i) => {
        const Icon = getIcon(it.icon);
        return (
          <li key={it.title}>
            <Reveal delay={i * 0.06} y={16}>
              <div className="flex gap-5 py-6">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                    light ? "bg-white/10 text-gold" : "bg-rust/10 text-rust"
                  }`}
                >
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                  <p className={`mt-1.5 text-sm leading-relaxed ${light ? "text-white/65" : "text-charcoal/70"}`}>
                    {it.text}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
