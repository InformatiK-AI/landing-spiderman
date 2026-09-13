import { ImageResponse } from "next/og";
import { OG_COPY, SITE } from "@/lib/seo";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Tarjeta OG generada en el build. Arte original: gradiente de portal, glifo de
 * araña dibujado acá y tipografía. Cero fotogramas ni pósters con copyright.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background:
            "radial-gradient(circle at 50% 64%, #ff8a1f 0%, #15151f 38%, #07070c 78%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          width="96"
          height="96"
          viewBox="0 0 32 32"
          style={{ position: "absolute", top: 64, left: 72 }}
        >
          <ellipse cx="16" cy="16" rx="3.2" ry="4.4" fill="#e62429" />
          <g stroke="#e62429" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M13 13 6 8 3 10" />
            <path d="M13 15 5 14 2 16" />
            <path d="M13 17.5 5 19 3 22" />
            <path d="M14 20 8 24 7 27" />
            <path d="M19 13 26 8 29 10" />
            <path d="M19 15 27 14 30 16" />
            <path d="M19 17.5 27 19 29 22" />
            <path d="M18 20 24 24 25 27" />
          </g>
        </svg>

        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ff5a5f",
          }}
        >
          {OG_COPY.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 86,
            lineHeight: 1,
            textTransform: "uppercase",
            marginTop: 18,
          }}
        >
          <span>{OG_COPY.lines[0]}</span>
          <span style={{ color: "#e62429" }}>{OG_COPY.lines[1]}</span>
        </div>
      </div>
    ),
    size,
  );
}
