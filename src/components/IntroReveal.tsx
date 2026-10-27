"use client";

import { useEffect, useRef, useState } from "react";

// A two-second brand greeting, progressively enhanced after hydration. The
// website stays visible, scrollable and usable throughout the logo docking.
const INTRO_STORAGE_KEY = "escu:intro-played";
let introPlayed = false;

function rememberIntro() {
  introPlayed = true;
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // The in-memory fallback also prevents replays during navigation.
  }
}

export default function IntroReveal() {
  // Render nothing on the server or before hydration: a failed script must
  // never leave an opaque splash covering the website.
  const [show, setShow] = useState(false);
  const [entered, setEntered] = useState(false);
  const [dock, setDock] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [logoTransform, setLogoTransform] = useState("none");
  const logoRef = useRef<HTMLImageElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sessionPlayed = introPlayed;
    try {
      sessionPlayed ||= window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    } catch {
      // Storage is optional in restricted browsing contexts.
    }
    if (motion.matches || sessionPlayed) return;

    let finished = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const finish = () => {
      if (finished) return;
      finished = true;
      rememberIntro();
      timers.forEach(clearTimeout);
      setShow(false);
    };
    finishRef.current = finish;
    const startFrame = requestAnimationFrame(() => {
      // A visitor may interact before this first frame is delivered.
      // Do not restart an intro that has already been skipped.
      if (finished) return;
      setShow(true);
      timers.push(setTimeout(() => setEntered(true), 60));
      timers.push(setTimeout(() => {
        const image = logoRef.current;
        const target = document.querySelector<HTMLElement>("[data-brandlogo]");
        if (image && target) {
          const from = image.getBoundingClientRect();
          const to = target.getBoundingClientRect();
          if (from.width > 0 && to.width > 0) {
            setLogoTransform(`translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`);
          }
        }
        setDock(true);
      }, 950));
      timers.push(setTimeout(() => setReveal(true), 1550));
      timers.push(setTimeout(finish, 2000));
    });

    // The first interaction still reaches the real page control underneath.
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    const handleMotion = () => {
      if (motion.matches) finish();
    };
    window.addEventListener("pointerdown", finish, { once: true });
    window.addEventListener("keydown", handleKey);
    motion.addEventListener("change", handleMotion);
    return () => {
      cancelAnimationFrame(startFrame);
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", handleKey);
      motion.removeEventListener("change", handleMotion);
      finishRef.current = () => {};
    };
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-[100] w-64 max-w-[calc(100vw-2rem)] sm:left-6">
      <div
        className="rounded-md border border-line bg-cream px-5 py-4 shadow-lg"
        style={{ opacity: dock ? 0 : entered ? 1 : 0, transition: "opacity 300ms ease" }}
        aria-hidden="true"
      >
        {/* Keeps the original logo-above-name lockup without hiding the hero. */}
        <div className="h-12" />
        <span className="font-display mt-3 block text-base font-semibold leading-snug text-ink">Everest Super Chemical Udhyog</span>
      </div>
      {/* The image lives outside the fading card so it can dock in the header. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={logoRef}
        src="/logo-intro.webp"
        width={420}
        height={204}
        alt=""
        aria-hidden="true"
        className="absolute left-5 top-4 h-12 w-auto"
        style={{
          transformOrigin: "0 0",
          transform: dock ? logoTransform : entered ? "none" : "scale(0.94)",
          opacity: reveal ? 0 : entered ? 1 : 0,
          transition: dock
            ? "transform 600ms cubic-bezier(0.72,0,0.18,1), opacity 250ms ease"
            : "transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
        }}
      />
      <button
        type="button"
        onClick={() => finishRef.current()}
        className="pointer-events-auto mt-2 min-h-11 rounded bg-cream px-3 text-xs font-medium text-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-deep"
        style={{ opacity: reveal ? 0 : 1 }}
      >
        Skip animation
      </button>
    </div>
  );
}
