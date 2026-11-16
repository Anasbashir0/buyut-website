import { Mail, MapPin, Phone } from "lucide-react";
import SEO from "../components/SEO.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import { company } from "../data/company.js";
import { telHref } from "../utils/format.js";

export default function Contact() {
  const { phone, email, address, mapEmbedUrl } = company.contact;

  const details = [
    { Icon: Phone, label: "Phone", content: <a href={telHref(phone)} className="transition hover:text-rust">{phone}</a> },
    { Icon: Mail, label: "Email", content: <a href={`mailto:${email}`} className="break-all transition hover:text-rust">{email}</a> },
    { Icon: MapPin, label: "Head office", content: <span>{address}</span> },
  ];

  return (
    <>
      <SEO
        title="Contact"
        description={`Contact ${company.name} in Garki 2, Abuja to request a quote or make a business enquiry.`}
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Let's discuss your project"
        text="Send an enquiry and the Buyut team will respond. You can also call or email us directly."
        trail={[{ label: "Contact" }]}
        image="/images/hero-skyline.webp"
      />

      <section className="section-pad bg-cream">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">Contact details</h2>
            <ul className="mt-8 space-y-7">
              {details.map(({ Icon, label, content }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold to-orange text-ink">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">{label}</p>
                    <div className="mt-1.5 leading-snug">{content}</div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-charcoal/10 pt-6 text-sm text-charcoal/60">
              {company.legalName}, RC {company.rcNumber.replace("RC", "")}. A subsidiary of {company.parent}.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {mapEmbedUrl && (
        <section className="h-[380px] w-full sm:h-[460px]" aria-label="Office location">
          <iframe
            title={`Map showing the ${company.name} head office in Garki 2, Abuja`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </section>
      )}
    </>
  );
}
