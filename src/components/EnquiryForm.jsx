import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CircleCheck, CircleAlert, LoaderCircle, Send } from "lucide-react";
import Button from "./Button.jsx";
import { services } from "../data/services.js";

const empty = { name: "", email: "", phone: "", service: "", message: "", website: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim()))
    e.phone = "Please enter a valid phone number.";
  if (v.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  return e;
}

const fieldBase =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-gold/40";

function Field({ id, label, error, children, required }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-ember">
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm() {
  // Pre-select a service when arriving from "Enquire about this service".
  const [params] = useSearchParams();
  const wanted = params.get("service") || "";
  const [values, setValues] = useState({
    ...empty,
    service: services.some((s) => s.title === wanted) ? wanted : "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Your enquiry could not be sent. Please try again.");
      }
      setStatus("success");
      setValues(empty);
    } catch (err) {
      setServerError(err.message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-3xl border border-charcoal/10 bg-white p-8 text-center shadow-sm sm:p-12"
        role="status"
      >
        <CircleCheck className="mx-auto text-orange" size={48} aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-semibold">Enquiry sent</h3>
        <p className="mt-2 text-charcoal/70">
          Thank you. We have received your message and will respond as soon as we can.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const invalid = (n) => (errors[n] ? "border-ember" : "border-charcoal/15");
  const describe = (n) => (errors[n] ? `${n}-error` : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-3xl border border-charcoal/10 bg-white p-6 shadow-sm sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={`${fieldBase} ${invalid("name")}`}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={`${fieldBase} ${invalid("email")}`}
          />
        </Field>
        <Field id="phone" label="Phone (optional)" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={onChange}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            className={`${fieldBase} ${invalid("phone")}`}
          />
        </Field>
        <Field id="service" label="Service of interest (optional)">
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={onChange}
            className={`${fieldBase} border-charcoal/15`}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / partnership">Other / partnership</option>
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          className={`${fieldBase} ${invalid("message")}`}
        />
      </Field>

      {/* Honeypot: hidden from people, filled in by simple spam bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange}
        />
      </div>

      {status === "error" && (
        <div
          className="flex items-start gap-3 rounded-xl border border-ember/40 bg-ember/10 p-4 text-sm text-brown"
          role="alert"
        >
          <CircleAlert size={20} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending...
          </>
        ) : (
          <>
            Send enquiry <Send size={16} aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
