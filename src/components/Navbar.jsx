import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./Button.jsx";
import { company } from "../data/company.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `group relative py-2 text-sm font-semibold transition-colors ${
      isActive ? "text-rust" : "text-charcoal/75 hover:text-charcoal"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-charcoal/10 bg-cream/90 shadow-[0_8px_30px_-12px_rgba(20,16,14,0.25)] backdrop-blur-md"
          : "border-transparent bg-cream"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-[4.25rem]" : "h-24"
        }`}
      >
        <Link to="/" aria-label={`${company.name} home`} className="shrink-0">
          <img
            src="/logo.png"
            alt={`${company.name} logo`}
            width="500"
            height="500"
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-14" : "h-[5.25rem]"
            }`}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-gradient-to-r from-gold to-ember transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <Button to="/contact" className="!px-6 !py-3">
            Request a Quote
          </Button>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/20 bg-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-charcoal/10 bg-cream lg:hidden"
          >
            <div className="container-page flex flex-col py-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `block border-b border-charcoal/10 py-4 font-display text-2xl font-semibold ${
                        isActive ? "text-rust" : "text-charcoal"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <Button to="/contact" className="mt-8 w-full">
                Request a Quote
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
