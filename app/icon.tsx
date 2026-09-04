import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 16,
        background: "#020617",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#2dd4bf",
        borderRadius: "8px",
        fontWeight: 700,
        fontFamily: "monospace",
        
        border: "1px solid rgba(45, 212, 191, 0.3)",
      }}
    >
      MR
    </div>,
    { ...size },
  );
}
