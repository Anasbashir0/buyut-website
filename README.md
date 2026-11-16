# Buyut Integrated Services website

React + Vite + Tailwind CSS v4 + React Router + Framer Motion + Lucide.
Content is taken from the Buyut Company Profile booklet.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into /dist
npm run preview    # serve the production build locally
```

The contact form posts to `/api/contact`, a Cloudflare Pages Function. It does not
exist under plain `npm run dev`, so the form shows an honest error locally.
To test it end to end:

```bash
npm run build
npx wrangler pages dev dist --binding RESEND_API_KEY=... CONTACT_TO=... CONTACT_FROM=...
```

## Where to edit content

| What | File |
| --- | --- |
| Contact details, RC number, tagline, hero text, social links | `src/data/company.js` |
| Services and further business lines | `src/data/services.js` |
| Projects and project photos | `src/data/projects.js` |
| About text, messages, team, process, QA, HSE, CSR, values | `src/data/content.js` |
| Brand colours and fonts | `src/index.css` (`@theme`) |

Photographs live in `public/images/`. They are WebP, already optimised.
To add a project: copy an entry in `projects.js`, add its photos to `public/images/projects/`.

## Contact form setup (Resend)

1. Create an account at resend.com and verify the company's sending domain.
2. Create an API key.
3. In Cloudflare: Pages project > Settings > Variables and Secrets. Add:
   - `RESEND_API_KEY` (as a secret)
   - `CONTACT_TO` (inbox that receives enquiries)
   - `CONTACT_FROM` (e.g. `Buyut Website <enquiries@yourdomain.com>`)
4. Redeploy. The key stays on the server and is never in the frontend code.

## Deploy: GitHub + Cloudflare Pages

1. Create an empty repository on GitHub.
2. In the project folder:
   ```bash
   git init
   git add .
   git commit -m "Buyut website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
   git push -u origin main
   ```
3. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git.
4. Select the repository and set:
   - Framework preset: **Vite** (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy. Add the three variables above, then redeploy.
6. Add the custom domain under Custom domains.

Direct URLs and page refreshes work because Cloudflare Pages serves `index.html`
for unknown paths when the project has no `404.html`. Do not add one.

## Before publication

- Replace `https://www.example.com` in `index.html` and `src/data/company.js` with the real domain.
- Add a 1200x630 social-sharing image at `public/og-image.png` and point `og:image` at it
  (in `index.html` and `src/components/SEO.jsx`).
- Replace the Google Maps search embed in `company.js` with an exact pin
  (Google Maps > Share > Embed a map).
- Add social media URLs in `company.js` (links appear automatically).
- Resolve the open questions listed in the chat (parent company wording, phone number,
  Admiralty Estate status and photos, hero imagery).
