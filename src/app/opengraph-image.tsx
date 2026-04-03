import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MAHTAMUN — Graphic Designer & Visual Identity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAFAF8",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#E8E6E1 1px, transparent 1px), linear-gradient(90deg, #E8E6E1 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.5,
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#111111",
            }}
          >
            MAHTAMUN
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
              border: "1px solid #E8E6E1",
              padding: "6px 12px",
            }}
          >
            Graphic Designer
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A96E",
            }}
          >
            Brand Identity · Social Media · UI/UX · Print
          </span>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 72,
              fontWeight: 300,
              color: "#111111",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 800,
            }}
          >
            Crafting Identities That Endure
          </h1>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E8E6E1",
            paddingTop: 28,
            position: "relative",
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#999999", letterSpacing: "0.1em" }}>
            Based in Bangladesh · Working Worldwide
          </span>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#C8A96E",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
