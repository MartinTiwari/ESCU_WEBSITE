"use client";

import { useEffect, useRef } from "react";

// Internal navigation does not replay the welcome; a full reload can.
let introPlayed = false;

export default function IntroReveal() {
  const lockupRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const lockup = lockupRef.current;
    const logo = logoRef.current;
    const target = document.querySelector<HTMLElement>("[data-brandlogo]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!lockup || !logo || !target || introPlayed || reducedMotion.matches) return;

    // Defer to the next frame so Strict Mode's setup/cleanup rehearsal cannot
    // consume the once-per-load animation before it is actually displayed.
    let animation: Animation | undefined;
    const frame = requestAnimationFrame(() => {
      introPlayed = true;
      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const box = lockup.getBoundingClientRect();
      lockup.style.transformOrigin = `${from.left - box.left}px ${from.top - box.top}px`;
      const transform = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width})`;
      animation = lockup.animate([
        { opacity: 0, transform: "none", offset: 0 },
        { opacity: 1, transform: "none", offset: 0.15 },
        { opacity: 1, transform: "none", offset: 0.3 },
        { opacity: 0, transform, offset: 1 },
      ], { duration: 800, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
    });
    const skip = () => {
      cancelAnimationFrame(frame);
      animation?.cancel();
    };
    // No scroll lock, focus trap or event cancellation: the first interaction
    // reaches the real page and dismisses this purely decorative welcome.
    window.addEventListener("pointerdown", skip, { passive: true });
    window.addEventListener("keydown", skip);
    window.addEventListener("scroll", skip, { passive: true });
    window.addEventListener("resize", skip);
    reducedMotion.addEventListener("change", skip);
    return () => {
      skip();
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("scroll", skip);
      window.removeEventListener("resize", skip);
      reducedMotion.removeEventListener("change", skip);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] grid place-items-center motion-reduce:hidden">
      <div ref={lockupRef} className="flex flex-col items-center gap-3 bg-cream px-6 py-5 text-ink" style={{ opacity: 0, transformOrigin: "50% 20px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={logoRef} src="/logo-mark-ink.webp" alt="" width={1037} height={503} className="h-16 w-auto" />
        <span className="font-display text-center text-lg font-semibold sm:text-2xl">Everest Super Chemical Udhyog</span>
      </div>
    </div>
  );
}
