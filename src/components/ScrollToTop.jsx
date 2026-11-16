import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to top on route change (or to #hash when present).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick so lazily loaded pages have rendered the target.
      const t = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView();
      }, 150);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
