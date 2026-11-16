import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "../utils/icons.js";
import { PlaceholderBadge } from "./Placeholder.jsx";

export default function ServiceCard({ service }) {
  const Icon = getIcon(service.icon);
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-charcoal/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange/50 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold to-orange text-charcoal">
          <Icon size={24} aria-hidden="true" />
        </span>
        {service.placeholder && <PlaceholderBadge />}
      </div>
      <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
        {service.summary}
      </p>
      <Link
        to={`/services#${service.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta"
      >
        Learn more
        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
