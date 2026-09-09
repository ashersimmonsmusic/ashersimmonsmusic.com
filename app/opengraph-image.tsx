import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0b09",
          color: "#f2ecdd",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#c8a24a" }}>
          DUNDAS TOWN, ABACO → BRISTOL, UK
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 600, lineHeight: 1 }}>
            Asher Simmons
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a89f8b", marginTop: 24 }}>
            {siteConfig.description.split(".")[0]}.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
