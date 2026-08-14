import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const ENDPOINT = "https://trexuhtydiwygtxugqfb.supabase.co/rest/v1/waitlist";
// Supabase *publishable* key — safe in the client, but the `waitlist` table
// must have RLS set to insert-only. See SPEC.md §7.
const PUBLISHABLE_KEY = "sb_publishable_AYOYUV4jWCtJalPF8UkGCQ_CcSSP59F";

interface Props {
  buttonText?: string;
  placeholder?: string;
  /** Show the "which city next?" field. Doubles as market research. */
  askCity?: boolean;
  tone?: "light" | "dark";
}

export default function WaitlistForm({
  buttonText = "Get early access",
  placeholder = "your@email.com",
  askCity = false,
  tone = "light",
}: Props) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const post = async (body: Record<string, string>) =>
    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        apikey: PUBLISHABLE_KEY,
        Authorization: `Bearer ${PUBLISHABLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setError(null);

    try {
      let res = await post(
        askCity && city ? { email, city } : { email },
      );

      // If the `city` column does not exist yet, PostgREST 400s. Don't lose the
      // signup over it — retry with just the email.
      if (!res.ok && res.status === 400 && askCity && city) {
        res = await post({ email });
      }

      // 409 = already on the list. That's a success from the visitor's side.
      if (res.ok || res.status === 409) {
        setStatus("done");
        setEmail("");
        setCity("");
        window.dispatchEvent(new CustomEvent("curio:waitlist-signup"));
      } else {
        setStatus("idle");
        setError("That didn't go through. Try again?");
      }
    } catch {
      setStatus("idle");
      setError("Network hiccup. Try again?");
    }
  };

  if (status === "done") {
    return (
      <div
        className="pill w-full max-w-xl bg-cream px-6 py-4 text-espresso"
        role="status"
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-terracotta text-cream">
          <Check className="h-4 w-4" />
        </span>
        <span className="font-medium">
          You're in. We'll be in touch before Tokyo blooms.
        </span>
      </div>
    );
  }

  const field =
    tone === "dark"
      ? "bg-cream/10 text-cream placeholder:text-cream/50 border-cream/25 focus:border-cream"
      : "bg-cream text-espresso placeholder:text-espresso/40 border-espresso/15 focus:border-terracotta";

  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          className={`w-full rounded-full border-2 px-6 py-3.5 outline-none transition-colors ${field}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary shrink-0 disabled:opacity-70"
        >
          {status === "loading" ? "One sec…" : buttonText}
          {status !== "loading" && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>

      {askCity && (
        <div className="mt-3">
          <label className="sr-only" htmlFor="waitlist-city">
            Which city should Curio do next?
          </label>
          <input
            id="waitlist-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Which city should we do next? (optional)"
            className={`w-full rounded-full border-2 px-6 py-3.5 outline-none transition-colors ${field}`}
          />
        </div>
      )}

      {error && (
        <p className="mt-3 px-2 text-sm text-terracotta" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
