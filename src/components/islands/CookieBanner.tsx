import { useEffect, useState } from "react";

const GA_ID = "G-9RYF5SY0XP";
const KEY = "cookie_consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGA() {
  if (document.getElementById("ga-src")) return;

  const s = document.createElement("script");
  s.id = "ga-src";
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  // The only KPI that matters: waitlist signups. Previously untracked.
  window.addEventListener("curio:waitlist-signup", () => {
    window.gtag?.("event", "waitlist_signup");
  });
  // Playing the sample is the strongest pre-signup intent signal.
  window.addEventListener("curio:sample-played", () => {
    window.gtag?.("event", "sample_played");
  });
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(KEY);
    if (consent === "accepted") loadGA();
    else if (!consent) setShow(true);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    localStorage.setItem(KEY, value);
    setShow(false);
    if (value === "accepted") loadGA();
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-[1.75rem] bg-espresso p-5 text-cream shadow-2xl sm:p-6"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-cream/85">
          We'd like to count visits so we know which stories land. Analytics
          only — nothing sold, nobody tracked across the web.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="btn rounded-full border border-cream/25 px-5 py-2.5 text-sm text-cream/80 hover:border-cream/60"
          >
            No thanks
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn bg-terracotta px-5 py-2.5 text-sm text-cream hover:bg-terracotta-hover"
          >
            Fine by me
          </button>
        </div>
      </div>
    </div>
  );
}
