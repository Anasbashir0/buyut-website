export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`eyebrow ${light ? "!text-gold" : ""} ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/70" : "text-charcoal/70"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
