"use client";

import { useEffect, useRef } from "react";

/* Topographic contour lines that build into a mountain peak — a nod to the
   name (Everest) and the mark (a summit). Two depth layers drift with the
   cursor for a subtle parallax; the whole field breathes slowly on its own.
   Replaces the generic particle-network / glow-blob hero background. */

const BASE =
  "M0,-72 C34,-72 66,-46 66,-8 C66,26 40,58 4,60 C-32,62 -66,40 -66,2 C-66,-34 -34,-72 0,-72 Z";

export default function Contours() {
  const front = useRef<SVGGElement>(null);
  const back = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (front.current) front.current.style.transform = `translate(${cx * 46}px, ${cy * 34}px)`;
      if (back.current) back.current.style.transform = `translate(${cx * 20}px, ${cy * 15}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Rings cascade down-left from a summit in the upper-right, so they read as a
  // mountainside seen at an angle rather than a flat concentric target.
  const rings = Array.from({ length: 16 }, (_, i) => ({
    i,
    px: 860 - i * 20,
    py: 300 + i * 30,
    s: 0.5 + i * 0.62,
    op: Math.max(0.05, 0.4 - i * 0.028),
    front: i < 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <g ref={back}>
          {rings
            .filter((r) => !r.front)
            .map((r) => (
              <path
                key={r.i}
                d={BASE}
                transform={`translate(${r.px} ${r.py}) scale(${r.s})`}
                fill="none"
                stroke="rgb(158,195,221)"
                strokeOpacity={r.op}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </g>
        <g ref={front}>
          {rings
            .filter((r) => r.front)
            .map((r) => (
              <path
                key={r.i}
                d={BASE}
                transform={`translate(${r.px} ${r.py}) scale(${r.s})`}
                fill="none"
                stroke="rgb(240,168,74)"
                strokeOpacity={r.op * 0.7}
                strokeWidth={1.1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </g>
        {/* summit marker */}
        <circle cx="860" cy="300" r="2.5" fill="rgb(240,168,74)" />
      </svg>
    </div>
  );
}
