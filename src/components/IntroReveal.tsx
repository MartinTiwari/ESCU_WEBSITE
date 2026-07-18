"use client";

import { useEffect, useRef, useState } from "react";

/* Splash intro: logo on top, name below, held centered. Then the logo flies
   up into the real navbar logo (FLIP). Only once it has docked does the cream
   backdrop fade to reveal the whole page. */

export default function IntroReveal() {
  const [show, setShow] = useState(true);
  const [entered, setEntered] = useState(false);
  const [dock, setDock] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [logoTransform, setLogoTransform] = useState("none");
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";

    const tIn = setTimeout(() => setEntered(true), 60);

    // 1) hold, then dock the logo up into the navbar
    const tDock = setTimeout(() => {
      const img = logoRef.current;
      const target = document.querySelector<HTMLElement>("[data-brandlogo]");
      if (img && target) {
        const a = img.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        const s = b.width / a.width;
        setLogoTransform(`translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${s})`);
      }
      setDock(true);
    }, 1700);

    // 2) only AFTER it has reached the navbar, reveal the whole page
    const tReveal = setTimeout(() => setReveal(true), 2650);

    // 3) tear down the overlay
    const tEnd = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 3450);

    return () => {
      [tIn, tDock, tReveal, tEnd].forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
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
    </div>
  );
}
