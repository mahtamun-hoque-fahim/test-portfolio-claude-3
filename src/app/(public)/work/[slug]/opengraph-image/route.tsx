import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/queries/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { slug: string };
}

export default async function ProjectOGImage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? "";
  const category = project?.category?.name ?? "Design";
  const year = project?.year?.toString() ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111111",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(#333333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.6,
          }}
        />

        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            height: 2,
            backgroundColor: "#C8A96E",
          }}
        />

        {/* Top */}
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
              fontSize: 18,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#999999",
            }}
          >
            MAHTAMUN
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "#C8A96E",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {category}
            {year ? ` · ${year}` : ""}
          </span>
        </div>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: title.length > 30 ? 56 : 72,
              fontWeight: 300,
              color: "#FAFAF8",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 900,
            }}
          >
            {title}
          </h1>
          {tagline && (
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 22,
                color: "#666666",
                margin: 0,
                fontWeight: 300,
                maxWidth: 700,
              }}
            >
              {tagline}
            </p>
          )}
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #333333",
            paddingTop: 28,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "#666666",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Portfolio Project
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#C8A96E" }} />
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#666666", letterSpacing: "0.1em" }}>
              mahtamun.design
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
