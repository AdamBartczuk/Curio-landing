# Curio Landing Page — Spec

**Status:** draft, awaiting branding PDF
**Branch:** `feature/astro-rebuild-tokyo`
**Last updated:** 2026-08-14

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
| 7 | Your city next | Global ambition preserved as a **vote**, not a claim. Doubles as signup reason + market data. |
| 8 | FAQ | Real SEO surface; answers cost, story length, languages, offline |
| 9 | Waitlist | Primary CTA with the incentive attached to the form |
| 10 | Footer | Working Privacy / Terms / Contact |

**Cut:** Free/Premium pricing tiers (→ one honest line in FAQ). Fabricated
testimonial (→ founder note or live signup counter). Nine-city list (→ §7 vote).

**Reframe:** Gamification is either dropped or moved well away from the
mindfulness message — never adjacent.

## 5. Copy

Draft. To be revised against the branding PDF's tone of voice.

**Hero**
- Badge: `Launching in Tokyo · cherry blossom 2027`
- H1: `See something? Hear its story.`
- Sub: `Curio is an audio guide for people without a plan. Tap whatever is in
  front of you and hear a two-minute story about it. No itinerary, no research,
  no phone in your face.`
- Chips: `Audio-first` · `No plan needed` · `Works offline`
- CTA: `Get early access`

`Get CURIOus. Get lost on purpose.` is strong brand copy and is retained — but
as the brand line (sticker / header / footer), not as the H1. The H1 must
explain the product to someone who has never heard of Curio.

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

- [ ] **Branding PDF** — blocks all visual work (colour, type, tone). Current
      palette (`#005C45` green, `#FF5C35` orange, `#FDBF11` yellow, `#FFF9F0`
      cream) and fonts (Bricolage Grotesque / Inter) are assumed replaced.
- [ ] Tokyo/sakura hero audio clip from Adam.
- [ ] Privacy and Terms page content — currently dead links.
- [ ] Confirm Supabase `waitlist` RLS is insert-only.
- [ ] Confirm the early-access incentive wording ("free premium weekend"?).

## 8. Out of scope (next step, not now)

- Higgsfield integration for video / image-driven narration. Noted as direction;
  the static page ships first and must not be architected around it.
- City pages beyond the Tokyo stub.
- Japanese-language version.
