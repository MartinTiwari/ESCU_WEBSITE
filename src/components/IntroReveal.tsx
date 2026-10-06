"use client";

import { useEffect, useRef, useState } from "react";

/* Splash intro: logo on top, name below, held centered. Then the logo flies
   up into the real navbar logo (FLIP). Only once it has docked does the cream
   backdrop fade to reveal the whole page.

   Plays once per browser session — and any click/tap/keypress skips straight to the end, since
   someone visiting mid-phone-call shouldn't have to sit through it twice. */

const INTRO_STORAGE_KEY = "escu:intro-played";
// In-memory fallback when browser storage is unavailable.
let introPlayed = false;

function rememberIntro() {
  introPlayed = true;
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // The in-memory fallback still prevents replays during navigation.
  }
}

export default function IntroReveal() {
  const [show, setShow] = useState(true);
  const [entered, setEntered] = useState(false);
  const [dock, setDock] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [logoTransform, setLogoTransform] = useState("none");
  const logoRef = useRef<HTMLImageElement>(null);
  const skippedRef = useRef(false);

  useEffect(() => {
    // Bailing out via setState here (rather than computing it during render)
    // is deliberate: matchMedia don't exist during SSR, so
    // `show` has to default to true for a consistent server/client render,
    // then flip off once we can actually check the client's capabilities.
    let sessionPlayed = introPlayed;
    try {
      sessionPlayed ||= window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    } catch {
      // Storage can be blocked in private or restricted browser contexts.
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionPlayed) {
      rememberIntro();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let skipFrame: number | undefined;
    let skipEnd: ReturnType<typeof setTimeout> | undefined;

    const dockLogo = () => {
      const img = logoRef.current;
      const target = document.querySelector<HTMLElement>("[data-brandlogo]");
      if (img && target) {
        const a = img.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        const s = b.width / a.width;
        setLogoTransform(`translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${s})`);
      }
      setDock(true);
    };

    const tIn = setTimeout(() => setEntered(true), 30);
    const tDock = setTimeout(dockLogo, 250); // 1) brief hold, then dock the original logo
    const tReveal = setTimeout(() => setReveal(true), 700); // 2) reveal once the logo has docked
    const tEnd = setTimeout(() => {
      rememberIntro();
      setShow(false);
      document.body.style.overflow = previousOverflow;
    }, 1000); // 3) tear down the overlay without a long loading pause

    const timers = [tIn, tDock, tReveal, tEnd];

    const skip = () => {
      if (skippedRef.current) return;
      skippedRef.current = true;
      rememberIntro();
      timers.forEach(clearTimeout);
      setEntered(true);
      dockLogo();
      // let the dock transform apply for a beat so it doesn't look like a hard cut
      skipFrame = requestAnimationFrame(() => {
        setReveal(true);
        skipEnd = setTimeout(() => {
          setShow(false);
          document.body.style.overflow = previousOverflow;
        }, 200);
      });
    };

    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      if (skipFrame !== undefined) cancelAnimationFrame(skipFrame);
      if (skipEnd !== undefined) clearTimeout(skipEnd);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center cursor-pointer" aria-hidden="true">
      {/* cream backdrop — stays until the logo has docked, then fades */}
      <div
        className="absolute inset-0 bg-cream"
        style={{ opacity: reveal ? 0 : 1, transition: "opacity 300ms ease" }}
      />

      {/* lockup: logo on top, name at the bottom */}
      <div className="relative flex flex-col items-center gap-5 md:gap-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/logo-intro.webp"
          width={420}
          height={204}
          alt="Everest Super Chemical Udhyog"
          className="h-16 md:h-20 w-auto"
          style={{
            transformOrigin: "0 0",
            transform: dock ? logoTransform : entered ? "none" : "scale(0.94)",
            opacity: reveal ? 0 : entered ? 1 : 0,
            transition: dock
              ? "transform 450ms cubic-bezier(0.72,0,0.18,1), opacity 200ms ease"
              : "transform 200ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease",
          }}
        />
        <span
          className="font-display font-semibold text-ink tracking-tight text-xl sm:text-3xl md:text-4xl text-center px-6"
          style={{
            opacity: dock ? 0 : entered ? 1 : 0,
            transform: entered && !dock ? "none" : "translateY(8px)",
            transition: "opacity 200ms ease, transform 200ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Everest Super Chemical Udhyog
        </span>
      </div>

      <span className="absolute bottom-8 eyebrow text-muted/60 text-[0.65rem]">
        Tap to skip
      </span>
    </div>
  );
}
