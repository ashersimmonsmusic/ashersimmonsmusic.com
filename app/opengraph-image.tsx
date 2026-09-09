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
          backgroundColor: "#071a2f",
          color: "#faf8f4",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#c8a24a" }}>
          DUNDAS TOWN, ABACO → BRISTOL, UK
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 120,
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: -4,
            }}
          >
            Asher Simmons
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#8fc4de", marginTop: 24 }}>
            {siteConfig.description.split(".")[0]}.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
