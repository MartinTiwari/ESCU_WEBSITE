"use client";

import { useEffect, useState } from "react";

/* Whole-page scroll progress drawn as a winding molecular backbone down
   the side of the viewport. The bond path draws and nodes ignite from top
   to bottom as you scroll the entire page. */

const N = 12;
const W = 70;
const CX = 34;
const AMP = 18;
const FREQ = 0.8;

function isBig(i: number) {
  return i % 3 === 0 || i === N - 1;
}

export default function PageBondProgress() {
  const [progress, setProgress] = useState(0);
  const [h, setH] = useState(600);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    const onResize = () => {
      setH(Math.max(320, window.innerHeight - 210));
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const pts = Array.from({ length: N }, (_, i) => ({
    x: CX + AMP * Math.sin(i * FREQ),
    y: (i / (N - 1)) * h,
  }));

  // smooth Catmull-Rom curve through the nodes
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  const frontier = progress * (N - 1);

  // leading point (interpolated along the backbone)
  const li = Math.min(N - 2, Math.floor(frontier));
  const lf = frontier - li;
  const lx = pts[li].x + (pts[li + 1].x - pts[li].x) * lf;
  const ly = pts[li].y + (pts[li + 1].y - pts[li].y) * lf;

  return (
    <div
      className="fixed right-2 lg:right-5 top-24 z-40 pointer-events-none hidden md:block"
      style={{ height: h }}
      aria-hidden
    >
      <svg width={W} height={h} viewBox={`0 0 ${W} ${h}`} className="overflow-visible">
        <path d={d} fill="none" stroke="var(--emerald)" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />
        <path
          d={d}
          fill="none"
          stroke="var(--emerald)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
          style={{ transition: "stroke-dashoffset 120ms ease-out" }}
        />
        {pts.map((p, i) => {
          const big = isBig(i);
          const lit = i <= frontier + 1e-4;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={big ? 3.6 : 2.3}
              fill={lit ? (big ? "var(--lime)" : "var(--emerald)") : "var(--emerald)"}
              fillOpacity={lit ? 1 : 0.22}
              style={{ transition: "fill-opacity 300ms ease" }}
            />
          );
        })}
        {progress > 0.002 && progress < 0.998 && (
          <>
            <circle cx={lx} cy={ly} r={8} fill="var(--lime)" fillOpacity="0.18" />
            <circle cx={lx} cy={ly} r={3.4} fill="var(--lime)" />
          </>
        )}
      </svg>
    </div>
  );
}
