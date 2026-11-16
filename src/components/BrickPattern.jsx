import { motion, useReducedMotion } from "framer-motion";

// Decorative panel echoing the bricks in the logo. Used until real photographs
// are supplied (set heroImage / aboutImage in src/data/company.js).
const rows = 7;
const cols = 4;
const colours = ["#8a3c1d", "#a34825", "#f3a51b", "#ed8126", "#d9563d"];

export default function BrickPattern({ className = "" }) {
  const reduce = useReducedMotion();
  const bricks = [];
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : -45;
    for (let c = 0; c < cols + 1; c++) {
      const idx = (r * 3 + c * 2) % colours.length;
      bricks.push({
        key: `${r}-${c}`,
        x: c * 94 + offset,
        y: r * 52,
        fill: colours[idx],
        opacity: idx > 1 ? 0.95 : 0.9,
        delay: (r + c) * 0.05,
      });
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-charcoal ${className}`}
      role="img"
      aria-label="Decorative brick pattern in the Buyut brand colours"
    >
      <svg
        viewBox="0 0 376 364"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {bricks.map((b) => (
          <motion.rect
            key={b.key}
            x={b.x}
            y={b.y}
            width="86"
            height="44"
            rx="6"
            fill={b.fill}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: b.opacity, scale: 1 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : b.delay }}
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
    </div>
  );
}
