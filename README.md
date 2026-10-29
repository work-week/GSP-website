# GSP website

The website for Global Shipping Partners, LLC ([gspforwarding.com](https://gspforwarding.com)). SvelteKit 3, Svelte 5 and TypeScript, hosted on Cloudflare Pages. It replaces the Webflow plan. Project background lives in the knowledge base, [`work-week/GSP`](https://github.com/work-week/GSP).

Four pages: Home (`/`), About, Resources and Contact. The pages are server-rendered and work without JavaScript; only the form's Turnstile check needs it.

## Develop

```sh
npm install
npm run dev
```

`npm run check` typechecks. `npm run build`, then `npm run preview`, runs the production build locally on the Cloudflare runtime.

## Deploy (Cloudflare Pages, Git integration)

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → `work-week/GSP-website`.

- Framework preset: SvelteKit. Build command: `npm run build`. Output directory: `.svelte-kit/cloudflare`.
- Production branch: `main`. Every other branch gets a preview URL automatically.

### Environment variables (Settings → Variables and Secrets)

| Name | What it is |
| --- | --- |
| `TURNSTILE_SITE_KEY` | Turnstile widget site key (Cloudflare → Turnstile → add the site's hostnames) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (store it as a secret) |
| `RESEND_API_KEY` | Resend API key for sending form messages (secret) |
| `CONTACT_TO` | Inbox(es) that receive form messages, comma-separated |
| `CONTACT_FROM` | Sender on a domain verified in Resend, e.g. `GSP website <website@gspforwarding.com>` |

Without the Turnstile keys, the site falls back to Cloudflare's test keys, which let every submission through. That's fine for a preview but **not for production**. Without the Resend settings, the form shows "please call us instead" and sends nothing.

## Before launch

- Move the company profile PDF from the old WordPress site into `static/resources/` and update the link in `src/routes/resources/+page.svelte`.
- The container spec PDF has three figures flagged as likely wrong (see the knowledge base, `research/2026-10-21-discovery-questionnaire.md`).
- Confirm the licence of the hero photo (`src/lib/assets/hero-port.jpg`).
- Old WordPress URLs return 301 redirects in `src/hooks.server.ts`. Redirect `www` and `http` to `https://gspforwarding.com` with a Cloudflare redirect rule once DNS is on Cloudflare.
