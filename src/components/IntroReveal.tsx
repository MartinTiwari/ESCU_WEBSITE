"use client";

import { useEffect, useRef, useState } from "react";

/* Splash intro: logo on top, name below, held centered. Then the logo flies
   up into the real navbar logo (FLIP). Only once it has docked does the cream
   backdrop fade to reveal the whole page.

   Plays once per browser session (sessionStorage), not on every navigation
   to "/" — and any click/tap/keypress skips straight to the end, since
   someone reloading mid-phone-call shouldn't have to sit through it twice. */

const SEEN_KEY = "escu-intro-seen";

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
    // is deliberate: matchMedia/sessionStorage don't exist during SSR, so
    // `show` has to default to true for a consistent server/client render,
    // then flip off once we can actually check the client's capabilities.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }
    if (sessionStorage.getItem(SEEN_KEY)) {
      setShow(false);
      return;
    }
    sessionStorage.setItem(SEEN_KEY, "1");

    document.body.style.overflow = "hidden";

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

    const tIn = setTimeout(() => setEntered(true), 60);
    const tDock = setTimeout(dockLogo, 1700); // 1) hold, then dock the logo up into the navbar
    const tReveal = setTimeout(() => setReveal(true), 2650); // 2) only after it has reached the navbar, reveal the page
    const tEnd = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 3450); // 3) tear down the overlay

    const timers = [tIn, tDock, tReveal, tEnd];

    const skip = () => {
      if (skippedRef.current) return;
      skippedRef.current = true;
      timers.forEach(clearTimeout);
      setEntered(true);
      dockLogo();
      // let the dock transform apply for a beat so it doesn't look like a hard cut
      requestAnimationFrame(() => {
        setReveal(true);
        setTimeout(() => {
          setShow(false);
          document.body.style.overflow = "";
        }, 200);
      });
    };

    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center cursor-pointer" aria-hidden="true">
      {/* cream backdrop — stays until the logo has docked, then fades */}
      <div
        className="absolute inset-0 bg-cream"
        style={{ opacity: reveal ? 0 : 1, transition: "opacity 750ms ease" }}
      />

      {/* lockup: logo on top, name at the bottom */}
      <div className="relative flex flex-col items-center gap-5 md:gap-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/logo-mark-ink.png"
          alt="Everest Super Chemical Udhyog"
          className="h-16 md:h-20 w-auto"
          style={{
            transformOrigin: "0 0",
            transform: dock ? logoTransform : entered ? "none" : "scale(0.94)",
            opacity: reveal ? 0 : entered ? 1 : 0,
            transition: dock
              ? "transform 950ms cubic-bezier(0.72,0,0.18,1), opacity 400ms ease"
              : "transform 600ms cubic-bezier(0.16,1,0.3,1), opacity 600ms ease",
          }}
        />
        <span
          className="font-display font-semibold text-ink tracking-tight text-2xl sm:text-3xl md:text-4xl whitespace-nowrap"
          style={{
            opacity: dock ? 0 : entered ? 1 : 0,
            transform: entered && !dock ? "none" : "translateY(8px)",
            transition: "opacity 500ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1)",
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
