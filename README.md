# Curio — landing page

Pre-launch landing page for **Curio**, an audio city guide for people travelling without
a plan. You see something, you tap it, you hear a short story about it, written by someone
who lives there.

The page has one job: **collect early-access email signups** ahead of the Tokyo launch in
spring 2027.

Live at [curio.guide](https://curio.guide).

## Running it

Prerequisites: Node.js 18+.

```bash
cp .env.example .env   # then paste the Mapbox token in
npm install
npm run dev      # dev server, usually http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built output
```

The two external services both use public, client-safe keys:

- **Supabase** stores waitlist signups. The publishable key sits in
  `src/components/islands/WaitlistForm.tsx`; the `waitlist` table must have RLS set to
  insert-only.
- **Mapbox** renders the Yanaka map. The `pk.` token is read from
  `PUBLIC_MAPBOX_TOKEN` — set it in `.env` locally, and as a repository secret of the
  same name under Settings → Secrets and variables → Actions. It is a public token that
  ends up in the client bundle either way, so the protection that matters is a URL
  restriction to `curio.guide` and `localhost` in the Mapbox dashboard. Without the
  token the map renders blank, so the build fails on a deploy rather than shipping it
  (locally it only warns — see `scripts/check-env.mjs`).

## Deployment

Hosted on **GitHub Pages**. `.github/workflows/deploy.yml` builds every push to `main`
and publishes `dist/` as the Pages artifact. `public/CNAME` holds `curio.guide`, which is
what attaches the custom domain — deleting it would drop the domain back to
`*.github.io`.

The site is fully static: `npm run build` writes `dist/`, and that folder is the whole
deployable artifact. Nothing needs Node at runtime, so it can be served from any static
host by copying `dist/` into a web root.

## Stack

Astro 5 with React islands, Tailwind 4, Mapbox GL. Static output. Only three components
ship JavaScript (`src/components/islands/`) — everything else is server-rendered HTML, on
purpose: the previous version shipped an empty `<div id="root">` and was invisible to
every crawler that doesn't run JS.

## Where things live

| Path | What |
|---|---|
| `src/pages/index.astro` | The whole page: meta tags plus section order |
| `src/components/` | One component per section, in reading order |
| `src/components/islands/` | The only interactive parts: audio player, waitlist form, cookie banner |
| `src/data/faq.ts` | FAQ copy. Single source — the page **and** the JSON-LD both read from it |
| `src/layouts/Base.astro` | `<head>`, structured data, skip link |
| `public/media/` | Images and the audio sample |

Most copy is still inline in the components. Extracting it into a dictionary is the first
step of the planned ES/DE/PL translation work.

## Before you change the copy

Read **[SPEC.md](SPEC.md)** first. It is the source of truth for positioning, page
structure and tone of voice, and it records why things are the way they are. Two rules
that are easy to break by accident:

- **Never sell Curio as AI.** No "AI-powered", "generated", "LLM". The page sells stories
  written by people who live in the city. See SPEC §2.1.
- **No invented facts and no fabricated people.** The map pins name real Tokyo places, so
  every claim needs a source (recorded in [ASSETS.md](ASSETS.md)). Testimonials from
  people who don't exist are also illegal in the EU, which is why there aren't any.

**[ASSETS.md](ASSETS.md)** covers the image house style, licensing and attribution.
