/*
 * Single source of truth for the FAQ. Rendered by FAQ.astro and mirrored as
 * FAQPage JSON-LD in Base.astro — importing from here keeps the two in sync
 * (they used to be duplicated and had already drifted in wording).
 */
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "Do I need to plan a route before I go out?",
    a: "No. That's the whole point. Open Explore mode, start walking, and tap anything that catches your eye. There are planned journeys too, for when you want one, but you never have to use them.",
  },
  {
    q: "How long is a single story?",
    a: "Around two minutes. Long enough to be worth stopping for, short enough that you can listen while you keep walking.",
  },
  // MISSING: "What language are the stories in?" belongs here. SPEC §4 lists
  // languages as a job for this FAQ and it is still unanswered — for a European
  // traveller heading to Japan it's a top-three question. Needs a real product
  // answer from Adam; don't guess one. Tracked in SPEC §7.
  {
    q: "Does Curio work without mobile data?",
    a: "Yes. Download the city before you head out, and the maps and audio both work with no signal. Handy in Tokyo, where the metro runs deep underground and visitor SIMs can be patchy.",
  },
  {
    q: "Who writes the stories?",
    a: "People who live in the city. Not rewritten guidebook copy and not the same five facts you'd find in a search result. Local writers with opinions about their own neighbourhoods.",
  },
  {
    q: "Who's behind Curio?",
    a: "A small independent team that got tired of walking past good stories. We're building Curio city by city, with local writers in each one. Questions, ideas, or you write about your city? Say hello at hello@curio.guide.",
  },
  {
    q: "What will it cost?",
    a: "There'll be a free tier you can use without paying. We're still working out the rest, and early-access members will hear it from us first.",
  },
  {
    q: "When does Curio launch?",
    a: "Tokyo comes first, in time for cherry blossom season in spring 2027. More cities follow, and early-access members help decide which.",
  },
];
