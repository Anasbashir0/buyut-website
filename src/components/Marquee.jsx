// Slow, continuous ribbon of capability names. Paused for reduced-motion users.
export default function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-rust py-5 text-white"
      aria-label={`Capabilities: ${items.join(", ")}`}
      role="group"
    >
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-7 font-display text-lg font-semibold uppercase tracking-wide sm:text-xl"
          >
            {item}
            <span className="ml-14 h-2 w-2 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
