"use client";
import { useGame } from "@/context/GameContext";
import { LayoutDashboard, TrendingUp, Award, Shield, Target, RotateCcw } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";

export default function DashboardPage() {
  const { scores, completed, totalScore, level, badges, allBadges, allLevels, getCompletedCount, getOverallPercentage, resetProgress, isLoaded } = useGame();

  if (!isLoaded) return null;

  const modules = [
    { key: "phishing", label: "Phishing Detection", color: "#ff2d7b", icon: "🎣" },
    { key: "passwords", label: "Password Security", color: "#b44aff", icon: "🔐" },
    { key: "socialEngineering", label: "Social Engineering", color: "#ff8800", icon: "🛡️" },
    { key: "safeBrowsing", label: "Safe Browsing", color: "#00ff88", icon: "🌐" },
    { key: "quiz", label: "Assessment Quiz", color: "#ffd600", icon: "🧠" },
  ];

  const weakAreas = modules.filter((m) => completed[m.key] && scores[m.key] < 70).map((m) => m.label);
  const strongAreas = modules.filter((m) => completed[m.key] && scores[m.key] >= 80).map((m) => m.label);

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>📊 <span className="text-gradient">Dashboard</span></h1>
            <p style={{ color: "#a0a0b8", fontSize: 14 }}>Your cybersecurity awareness overview.</p>
          </div>
          <button onClick={resetProgress} className="btn btn-ghost" style={{ fontSize: 13 }}>
            <RotateCcw size={14} /> Reset Progress
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        <div className="glass-card no-hover" style={{ padding: 24, textAlign: "center" }}>
          <ScoreCard score={getOverallPercentage()} maxScore={100} label="Overall Score" />
        </div>
        <div className="glass-card no-hover" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Points</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }} className="text-gradient">{totalScore}</div>
          <div style={{ fontSize: 13, color: "#a0a0b8", marginTop: 4 }}>out of 500 possible</div>
        </div>
        <div className="glass-card no-hover" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Level</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#00f0ff" }}>{level}</div>
          <div style={{ fontSize: 13, color: "#a0a0b8", marginTop: 4 }}>{getCompletedCount()}/5 modules done</div>
        </div>
        <div className="glass-card no-hover" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Badges Earned</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: "#ffd600" }}>{badges.length}</div>
          <div style={{ fontSize: 13, color: "#a0a0b8", marginTop: 4 }}>out of {allBadges.length} total</div>
        </div>
      </div>

      {/* Module scores */}
      <div className="glass-card no-hover" style={{ marginBottom: 32, padding: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
          <Target size={20} color="#00f0ff" /> Module Scores
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {modules.map((m) => (
            <div key={m.key}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{m.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
                  {completed[m.key] && <span className="chip chip-green" style={{ fontSize: 9 }}>Done</span>}
                </div>
                <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: m.color }}>
                  {scores[m.key]}%
                </span>
              </div>
              <ProgressBar value={scores[m.key]} max={100} color={m.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Level Progress */}
      <div className="glass-card no-hover" style={{ marginBottom: 32, padding: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <TrendingUp size={20} color="#00f0ff" /> Level Progress
        </h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {allLevels.map((l, i) => {
            const isActive = level === l.name;
            const isPast = totalScore >= l.min;
            return (
              <div key={i} style={{
                padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                background: isActive ? "rgba(0,240,255,0.15)" : isPast ? "rgba(0,255,136,0.06)" : "rgba(255,255,255,0.02)",
                color: isActive ? "#00f0ff" : isPast ? "#00ff88" : "#6b6b80",
                border: `1px solid ${isActive ? "rgba(0,240,255,0.3)" : isPast ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.04)"}`,
              }}>
                {l.name} ({l.min}+)
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="glass-card no-hover" style={{ marginBottom: 32, padding: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Award size={20} color="#ffd600" /> Badges
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
          {allBadges.map((b) => (
            <Badge key={b.id} icon={b.icon} name={b.name} desc={b.desc} earned={badges.includes(b.id)} />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {(weakAreas.length > 0 || strongAreas.length > 0) && (
        <div className="glass-card no-hover" style={{ padding: 28 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <Shield size={20} color="#00f0ff" /> Recommendations
          </h3>
          {strongAreas.length > 0 && (
            <div style={{ marginBottom: 16, padding: 16, background: "rgba(0,255,136,0.04)", borderRadius: 10, border: "1px solid rgba(0,255,136,0.1)" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#00ff88", marginBottom: 6 }}>💪 Strong Areas</div>
              <div style={{ fontSize: 14, color: "#a0a0b8" }}>{strongAreas.join(", ")}</div>
            </div>
          )}
          {weakAreas.length > 0 && (
            <div style={{ padding: 16, background: "rgba(255,136,0,0.04)", borderRadius: 10, border: "1px solid rgba(255,136,0,0.1)" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#ff8800", marginBottom: 6 }}>📚 Needs Improvement</div>
              <div style={{ fontSize: 14, color: "#a0a0b8" }}>{weakAreas.join(", ")} — Revisit these modules to strengthen your awareness.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
