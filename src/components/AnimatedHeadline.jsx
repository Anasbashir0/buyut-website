import { motion, useReducedMotion } from "framer-motion";

// Headline whose words slide up one after another.
export default function AnimatedHeadline({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
}) {
  const reduce = useReducedMotion();
  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
