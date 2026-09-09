import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#071a2f",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 100,
          letterSpacing: -8,
        }}
      >
        <span style={{ display: "flex", color: "#faf8f4" }}>A</span>
        <span style={{ display: "flex", color: "#c8a24a" }}>S</span>
      </div>
    ),
    { ...size },
  );
}
