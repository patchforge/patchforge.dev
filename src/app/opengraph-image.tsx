import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PatchForge — Autonomous AI Software Engineer";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0F1E",
          fontFamily: "sans-serif",
        }}
      >
        {/* Hammer icon (simplified for OG) */}
        <svg
          width="96"
          height="96"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="24" y="22" width="72" height="24" rx="5" fill="#00D4FF" />
          <rect x="24" y="22" width="72" height="4" rx="2" fill="white" opacity="0.15" />
          <circle cx="20" cy="30" r="2.5" fill="#FF6B2B" />
          <circle cx="103" cy="26" r="1.8" fill="#FF6B2B" opacity="0.6" />
          <rect x="52" y="46" width="16" height="30" rx="5" fill="#0088CC" />
          <circle cx="38" cy="86" r="5" stroke="#00D4FF" strokeWidth="2.5" fill="#0A0F1E" />
          <circle cx="38" cy="86" r="2" fill="#00D4FF" />
          <circle cx="82" cy="86" r="5" stroke="#00D4FF" strokeWidth="2.5" fill="#0A0F1E" />
          <circle cx="82" cy="86" r="2" fill="#00D4FF" />
          <circle cx="60" cy="102" r="6" stroke="#FF6B2B" strokeWidth="2.5" fill="#0A0F1E" />
          <circle cx="60" cy="102" r="2.5" fill="#FF6B2B" />
          <line x1="42" y1="90" x2="55" y2="97" stroke="#00D4FF" strokeWidth="2" />
          <line x1="78" y1="90" x2="65" y2="97" stroke="#00D4FF" strokeWidth="2" />
        </svg>

        {/* Brand text */}
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Patch</span>
          <span style={{ color: "#00D4FF" }}>Forge</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#94A3B8",
            letterSpacing: "0.01em",
          }}
        >
          Assign a ticket. Review a PR. That&apos;s it.
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "#475569",
            letterSpacing: "0.05em",
          }}
        >
          patchforge.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
