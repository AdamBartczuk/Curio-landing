import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";

interface Props {
  /** Audio file URL. See TOKYO SWAP note in Hero.astro. */
  src: string;
  /** City label, e.g. "Tokyo". */
  place: string;
  /** Story title, e.g. "Why this bridge is always crowded". */
  title: string;
  /** Optional caption under the controls. */
  note?: string;
}

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export default function AudioPlayer({ src, place, title, note }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // Keep React state honest even when playback changes outside our handlers
  // (autoplay blocked, media keys, headphone buttons, audio focus loss).
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onLoaded = () => setDuration(el.duration || 0);
    const onTime = () => setCurrent(el.currentTime);
    const onEnd = () => {
      setPlaying(false);
      setCurrent(0);
    };
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => setPlaying(false));
      // Listening is the strongest intent signal short of a signup.
      window.dispatchEvent(new CustomEvent("curio:sample-played"));
    } else {
      el.pause();
    }
  };

  const seek = (delta: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.min(
      el.duration || Infinity,
      Math.max(0, el.currentTime + delta),
    );
  };

  const scrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Number(e.target.value);
    setCurrent(Number(e.target.value));
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className="w-full rounded-[1.75rem] bg-cream/85 p-5 shadow-lg backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-terracotta">
            {place}
          </p>
          <p className="truncate font-display text-lg font-bold text-espresso">
            {title}
          </p>
        </div>

        {/* Level meter — decorative, mirrors playing state. */}
        <div className="flex h-6 shrink-0 items-end gap-1" aria-hidden="true">
          {[0.9, 1.3, 0.7].map((d, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-terracotta transition-all duration-300"
              style={{
                height: playing ? undefined : "6px",
                animation: playing
                  ? `curio-bar ${d}s ease-in-out ${i * 0.12}s infinite`
                  : undefined,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => seek(-15)}
          className="relative text-espresso/60 transition-colors hover:text-espresso"
          aria-label="Rewind 15 seconds"
        >
          <RotateCcw className="h-6 w-6" />
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium">
            15
          </span>
        </button>

        <button
          type="button"
          onClick={toggle}
          className="grid h-16 w-16 place-items-center rounded-full bg-terracotta text-cream shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label={playing ? "Pause sample" : "Play sample"}
        >
          {playing ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="ml-1 h-6 w-6 fill-current" />
          )}
        </button>

        <button
          type="button"
          onClick={() => seek(10)}
          className="relative text-espresso/60 transition-colors hover:text-espresso"
          aria-label="Forward 10 seconds"
        >
          <RotateCw className="h-6 w-6" />
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium">
            10
          </span>
        </button>
      </div>

      {/* Real range input, so the sample is keyboard-scrubbable. */}
      <div className="mt-6 flex items-center gap-3">
        <span className="w-9 text-right font-mono text-[11px] tabular-nums text-espresso/50">
          {fmt(current)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={scrub}
          aria-label="Seek through the sample"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none"
          style={{
            background: `linear-gradient(to right, var(--color-terracotta) ${pct}%, rgba(53,29,6,0.12) ${pct}%)`,
          }}
        />
        <span className="w-9 font-mono text-[11px] tabular-nums text-espresso/50">
          {fmt(duration)}
        </span>
      </div>

      {note ? (
        <p className="mt-4 text-center text-xs text-espresso/50">{note}</p>
      ) : null}

      <audio ref={audioRef} src={src} preload="metadata" />

      <style>{`
        @keyframes curio-bar {
          0%, 100% { height: 8px; }
          50%      { height: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes curio-bar { 0%, 100% { height: 14px; } }
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px; height: 16px;
          border-radius: 9999px;
          background: var(--color-terracotta);
          border: 3px solid var(--color-cream);
          box-shadow: 0 1px 4px rgba(53,29,6,0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 9999px;
          background: var(--color-terracotta);
          border: 3px solid var(--color-cream);
        }
      `}</style>
    </div>
  );
}
