import { ImageResponse } from "next/og";

export const alt = "Paul Murphy - Data and AI Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f4f2ea",
          color: "#151815",
          padding: "64px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.08 }}>
          {Array.from({ length: 18 }).map((_, index) => (
            <div key={index} style={{ width: 1, height: "100%", background: "#151815", marginLeft: 66 }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700 }}>PAUL MURPHY</div>
            <div style={{ display: "flex", fontSize: 18, color: "#176b4d", letterSpacing: 3 }}>DATA / AI / OPERATIONS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>Systems for</div>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95, color: "#176b4d" }}>complex work.</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #cbc9bf", paddingTop: 18, fontSize: 18, color: "#626861" }}>
            <span>Analytics platforms</span>
            <span>Forecasting systems</span>
            <span>Applied AI</span>
          </div>
        </div>
        <div style={{ position: "absolute", right: 50, top: 155, width: 130, height: 130, border: "28px solid #a995d6", borderRadius: 999, opacity: 0.8 }} />
      </div>
    ),
    size,
  );
}
