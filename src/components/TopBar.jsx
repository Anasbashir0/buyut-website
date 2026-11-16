import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "../data/company.js";
import { telHref } from "../utils/format.js";

// Slim utility bar above the navigation.
export default function TopBar() {
  const { phone, email } = company.contact;
  return (
    <div className="bg-ink text-xs text-white/75">
      <div className="container-page flex h-10 items-center justify-between gap-4">
        <p className="hidden items-center gap-2 sm:flex">
          <MapPin size={14} className="text-gold" aria-hidden="true" />
          Garki 2, Abuja, Nigeria
        </p>
        <p className="hidden font-medium tracking-wide text-white/60 lg:block">
          CAC Registered &middot; {company.rcNumber}
        </p>
        <div className="flex w-full items-center justify-between gap-6 sm:w-auto sm:justify-end">
          <a
            href={telHref(phone)}
            className="flex items-center gap-2 transition hover:text-gold"
          >
            <Phone size={14} className="text-gold" aria-hidden="true" />
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 transition hover:text-gold"
          >
            <Mail size={14} className="text-gold" aria-hidden="true" />
            <span className="hidden min-[420px]:inline">{email}</span>
            <span className="min-[420px]:hidden">Email us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
