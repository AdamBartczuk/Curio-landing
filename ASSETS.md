# Curio Landing Page — Asset Brief

**Status (2026-08-14):** IMG-01, IMG-02, IMG-03, IMG-04 are done — real
generated photos, converted to WebP, wired into their components at
`public/media/`. `IMG-02`/`IMG-03` used the non-identifying brief (hands,
notebook, back view), not posed faces. `VID-01` is superseded (the section
became the interactive map). `IMG-OG` has a generated interim card at
`public/media/og.png` — redo per the Figma brief when the logo lands. Still
outstanding: the real logo SVG and a genuine Tokyo audio sample.

Every visual placeholder on the page carries an id (`IMG-01`, `VID-01`…). Find
the id in the rendered page or in the component source, then use the matching
brief below.

**How to swap one in**
1. Export at the stated size, compress, and save to `public/media/<filename>`.
2. In the component, replace `<MediaPlaceholder … />` with a real `<img>` or
   `<video>` (keep the same wrapper classes so layout doesn't move).
3. Rebuild — `npm run build`.

**House style for everything below.** Warm golden-hour light. Terracotta,
cream, sand and deep brown dominant — the images must sit inside the brand
palette (`#CA5137` / `#FEF0E3` / `#EAB894` / `#351D06`), not fight it. Candid
and unposed, never stock-photo cheerful. Shallow depth of field. Slight film
grain. Nobody looking at the camera. **Nobody staring at a phone screen** —
that's the behaviour the product exists to prevent, so it must never be the
hero image.

---

## ⚠️ Read this before generating the portraits

`IMG-02` and `IMG-03` are captioned as **local writers who work on Curio**.
Generating synthetic faces and presenting them as real contributors is the same
mistake as the invented "Anna K." testimonial on the current site — and in the
EU, presenting fabricated people as real endorsers falls foul of the Omnibus
Directive. It also directly undercuts the "written by locals" claim that the
whole section rests on.

Pick one:
- **Best:** photograph real contributors once you have them, and credit them.
- **Safe now:** use the alternate non-identifying brief given under IMG-02/03 —
  hands, notebooks, streets, backs of heads. No fabricated faces presented as
  real people.

Everything else in this document is fine to generate.

---

## IMG-01 — Hero
`src/components/Hero.astro` · 4:5 portrait · export 1200×1500 · WebP

> Candid documentary photograph of a young traveller walking through a narrow
> Tokyo backstreet in late afternoon golden light. Over-ear headphones on,
> mid-stride, head turned upward and to the side looking at something above the
> frame — curious, caught mid-thought. Hands empty, no phone visible. Warm
> terracotta and cream tones, low evening sun raking across the buildings,
> long soft shadows. Shallow depth of field, background gently blurred.
> 35mm lens, natural colour grade leaning warm amber. Subtle film grain.
> Vertical 4:5 composition with the subject slightly right of centre and clean
> negative space upper left.

Negative: `phone in hand, looking at screen, direct eye contact, smiling at
camera, stock photo, tourist map, selfie, harsh midday light, cool blue tones,
neon cyberpunk, text, watermark, logos`

Why this shot: it is the single-point moment — noticing something, not
navigating to it. The upward glance is the whole product in one gesture.

---

## IMG-02 / IMG-03 — Local storytellers
`src/components/LocalVoices.astro` · 3:4 portrait · export 900×1200 · WebP

**Use the non-identifying version unless you have real contributors** (see
warning above).

**IMG-02 — non-identifying**
> Warm documentary detail shot: a person's hands writing in a worn notebook at
> an outdoor café table in a Tokyo residential neighbourhood, late golden-hour
> light. Coffee cup, scattered paper. Face out of frame entirely. Terracotta
> and cream tones, shallow depth of field, 50mm, natural warm grade, soft film
> grain. Vertical 3:4.

**IMG-03 — non-identifying**
> Warm documentary shot from behind: a resident walking their own quiet
> residential street at dusk, seen from the back, greeting a neighbour out of
> focus ahead. Shopfronts and low buildings, lanterns just coming on. No faces
> legible. Terracotta and amber tones, 35mm, shallow depth of field, film
> grain. Vertical 3:4.

**If you have real contributors instead:** natural light, in their own
neighbourhood, unposed, mid-conversation, 3:4, warm grade to match. Get written
permission to use their likeness and name.

Negative (both): `studio lighting, corporate headshot, white background,
posed smile, stock photo, watermark, text`

---

## IMG-04 — Tokyo sakura
`src/components/TokyoFirst.astro` · 1:1 square · export 1200×1200 · WebP

> Cherry blossom branches arching over a narrow Tokyo canal at dusk, petals
> catching the last warm light. A few people walking the path beneath, small in
> frame, unposed and slightly motion-blurred. Not a famous landmark — an
> ordinary residential stretch that happens to be beautiful. Warm amber and
> soft pink against deep brown water and shadow. Golden hour, backlit blossom,
> shallow depth of field on the foreground branch. 50mm, natural warm colour
> grade, gentle film grain. Square 1:1.

Negative: `crowds, tour group, Mount Fuji, temple postcard shot, oversaturated
pink, HDR, daytime harsh light, tripods, festival stalls, text, watermark`

Why not a famous park: the copy explicitly says "the good spots are never the
ones on the list." A postcard shot of Ueno would contradict the sentence beside
it.

---

## VID-01 — Explore-mode loop — **SUPERSEDED 2026-08-14**

The Moment section became the interactive city map (`CityWalk.astro`,
SPEC §5.6a); no video slot exists on the page anymore. Brief kept below in
case the loop returns for social/ads.

`src/components/TheMoment.astro` (removed) · 4:5 portrait · 5–8s seamless loop
Export: MP4 (H.264) **and** WebM · target under 2 MB · muted, autoplay, loop,
`playsinline`, with a poster frame

> POV walking shot moving slowly down a narrow Tokyo alley at blue hour. Paper
> lanterns and shopfront glow either side. The camera drifts to the right and
> holds briefly on an old wooden gate half-hidden between two buildings — as if
> the walker noticed it — then continues forward. Handheld, gentle natural
> sway. Warm amber highlights against deep brown shadow. Cinematic, shallow
> depth of field, subtle film grain. No people in the foreground. Vertical 4:5.

Negative: `fast motion, whip pan, drone shot, timelapse, crowds, neon
cyberpunk, text overlay, watermark, camera shake`

Ship it muted with a poster image, and don't autoplay if
`prefers-reduced-motion` is set — the placeholder markup already reserves the
right aspect ratio so nothing shifts when it loads.

---

## IMG-OG — Social share card
`src/layouts/Base.astro` (`/media/og-placeholder.png`) · 1200×630 · PNG

Not a generated photo — lay this out in Figma:
- Cream `#FEF0E3` background
- Curio logo, terracotta, upper left
- "See something? Hear its story." in Montserrat Bold, espresso
- "Audio city guide · Tokyo, spring 2027" in Hind Medium, smaller
- One IMG-01 crop bleeding off the right edge
- A terracotta `EXPLORE` pill floating over it

Text must be legible at thumbnail size — this is what shows in every WhatsApp,
Slack and LinkedIn preview, so it matters more than it looks like it should.

---

## Which models to use

Check current versions before you start — this moves fast.

### Stills

| Use | Model | Why |
|---|---|---|
| **IMG-01, IMG-04** (hero, sakura) | **Midjourney** | Still the best warm cinematic photographic look with the least prompt-wrangling. Its default aesthetic is very close to your moodboard. Needs a paid plan for commercial use. |
| **IMG-02/03** (paired shots) | **Flux (Pro)** via fal.ai or Replicate | Much better prompt adherence when you need two images to feel like the same photographer, and the API makes iteration cheap. Clean commercial licensing. |
| **Editing a shot you like** | **Google Nano Banana Pro / Imagen** | Best-in-class for "keep this image, change that one thing" — recolouring to brand, removing an object, extending a crop. |
| **Anything with legible text** | **Ideogram** | The only family that reliably renders words correctly. Only relevant if you want type inside an image. |

Practical: generate 4–8 candidates per slot, pick one, then use an editing model
to nudge the colour toward the palette. Don't try to get it perfect in one
prompt.

### Video (VID-01)

| Model | Why |
|---|---|
| **Google Veo** | Best overall motion realism and prompt adherence, and it generates native audio (irrelevant here — ship it muted — but useful for social). First choice. |
| **Runway Gen-4** | Best explicit camera-move control, which matters for "drift right and hold". Good second option. |
| **Kling** | Strong on longer takes and natural handheld feel. Good value. |
| **Higgsfield** | You mentioned this — it's a front-end over several of the above with camera-motion presets, so it's a convenience layer rather than a separate model. Fine if you like the preset workflow; you're not getting capability you couldn't get direct. |

For a seamless loop, generate ~10s and trim to a segment where the first and
last frames nearly match, or cross-fade the last 0.5s back to the first.

### Before you ship any of it

- **Commercial rights** — confirm your plan covers commercial use. Midjourney's
  free tier does not.
- **Don't imply real people or real endorsements.** See the warning at the top.
- **Compress properly.** Squoosh or `sharp` to WebP; a hero image over ~250 KB
  will undo the performance work in the rebuild.
- **Nothing recognisably trademarked** — no brand signage, no real logos.

---

## Non-generated assets still needed

| Asset | Where | Note |
|---|---|---|
| **Curio logo, SVG** | `public/brand/curio-mark.svg` | Blocks `Logo.astro`, the favicon and the p.12 tile pattern. Currently a text wordmark. Needs to come from your designer — do not generate or trace it. |
| **Favicon** | `public/favicon.svg` | Placeholder circle. Style guide p.13 shows the four approved lockups. |
| **Tokyo audio sample** | `public/media/tokyo-sample.mp3` | Currently the Kraków teaser, labelled "early sample" in the UI. See the `TOKYO SWAP` comment in `Hero.astro`. |
