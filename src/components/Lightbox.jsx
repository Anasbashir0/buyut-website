import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Full-screen image viewer. index = null means closed.
export default function Lightbox({ images, index, onChange }) {
  const closeRef = useRef(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
          onClick={() => onChange(null)}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={() => onChange(null)}
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index - 1 + images.length) % images.length);
                }}
                className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index + 1) % images.length);
                }}
                className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index].src}
              alt={images[index].alt}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/70">
              {images[index].alt} &middot; {index + 1} / {images.length}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
