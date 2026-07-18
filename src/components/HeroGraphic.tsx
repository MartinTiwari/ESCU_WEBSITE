"use client";

import { motion } from "framer-motion";

/* Nodes of a stylised molecular lattice. Coordinates hand-placed
   so it reads as a real structure, not a random scatter. */
const nodes = [
  { x: 90, y: 70, r: 7, key: true },
  { x: 190, y: 50, r: 5 },
  { x: 260, y: 110, r: 8, key: true },
  { x: 150, y: 140, r: 6 },
  { x: 70, y: 180, r: 5 },
  { x: 230, y: 200, r: 6, key: true },
  { x: 300, y: 180, r: 5 },
  { x: 130, y: 240, r: 8, key: true },
  { x: 210, y: 285, r: 5 },
  { x: 300, y: 260, r: 6 },
];
const bonds = [
  [0, 1], [1, 2], [0, 3], [3, 5], [2, 5], [0, 4],
  [4, 7], [3, 7], [5, 6], [6, 9], [7, 8], [8, 9], [5, 9],
];

export default function HeroGraphic() {
  return (
    <div className="relative w-full">
      <div className="relative rounded-2xl border border-[var(--ink-line)] bg-[var(--ink-soft)]/40 grid-dots overflow-hidden">
        {/* corner tick marks (drafting detail) */}
        {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((p) => (
          <span key={p} className={`absolute ${p} w-3 h-3 border-emerald-bright/50`} style={{ borderTopWidth: p.includes("top") ? 1 : 0, borderBottomWidth: p.includes("bottom") ? 1 : 0, borderLeftWidth: p.includes("left") ? 1 : 0, borderRightWidth: p.includes("right") ? 1 : 0 }} />
        ))}

        <div className="flex items-center justify-between px-5 pt-4">
          <span className="eyebrow text-emerald-bright text-[0.6rem]">Assay · H₂O treatment</span>
          <span className="eyebrow text-cream/35 text-[0.6rem]">Fig. 01</span>
        </div>

        <svg viewBox="0 0 360 330" className="w-full">
          {bonds.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="var(--emerald-bright)" strokeOpacity="0.28" strokeWidth="1.25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeInOut" }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x} cy={n.y} r={n.r}
              fill={n.key ? "var(--lime)" : "var(--emerald)"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: "backOut" }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              {n.key && (
                <animate attributeName="opacity" values="1;0.55;1" dur="3.2s" repeatCount="indefinite" />
              )}
            </motion.circle>
          ))}
        </svg>

        {/* readout strip */}
        <div className="grid grid-cols-3 border-t border-[var(--ink-line)] divide-x divide-[var(--ink-line)]">
          {[
            ["pH", "7.2"],
            ["Turbidity", "0.4 NTU"],
            ["Cl₂", "1.0 ppm"],
          ].map(([k, v]) => (
            <div key={k} className="px-4 py-3">
              <div className="eyebrow text-cream/35 text-[0.55rem] mb-1">{k}</div>
              <div className="font-mono text-cream text-sm">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* floating chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="absolute -bottom-4 -left-3 bg-lime text-ink text-xs font-semibold px-3.5 py-2 rounded-lg shadow-lg font-mono hidden sm:block"
      >
        Batch-tested ✓
      </motion.div>
    </div>
  );
}
