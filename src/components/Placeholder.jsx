import { SHOW_PLACEHOLDER_BADGES } from "../data/company.js";

// Inline marker for a value management has not supplied yet.
export function Missing({ label }) {
  return <span className="placeholder-text">[{label}: to be supplied]</span>;
}

// Small badge shown on cards whose content is still placeholder text.
export function PlaceholderBadge({ className = "" }) {
  if (!SHOW_PLACEHOLDER_BADGES) return null;
  return (
    <span
      className={`inline-block rounded-full border border-dashed border-orange bg-gold/15 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wider text-brown ${className}`}
    >
      Placeholder
    </span>
  );
}
