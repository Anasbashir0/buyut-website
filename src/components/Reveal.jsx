import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Fade-up on scroll. Does nothing for users who prefer reduced motion.
export default function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Image unveiled with a clip-path wipe as it scrolls into view.
// The scroll detection runs on an unclipped wrapper, and a timer guarantees the
// image always appears even if scroll detection fails.
export function ImageReveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setForced(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (reduce) return <div className={className}>{children}</div>;

  const show = inView || forced;
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={false}
        animate={{ clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
