"use client";
import { useState, useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { Trophy, Medal, Crown, Star, TrendingUp, Filter } from "lucide-react";

const FAKE_USERS = [
  { name: "Arjun Mehta", score: 465, level: "Expert", avatar: "🧑‍💻" },
  { name: "Priya Sharma", score: 440, level: "Expert", avatar: "👩‍💻" },
  { name: "Rahul Verma", score: 410, level: "Advanced", avatar: "👨‍🎓" },
  { name: "Sneha Patel", score: 395, level: "Advanced", avatar: "👩‍🎓" },
  { name: "Vikram Singh", score: 380, level: "Advanced", avatar: "🧑‍🔬" },
  { name: "Ananya Gupta", score: 355, level: "Intermediate", avatar: "👩‍🔬" },
  { name: "Karan Reddy", score: 340, level: "Intermediate", avatar: "🧑‍🏫" },
  { name: "Divya Nair", score: 310, level: "Intermediate", avatar: "👩‍🏫" },
  { name: "Aditya Joshi", score: 285, level: "Beginner", avatar: "👨‍💼" },
  { name: "Meera Iyer", score: 260, level: "Beginner", avatar: "👩‍💼" },
  { name: "Rohan Kumar", score: 230, level: "Beginner", avatar: "🧑‍🎨" },
  { name: "Kavya Krishnan", score: 200, level: "Beginner", avatar: "👩‍🎨" },
];

export default function LeaderboardPage() {
  const { totalScore, level, username } = useGame();
  const [filter, setFilter] = useState("all");

  const leaderboard = useMemo(() => {
    const you = { name: username || "You", score: totalScore, level, avatar: "⭐", isYou: true };
    const all = [...FAKE_USERS, you].sort((a, b) => b.score - a.score);
    return all.map((u, i) => ({ ...u, rank: i + 1 }));
  }, [totalScore, level, username]);

  const filtered = filter === "all" ? leaderboard : leaderboard.filter((u) => u.level === filter);
  const yourRank = leaderboard.find((u) => u.isYou)?.rank || "-";

  const rankIcons = { 1: <Crown size={18} color="#ffd600" />, 2: <Medal size={18} color="#c0c0c0" />, 3: <Medal size={18} color="#cd7f32" /> };
  const rankColors = { 1: "#ffd600", 2: "#c0c0c0", 3: "#cd7f32" };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>🏆 <span className="text-gradient">Leaderboard</span></h1>
        <p style={{ color: "#a0a0b8", fontSize: 14 }}>See how you rank against other students.</p>
      </div>

      {/* Your rank */}
      <div className="glass-card no-hover" style={{ marginBottom: 32, padding: 28, display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 24, background: "linear-gradient(145deg, rgba(0,240,255,0.04), rgba(180,74,255,0.04))" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 4 }}>Your Rank</div>
          <div style={{ fontSize: 48, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace" }} className="text-gradient">#{yourRank}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 4 }}>Total Score</div>
          <div style={{ fontSize: 48, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: "#00f0ff" }}>{totalScore}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 4 }}>Level</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#b44aff" }}>{level}</div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, padding: 4, background: "rgba(255,255,255,0.03)", borderRadius: 12, width: "fit-content", flexWrap: "wrap" }}>
        {["all", "Expert", "Advanced", "Intermediate", "Beginner"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: filter === f ? "rgba(0,240,255,0.1)" : "transparent",
            color: filter === f ? "#00f0ff" : "#6b6b80", transition: "all 0.2s",
            border: filter === f ? "1px solid rgba(0,240,255,0.2)" : "1px solid transparent",
            textTransform: "capitalize",
          }}>
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Leaderboard list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((user) => (
          <div key={user.name} className={`leaderboard-row ${user.rank === 1 ? "top-1" : user.rank === 2 ? "top-2" : user.rank === 3 ? "top-3" : ""}`}
            style={{
              border: user.isYou ? "1px solid rgba(0,240,255,0.3)" : undefined,
              background: user.isYou ? "rgba(0,240,255,0.05)" : undefined,
            }}
          >
            <div className="rank-badge" style={{
              background: rankColors[user.rank] ? `${rankColors[user.rank]}20` : "rgba(255,255,255,0.03)",
              color: rankColors[user.rank] || "#6b6b80",
            }}>
              {rankIcons[user.rank] || user.rank}
            </div>
            <span style={{ fontSize: 24 }}>{user.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: user.isYou ? "#00f0ff" : "#f0f0f5" }}>
                  {user.name}
                </span>
                {user.isYou && <span className="chip chip-cyan" style={{ fontSize: 9 }}>YOU</span>}
              </div>
              <span style={{ fontSize: 12, color: "#6b6b80" }}>{user.level}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: rankColors[user.rank] || (user.isYou ? "#00f0ff" : "#a0a0b8") }}>
                {user.score}
              </div>
              <div style={{ fontSize: 11, color: "#6b6b80" }}>points</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
