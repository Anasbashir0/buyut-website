import { Mail, Phone } from "lucide-react";
import Button from "./Button.jsx";
import Reveal from "./Reveal.jsx";
import { company } from "../data/company.js";
import { telHref } from "../utils/format.js";

export default function CTASection({
  title = "Planning a project or partnership?",
  text = "Tell us what you need. The Buyut team will review your enquiry and respond.",
}) {
  const { phone, email } = company.contact;
  return (
    <section className="relative overflow-hidden bg-rust text-white">
      <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-y-0 right-0 hidden w-[42%] bg-ink lg:block"
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div className="container-page relative grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-white/80">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" variant="light">
              Request a Quote
            </Button>
            <Button to="/projects" variant="outline">
              View our projects
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="lg:pl-16">
          <ul className="space-y-5 text-sm">
            <li>
              <a href={telHref(phone)} className="flex items-center gap-4 transition hover:text-gold">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-gold">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <span className="font-display text-lg font-semibold">{phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-4 transition hover:text-gold">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-gold">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="break-all font-medium">{email}</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
