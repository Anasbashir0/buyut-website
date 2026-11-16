// Cloudflare Pages Function: POST /api/contact
// Sends the enquiry by email through Resend (https://resend.com).
// Secrets live in Cloudflare environment variables, never in frontend code:
//   RESEND_API_KEY  - your Resend API key
//   CONTACT_TO      - inbox that receives enquiries (the company email)
//   CONTACT_FROM    - verified sender, e.g. "Buyut Website <enquiries@yourdomain.com>"

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (clean(data.website, 200)) return json({ ok: true });

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  const service = clean(data.service, 120);
  const message = clean(data.message, 5000);

  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return json({ ok: false, error: "Please complete the required fields." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json(
      { ok: false, error: "The enquiry service is not configured yet. Please contact us directly." },
      500
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Service: ${service || "-"}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Website enquiry from ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: "We could not send your enquiry. Please try again later." }, 502);
  }
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: "Method not allowed." }, 405);
