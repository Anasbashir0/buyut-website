import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "../data/company.js";
import { services } from "../data/services.js";
import { telHref, currentYear } from "../utils/format.js";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

// Text labels are used instead of brand icons, because recent Lucide versions
// no longer ship brand logos.
const socialLabels = { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram", x: "X" };

export default function Footer() {
  const { phone, email, address } = company.contact;
  const socials = Object.entries(company.social).filter(([, url]) => url);

  return (
    <footer className="bg-ink text-white/75">
      <div className="container-page grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1.2fr]">
        <div>
          {/* Light tile keeps the logo's brown pill and white text readable. */}
          <Link
            to="/"
            aria-label={`${company.name} home`}
            className="inline-block rounded-2xl bg-cream p-3"
          >
            <img
              src="/logo.png"
              alt={`${company.name} logo`}
              width="500"
              height="500"
              loading="lazy"
              className="h-24 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            {company.tagline}
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:border-gold hover:text-gold"
                  >
                    {socialLabels[key] || key}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Quick links
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Services
          </h2>
          <ul className="mt-6 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="transition hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={telHref(phone)} className="transition hover:text-gold">{phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${email}`} className="break-all transition hover:text-gold">{email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear()} {company.legalName}. RC {company.rcNumber.replace("RC", "")}. All rights reserved.
          </p>
          <p>A subsidiary of {company.parent}</p>
        </div>
      </div>
    </footer>
  );
}
