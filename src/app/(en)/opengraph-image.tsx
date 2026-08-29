import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImageEn() {
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
          background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 55%, #eff6ff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #10b981, #0d9488)",
              color: "white",
              fontSize: 46,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#0f172a" }}>{siteConfig.name}</div>
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#475569", maxWidth: 920, textAlign: "center" }}>
          The best Open Source alternatives to the software you already use
        </div>
      </div>
    ),
    { ...size }
  );
}
