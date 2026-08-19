"use client";
export default function ProgressBar({ value, max, color, height = 8, showLabel = false }) {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const bg = color || "linear-gradient(135deg, #00f0ff, #b44aff)";
  return (
    <div>
      {showLabel && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12, color: "#a0a0b8" }}><span>{value}/{max}</span><span>{percentage}%</span></div>}
      <div style={{ width: "100%", height, background: "rgba(26,26,46,1)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${percentage}%`, height: "100%", borderRadius: 999, background: bg, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}
