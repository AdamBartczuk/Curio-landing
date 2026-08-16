# What this page actually collects

**Working document, not a privacy policy.** This is the factual input you feed to a
policy generator (or a lawyer). Written 2026-08-16 by reading the code, so it
describes what the page really does rather than what we assume it does.

**Keep it current.** If you add a script, a form field or a third-party embed,
update this file in the same commit and check whether the published policy still
matches.

---

## 1. Data the visitor gives us

| What | Where from | Where it goes | Required? |
|---|---|---|---|
| Email address | Both waitlist forms | Supabase `waitlist` table | Yes, to sign up |
| City name (free text) | Bottom form only, "Which city next?" | Same row in `waitlist` | No, optional |

Written by `src/components/islands/WaitlistForm.tsx`, POSTed directly from the
visitor's browser to the Supabase REST endpoint. There is no server of ours in
between — the page is fully static.

**Purpose:** to email people when Curio launches, and to see which cities people
want. **Lawful basis:** consent, given by submitting the form.

**Open questions you must answer before publishing a policy:**

- **Which region is the Supabase project in?** Determines whether signup data
  leaves the EU. Check the Supabase dashboard (Project Settings → General).
- **How long do we keep it?** A waitlist for a 2027 launch will hold addresses
  for over a year. Pick a retention period and say it.
- **How does someone get deleted?** Needs to be a real, working route. The FAQ
  and footer both publish `hello@curio.guide`, so that inbox has to actually
  work and someone has to action requests.
- **Is RLS on the `waitlist` table insert-only?** Still unconfirmed (SPEC §7).
  The publishable key is in client-side code by design, so if the table allows
  reads, every signup email is publicly readable. **Check this first — it is the
  highest-risk item on this page.**

## 2. Cookies and tracking

| What | Set by | Consent needed | Notes |
|---|---|---|---|
| `cookie_consent` | Us, in `localStorage` | No | Strictly necessary: remembers the banner choice |
| Google Analytics 4 (`G-9RYF5SY0XP`) | Google | **Yes** | Only loads after "Fine by me" |

`src/components/islands/CookieBanner.tsx` handles this, and the implementation is
correct: nothing analytics-related loads until consent, and declining genuinely
prevents the script from loading. That is the part most sites get wrong.

Custom GA events sent: `waitlist_signup`, `sample_played`, `pin_opened`. No
personal data is attached to them, but GA itself sets its own cookies and
processes IP addresses.

For the policy: Google is a processor, data may be processed in the US, and
Google self-certifies under the EU–US Data Privacy Framework. Name Google
explicitly and link their privacy terms.

## 3. Third parties the browser contacts

| Host | Why | Consent-gated? | Sees the visitor's IP |
|---|---|---|---|
| `api.mapbox.com` | Map tiles + Mapbox GL for the Yanaka demo | **No** | Yes |
| `*.supabase.co` | Hero audio file, and the signup POST | **No** | Yes |
| `googletagmanager.com` | Google Analytics | Yes | Yes |

Fonts are self-hosted via `@fontsource`, so there is **no** call to Google Fonts.
That is a common GDPR trap and this page avoids it — worth keeping that way.

### ⚠️ One genuine gap: Mapbox loads before consent

The map is the page's centrepiece, and it starts loading without asking. That
sends the visitor's IP address to Mapbox before they have agreed to anything.

Sites usually justify map loading as "necessary to provide the service the user
asked for". That argument is weaker here, because our map is a **demo on a
marketing page**, not a service the visitor requested.

Three options, in order of how much I'd recommend them:

1. **Disclose it and move on.** Name Mapbox in the privacy policy as a third
   party that receives IP addresses for the map. Lowest effort, and proportionate
   for a pre-launch page. Most small sites do this.
2. **Click-to-load.** Show the static map image (already implemented as the
   pre-boot fallback) and only initialise Mapbox GL when the visitor interacts.
   Strictly cleaner, and would also cut ~520KB gzip off the initial load.
3. **Add it to the consent banner.** Most correct, worst experience: the
   centrepiece of the page would be blank until someone accepts.

## 4. What we do NOT do

Worth stating plainly in the policy, because it's true and it's reassuring:

- **No geolocation, ever.** The "you are here" dot on the map is hard-coded and
  labelled as an example. The page never calls the Geolocation API.
- No accounts, no passwords, no payments.
- No advertising or marketing cookies, no cross-site tracking, no data sold.
- No user-generated content, no uploads.
- No profiling or automated decision-making.

---

## Recommended route

**Use a generator, not a lawyer — for now.** For a static page collecting an
email and running consent-gated analytics, a good generator plus the inventory
above is proportionate. Get a lawyer involved when the actual app ships, because
that's where the risk is: location data, audio, accounts and payments.

**Do not publish an AI-written policy as-is.** Not because the prose is bad, but
because the failure mode is invisible. It produces a fluent document describing a
generic app, and you cannot tell by reading it which parts don't match reality.
A policy that misdescribes your data flows is worse than a short honest one: it
is a false statement to your users and to a regulator. Using AI or a generator to
*draft* from the inventory above, then checking every claim against this file, is
fine.

Generators worth looking at, EU-focused first:

| Tool | Cost | Notes |
|---|---|---|
| **Iubenda** | ~€29/yr | Italian, built around GDPR/ePrivacy. Strongest fit for an EU audience. |
| **Termly** | Free tier | Decent GDPR templates, US-origin. |
| **GetTerms** | ~$50 one-off | Simple and cheap. |
| **CNIL / ICO guidance** | Free | The French and UK regulators publish plain-language guidance. Authoritative, generic. |

Whichever you pick, the questions it asks are the ones this file already answers.

## On the Terms page

`Footer.astro` links to `/terms`, which does not exist.

**Consider dropping that link rather than writing the page.** Terms of service
govern a service. This page doesn't provide one — it takes an email address. The
things terms would normally cover (acceptable use, liability, account
termination, payment) have nothing to attach to yet. A Terms link here is cargo
cult, and an empty or boilerplate one is worse than none.

Privacy policy: genuinely required. Contact: already there. Terms: write it when
the app exists.
