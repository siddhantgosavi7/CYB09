"use client";
export default function Badge({ icon, name, desc, earned = false }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      padding: 16, borderRadius: 16, textAlign: "center",
      background: earned ? "rgba(0,240,255,0.05)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${earned ? "rgba(0,240,255,0.2)" : "rgba(255,255,255,0.04)"}`,
      opacity: earned ? 1 : 0.4, transition: "all 0.3s ease",
      filter: earned ? "none" : "grayscale(1)",
    }}>
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: earned ? "#f0f0f5" : "#6b6b80" }}>{name}</span>
      <span style={{ fontSize: 10, color: "#6b6b80" }}>{desc}</span>
    </div>
  );
}
