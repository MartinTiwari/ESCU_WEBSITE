import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "Everest Super Chemical Udhyog — Chemical supply from Kathmandu across Nepal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo-mark.png"));
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "56px 64px", background: "#061d35", color: "#faf8f2" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {/* Static OG renderer requires an HTML image, not next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={128} height={62} alt="ESCU logo" />
        <div style={{ display: "flex", fontSize: 28 }}>{site.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", fontSize: 70, fontWeight: 700, letterSpacing: -2 }}>Chemical supply.</div>
        <div style={{ display: "flex", fontSize: 70, fontWeight: 700, color: "#f4c477", letterSpacing: -2 }}>From Kathmandu. Across Nepal.</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, borderTop: "1px solid #536578", paddingTop: 26 }}>
        <div style={{ display: "flex", fontSize: 25 }}>Water treatment · Pool care · Cleaning & hygiene</div>
        <div style={{ display: "flex", fontSize: 22, color: "#cedbe5" }}>Wholesale & bulk orders · everestsuperchemical.com.np</div>
      </div>
    </div>,
    size,
  );
}
