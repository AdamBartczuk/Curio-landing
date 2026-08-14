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
    a: "No. That's the whole point. Open explore mode, start walking, and tap anything that catches your eye. There are planned journeys too, for when you want one, but you never have to use them.",
  },
  {
    q: "How long is a single story?",
    a: "Around two minutes. Long enough to be worth stopping for, short enough that you can listen while you keep walking.",
  },
  {
    q: "Does Curio work without mobile data?",
    a: "Yes. Download the city before you head out and everything — maps and audio — works with no signal and no roaming. Useful in Tokyo, where visitor SIMs and metro basements don't always agree.",
  },
  {
    q: "Who writes the stories?",
    a: "People who live in the city. Not rewritten guidebook copy and not the same five facts you'd find in a search result — local writers with opinions about their own neighbourhoods.",
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
    a: "Tokyo comes first, in time for cherry blossom season in spring 2027. More cities follow — early-access members help decide which.",
  },
];
