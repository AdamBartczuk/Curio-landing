# Curio Landing Page — Spec

**Status:** built — conversion & rhythm pass applied after first review
**Branch:** `feature/astro-rebuild-tokyo`
**Last updated:** 2026-08-14
**Brand source:** `Curio_SSS_13_07.pdf` (Style Guide, 18pp, 2026)

---

## 1. Goal

One job: **collect early-access email signups.** Everything on the page either
builds enough interest to earn an email, or it is cut.

Secondary: introduce the brand, and be findable in search — which the current
page is not.

## 2. Positioning (decided 2026-08-14)

Curio is a **global audio guide app**, launching first in **Tokyo for cherry
blossom season, spring 2027**.

The headline promise is the **single point**, not the planned tour:

> You are walking. You see something — a monument, a bridge, a doorway.
> You tap it. You hear a two-minute story. Then you carry on.

Planned journeys still exist in the product, but they are the *second* thing we
say, not the first. Every competitor sells curated tours; the zero-commitment
single point is what makes Curio different.

Timing: "early 2027", with Tokyo tied to sakura (bloom typically opens
~20–25 March, peaks late March–early April). **The page must be live and
indexed well before then** — Japan spring trips are planned 6–9 months ahead,
so hanami search traffic ramps from September 2026 through January 2027.

### 2.1 Never sell this as AI (hard rule)

Adam's instruction, 2026-08-14: B2C travellers do not value "AI-powered" — for
many it *lowers* perceived value. **The page must never use "AI", "AI-powered",
"generated", "LLM", "machine learning", or equivalents as a selling point.**

The brand book already supplies the answer, so this is not a workaround — it is
the actual brand position. It says stories are **"written by locals"** and the
mission is **"locally-sourced audio storytelling"**. So the page sells:

> Stories from people who live there.

Human, local, opinionated — the exact opposite of a generated feed. Whatever
technology sits behind the product is an implementation detail the visitor does
not need. This also aligns with the tone of voice (§5.0): a friend who knows the
city, not a system.

Corollary for the Higgsfield work in §8: if video/image narration ships later,
it is described by what the traveller gets, never by the tool that made it.

## 3. Problems with the current page (analysis 2026-08-14)

Carried here so the reasons for each change are not lost.

**Content**
1. The single-point use case — the actual differentiator — is nowhere on the page.
2. The Cracow audio teaser is the strongest asset and is buried at the bottom of
   a rotated photo card; easy to miss entirely on mobile.
3. Free/Premium pricing tiers ask for a purchase decision before the visitor has
   experienced anything. Hurts signups.
4. Testimonial "Anna K., early tester, Berlin" uses a `pravatar.cc` stock avatar.
   Fabricated reviews are prohibited under the EU Omnibus Directive, and the
   audience is European travellers. Must go.
5. Nine launch cities (Amsterdam → Tokyo → New York) pre-launch reads as
   aspirational and damages credibility.
6. Self-contradiction: a "Mindfulness — feel the atmosphere" card sits beside
   "Gamification — badges, quests, +50 XP". Opposite promises.
7. Feature names are internal roadmap labels (Personalization, Gamification,
   Mindfulness), not traveller language.
8. The one real incentive ("free premium weekend") is buried mid-page, far from
   either email field.
9. Missing: FAQ, cost expectations, story length, languages, who is behind it.
   Privacy / Terms / Contact are all dead `href="#"` links.

**Technical**
10. `curio.guide` serves an empty `<div id="root">`. Google can render JS, but
    Bing, social scrapers, SEO tools and AI crawlers largely do not. On a new
    domain with no authority this is the difference between existing and not.
11. Tailwind loaded from `cdn.tailwindcss.com` — explicitly not for production.
12. React loaded at runtime from `esm.sh` via importmap in `index.html`.
13. `og:image` points at an Unsplash stock photo, not brand artwork.
14. Favicon points at `/vite.svg`, which does not exist in `public/`.
15. No conversion tracking on form submit — the only KPI is unmeasured.
16. To verify: RLS on the Supabase `waitlist` table should be insert-only.

## 4. Page structure

| # | Section | Purpose |
|---|---------|---------|
| 1 | Header | Logo, "Tokyo · spring 2027" marker, CTA → waitlist |
| 2 | Hero | Single-point promise + **prominent audio sample** + email form |
| 3 | The moment | Narrates the single-point use case concretely. Carries the differentiator. **New section.** |
| 4 | Two ways to use it | (a) Tap a single point, zero plan. (b) Follow a journey when you want more. Resolves spontaneous-vs-planned without muddling the hero. |
| 5 | Why Curio | 4 benefits in traveller language (down from 6) |
| 6 | Tokyo first | Sakura 2027, why Tokyo, what launch includes |
| 6.5 | Mid CTA band | One calm anchor-CTA after Tokyo (peak persuasion) — closes the hero-to-waitlist gap without a third form |
| 7 | Your city next | Global ambition preserved as a **vote**, not a claim. Doubles as signup reason + market data. |
| 8 | FAQ | Real SEO surface; answers cost, story length, languages, offline, who's behind it. Single source: `src/data/faq.ts` (section + JSON-LD). |
| 9 | Waitlist | Primary CTA with the incentive attached to the form |
| 10 | Footer | Working Privacy / Terms / Contact |

**Conversion rules (added after 2026-08-14 review):**
- The hero email form must sit fully above the fold at 1280×720 — form
  directly after the sub-paragraph, chips demoted below it.
- When the hero audio sample ends, the caption becomes a signup nudge.
- Section headlines: the stacked two-line black/terracotta split is reserved
  for the big beats (hero, Moment, Tokyo). Quiet sections use a kicker chip +
  single-line headline, so the device stays special.

**Cut:** Free/Premium pricing tiers (→ one honest line in FAQ). Fabricated
testimonial (→ founder note or live signup counter). Nine-city list (→ §7 vote).

**Reframe:** Gamification is either dropped or moved well away from the
mindfulness message — never adjacent.

## 5. Copy

### 5.0 Tone of voice (from brand book p.04)

**Surprising · Personal · Opinionated.**

> Curio adopts the persona of a well-travelled, curious friend rather than a
> formal expert or a flag-bearing guide.

Practical rules for this page:
- Write like a friend who knows the city, not like a brochure or a system.
- Have opinions. "Skip the queue at the main gate, the side entrance is better"
  beats "explore a range of attractions."
- Second person, short sentences, contractions allowed.
- Never "AI" (§2.1). Never "seamless", "leverage", "solutions", "curated
  experiences", "unlock the power of".

Brand lines already in use (brand book pp.15–17) — reuse, don't reinvent:
`Get curious, get lost on purpose.` (official tagline, on the Facebook cover) ·
`Every place gets a story.` · `Listen and explore.` · `The digital way to feel
culture.`

`Explore mode` is the brand book's own name (p.03) for wandering freely without
a route — i.e. the single-point behaviour. **Use that term**, don't invent one.

**Hero**
- Badge: `Launching in Tokyo · cherry blossom 2027`
- H1: `See something? Hear its story.`
- Sub: `Curio is an audio guide for people without a plan. Tap whatever is in
  front of you and hear a two-minute story about it — written by someone who
  actually lives there. No itinerary, no research, no phone in your face.`
- Chips: `Audio-first` · `No plan needed` · `Works offline`
- CTA: `Get early access`

`Get curious, get lost on purpose.` is the official tagline and is retained —
but as the brand line (header / sticker / footer), not as the H1. The H1 must
explain the product to someone who has never heard of Curio.

**Who writes the stories** — a short section, and the answer to §2.1

> Every story is written by someone who lives in the city. Not scraped from a
> guidebook, not the same five facts you'd find in a search result. The person
> who tells you about the bar on the corner has probably been thrown out of it.

**Why Curio** — benefit 5, replacing nothing, added after the brand book:
- `Written by locals` — real people, real opinions, from the city itself

**The moment**
> You are somewhere in Tokyo without a plan. A gate at the end of a side street.
> A tree everyone is photographing. A building that looks older than the rest.
>
> Normally you shrug and walk past. Or you stop, type a guess into a search box,
> and read three paragraphs of the wrong thing.
>
> With Curio you tap it, and someone tells you.

**Why Curio** (4, in traveller language)
- `Made for wandering` — no route to follow, no schedule to keep up with
- `Ears, not eyes` — put the phone in your pocket and actually look at the city
- `Follows what you like` — architecture, food, dark history, or just the vibe
- `Works with no signal` — download before you go out, roam nothing

**Tokyo / sakura** — to be written once launch scope is confirmed.

## 5.5 Design system (from brand book)

The shipped site is **entirely off-brand** — forest green `#005C45` / orange
`#FF5C35` / yellow `#FDBF11`, Bricolage Grotesque + Inter. None of that survives.
This is a full recolour and retype, not a tweak.

**Palette** (brand book p.08 — these four, no others)

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FEF0E3` | Default page background |
| `terracotta` | `#CA5137` | Primary — CTAs, logo, accents, dark-on-light headings |
| `sand` | `#EAB894` | Secondary — chips, fills, quiet surfaces |
| `espresso` | `#351D06` | Body text on cream; background for dark sections |

Contrast: `espresso` on `cream` and `cream` on `terracotta` both pass WCAG AA.
**`sand` on `cream` fails** — never use it for text, fills and borders only.

**Type** (p.10–11) — both Google Fonts, so self-host via `@fontsource`
- Headings: **Montserrat Bold** (also the logo font)
- Subheadings: **Hind Medium**
- Body: **Hind Regular**

**Visual language** (pp.12–18)
- **Pill/capsule everything** — the guide's dominant shape. Buttons, chips, nav,
  list rows, all fully rounded. Pills often paired with a circular arrow button.
- **Floating labels** — small pills like `AUDIO ✳` `GPS ⌕` `EXPLORE`
  `DOWNLOAD ↓` scattered over images. This is the most recognisable device in the
  whole guide and should drive the hero.
- **Oversized headline type**, tight tracking, set very large.
- **Logo-mark tile pattern** (p.12) — a section background, used sparingly.
- **Warm photography** — golden-hour street scenes, headphones, motion blur,
  graded warm. Replaces the current cool Unsplash shot.
- **Rounded-rectangle cards** with generous radius; soft, not heavy shadows.

**Modern / light / interactive** (Adam's brief) — how that maps here:
- Light: `cream` is the default; `espresso` sections are punctuation, not the norm.
- Bold: headline type set genuinely large; full-bleed `terracotta` blocks.
- Interactive: the floating pills respond to pointer/scroll, the audio player is
  the centrepiece, and the "your city next" vote is a real input.
- Motion respects `prefers-reduced-motion`. The current build animates
  constantly — parallax on scroll listeners, infinite spin, bounce, pulse — which
  reads as busy rather than modern, and costs performance. Fewer, better moves.

## 5.6 Interactive layer — explore it like a city (decided 2026-08-14)

Adam's brief after the first build: take the page to a different level
visually — more interactive, more modern, "so people explore it like a city".
Confirmed scope: the full experience, map as stylized SVG (no photo maps).

**a) Interactive Tokyo map — "The moment" becomes the demo.**
*(Revised 2026-08-16: the first build used a stylized SVG neighbourhood; Adam
found it too abstract — "doesn't look like Tokyo" — and supplied a Mapbox
public token. It's now a real map.)*
A **Mapbox GL** map of **Yanaka** (Tokyo's old quarter — sakura, temples,
streets that survived 1945), Standard style with the **dusk** light preset to
match the golden-hour brand photography, plus a dashed terracotta highlight
around the district (approximate polygon; swap in precise GeoJSON if
provided).

*Real stops, popups, demo position (2026-08-16, second pass).* The five
archetypal stops became **five real Yanaka landmarks** — three well-known
(Nezu Shrine, Yanaka Ginza, Yanaka Cemetery) and two quiet (Asakura Museum,
Daimyo Clock Museum). **Naming a real place changes the copy rules**: the
invented anecdotes that were fine for "the corner izakaya" are not fine here,
so every teaser is built from sourced facts and ASSETS.md records which
source backs which claim. The dashed district outline is gone.

Clicking a pin opens the story **in a Mapbox popup at the pin** on desktop —
the map is the stage, the left panel keeps only the headline and intro.
Below `lg` the same card renders into an in-flow slot under the copy instead:
a ~230px popup cannot fit above a pin inside a 400px-tall phone map, and
Mapbox flips it off the map edge. Cards are server-rendered in an `sr-only`
block and **cloned** into popup or slot, so the text stays crawlable and the
original is never consumed. `closeOnClick` must stay `false` — the marker
click bubbles to the map and would otherwise close the popup with the very
click that opened it. Desktop auto-opens the first stop (not gated on
`idle`, which is unreliable in embedded webviews); touch starts clean.

Each card carries an **inert audio bar** labelled "Narration arrives with
launch" — deliberately not a play button that does nothing. Swap for the real
`AudioPlayer` island when clips exist.

A **hypothetical position** marker sits between the stops with a radar sweep
every 5s suggesting POI range. It is hard-coded and labelled "You are here —
example": the page never requests geolocation, and must not imply it does.

Map **attribution cannot be removed** (Mapbox ToS + OSM ODbL). It is set to
`compact` and inset 22px so the card's rounded corner can't clip it — that
clipping was the original complaint, not the attribution itself.

*Pin design and framing (2026-08-16).* A pin is a **rounded-square photo**
(54px, cream frame, small point beneath) with the stop's **name on a pill
above it** — the photo is the "what's there", which is the product in one
object. Active pin takes a terracotta frame and label. All five labels show
from `lg`; below that only the open pin is labelled, or a phone-width map
becomes unreadable. Markers anchor `bottom` so the point sits on the
coordinate. Both breakpoints **fit the pin cluster** (`fitBounds` with
asymmetric padding — heavy on the left to clear the overlay panel) rather
than trusting a fixed centre/zoom, which clipped the eastern pins. The card
is capped at `min(80vh,780px)` so the section never exceeds the viewport, the
container is `max-w-7xl` (wider than the rest of the page — at `6xl` the map
lost most of its width to gutters and nested padding), and on short desktop
windows the intro paragraph is dropped so the story card is never the thing
that scrolls out of sight. Pin photos are CC placeholders — see ASSETS.md
(STOP-01…05); the line under the map discloses this.

*Curation and palette (added 2026-08-16).* The stock basemap labels every
convenience store, bank and school — noise that contradicts "someone chose
this for you". All default POI, transit and road labels are off; in their
place a **curated landmark layer** (from `mapbox.mapbox-streets-v8`
`poi_label`) shows only temples, shrines, gardens, parks, museums and
historic sites, in sand with a small dot. Neighbourhood names stay for
orientation. Deliberately **not** filtered by Mapbox's `filterrank` — in
Yanaka the good places are small and rank 3–5, so a strict rank cut removes
exactly what we came for; `class` does the filtering, with
`arts_and_entertainment` narrowed by `maki` so cinemas and nightlife stay
out. The basemap is repainted in brand tones via the Standard style's
`color*` config properties.

*Palette — "cream daylight" (decided 2026-08-16).* Adam rejected the dusk
look as non-monochromatic (grey landuse patches, harsh dark-block /
light-street contrast) and asked for tonal shades plus genuinely green
parks. A four-variant lab of real GL renders established that **the dusk
light preset's cool ambient crushes warm tones to purple-grey — warm
palettes need `lightPreset: "day"`**. Adam picked the light variant: the
page's own cream as ground, streets barely a shade lighter, sand motorways,
soft green `colorGreenspace` (parks matter to sightseers), espresso place
labels, and **terracotta spent only on the story pins and district line** —
so the pins are the loudest thing on the map. All four landuse tints
(commercial/education/medical/industrial) are pinned to the ground family;
unset they render as the grey patches Adam flagged.

Values in `CityWalk.astro` are the exact approved lab inputs — the style
tone-maps them zoom-dependently, so change them as a set against a live
render, never individually by eye. Two page-level adaptations the lab
couldn't show: the pin pulse ring is terracotta (a cream ring is invisible
on a cream ground, and the pulse is the "tap me" affordance), and the
floating `Explore` chip is espresso rather than sand, for contrast. Copy + the story card sit in a frosted espresso panel **overlaid
left**; the five pins (gate, sakura tree, old building, corner izakaya,
bridge) are geo-anchored markers **on the right**. Tap a pin → teaser card in
brand voice with a `2 min listen` chip and a waitlist link; the map eases to
the pin. Calm rules: no scroll-zoom, no rotate, cooperative gestures on
touch; GL lazy-loads near the viewport (its ~520KB gzip chunk never blocks
first paint) over a Static-Images-API frame that also serves no-JS visitors.
The token is a Mapbox *public* token (client-side by design) — **restrict it
to curio.guide + localhost in the Mapbox dashboard**. Pins remain real
`<button>`s (keyboard + `aria-expanded`), teaser text stays server-rendered,
cards are labelled sample stops, **no fake audio** — the only real clip stays
in the hero. `curio:pin-opened` mirrors the existing analytics pattern.

**b) Walking-path spine.** A dotted SVG path weaves down the left margin
(desktop only), drawing itself as you scroll via CSS scroll-driven animations
(`animation-timeline`), with numbered stop pills at each section. No JS; no
support or reduced motion → static dotted path, still a design element.

**c) Distance meter.** Header shows `TOKYO · 0.0 KM WALKED` mapping scroll
progress to ~1.8 km (desktop); mobile gets a thin dotted progress bar under
the header bar. Footer easter egg at page end.

**d) Motion layer.** Hero pointer parallax on floating chips + image
(desktop, `hover:hover` only), richer staggered reveals, card hover lift,
button arrow nudge. All CSS-first, all under the global
`prefers-reduced-motion` kill switch.

**Guardrails:** no scroll-jacking, no new dependencies or React islands, no
layout shift (SVGs get explicit dimensions), every interaction reachable by
keyboard, page fully usable with JS disabled (cards render open-less, path
static, meter absent).

## 6. Technical plan

**Stack:** Astro with React islands.

- Astro renders real static HTML — every word above becomes indexable, which is
  the core fix.
- Existing React components port over; only the audio player and waitlist form
  hydrate as JS (`client:visible` / `client:load`).
- Tailwind as a real build dependency, not the CDN script.
- Fonts self-hosted or properly preloaded; no runtime `esm.sh`.
- Existing GitHub Pages workflow kept; build output path adjusted.

**SEO**
- ~800–1200 words of genuine content in the static HTML.
- `FAQPage` JSON-LD on the FAQ, alongside the existing `MobileApplication`.
- Self-hosted, branded `og:image`.
- Real favicon.
- Sets up `curio.guide/tokyo` as a future city page — that is where search
  traffic for "Tokyo audio guide" / "self-guided hanami" would land.

**Analytics**
- Conversion event fired on waitlist submit. Currently unmeasured.

**Audio**
- Player built as a prominent, first-class hero element with a **swappable
  source**. Ships with the existing Cracow clip as placeholder; Adam supplies a
  Tokyo/sakura MP3 to replace it.

## 7. Open items

- [x] ~~Branding PDF~~ — received 2026-08-14, applied in §5.5.
- [x] ~~og:image~~ — generated brand card at `public/media/og.png`
      (2026-08-14). Regenerate when the real logo mark lands.
- [x] ~~Old React prototype in repo~~ — deleted 2026-08-14 (history keeps it).
- [ ] **Logo asset** — need the Curio mark as SVG (brand book has it as artwork
      only). Blocks the header, favicon and the p.12 tile pattern.
- [ ] Tokyo/sakura hero audio clip from Adam. Until then the Kraków clip is
      labelled "early sample" (never "placeholder" — visitors see it).
- [x] ~~VID-01~~ — retired 2026-08-14: the Moment section became the
      interactive city map (§5.6a); no video needed there anymore.
- [ ] Brand photography — warm street/headphone shots per the p.18 moodboard.
      Placeholder Unsplash until then, but it must be replaced before launch.
- [ ] Privacy and Terms page content — currently dead links.
- [ ] Confirm Supabase `waitlist` RLS is insert-only.
- [ ] Confirm the early-access incentive wording ("free premium weekend"?).
- [ ] Known local quirk: a stale dev server may hold port 4321; Astro then
      picks the next free port. Kill old `node` listeners before demoing.

## 8. Out of scope (next step, not now)

- Higgsfield integration for video / image-driven narration. Noted as direction;
  the static page ships first and must not be architected around it.
- City pages beyond the Tokyo stub.
- Japanese-language version.
