"use client";
import Link from "next/link";
import { useGame } from "@/context/GameContext";
import { Shield, Mail, KeyRound, Users, Globe, Brain, ArrowRight, Zap, Target, Award } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";

const modules = [
  { href: "/phishing", title: "Phishing Simulator", desc: "Identify phishing emails in a realistic inbox. Learn to spot red flags.", icon: Mail, color: "#ff2d7b", gradient: "linear-gradient(135deg, #ff2d7b, #ff8800)" },
  { href: "/passwords", title: "Password Lab", desc: "Test password strength and learn about brute force, dictionary attacks.", icon: KeyRound, color: "#b44aff", gradient: "linear-gradient(135deg, #b44aff, #00f0ff)" },
  { href: "/social-engineering", title: "Social Engineering", desc: "Navigate interactive scenarios: pretexting, baiting, tailgating.", icon: Users, color: "#ff8800", gradient: "linear-gradient(135deg, #ff8800, #ffd600)" },
  { href: "/safe-browsing", title: "Safe Browsing", desc: "Spot malicious URLs, unsafe downloads, and browsing threats.", icon: Globe, color: "#00ff88", gradient: "linear-gradient(135deg, #00ff88, #00f0ff)" },
];

const stats = [
  { label: "Attack Scenarios", value: "25+", icon: Target },
  { label: "Interactive Challenges", value: "50+", icon: Zap },
  { label: "Skill Badges", value: "8", icon: Award },
];

export default function Home() {
  const { totalScore, level, getCompletedCount, getOverallPercentage, isLoaded, completed } = useGame();

  return (
    <div className="page-container">
      {/* Hero */}
      <section style={{ marginBottom: 64, paddingTop: 16 }}>
        <div className="animate-fade-in-up">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.15)", marginBottom: 20 }}>
            <Shield size={14} color="#00f0ff" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#00f0ff", textTransform: "uppercase", letterSpacing: "0.08em" }}>CYB09 • Smart India Hackathon</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Cybersecurity<br />
            <span className="text-gradient">Awareness Simulator</span>
          </h1>
          <p style={{ fontSize: 18, color: "#a0a0b8", maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
            Train your cyber instincts through realistic attack simulations. Learn to identify phishing, protect passwords, and defend against social engineering.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/phishing" className="btn btn-primary btn-lg">
              Start Training <ArrowRight size={18} />
            </Link>
            <Link href="/quiz" className="btn btn-outline btn-lg">
              Take Assessment
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginTop: 48 }}>
          {stats.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,240,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={20} color="#00f0ff" />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#6b6b80" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Score Overview */}
      {isLoaded && totalScore > 0 && (
        <section className="glass-card" style={{ marginBottom: 48, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Progress</h2>
              <p style={{ color: "#a0a0b8", fontSize: 14 }}>{getCompletedCount()}/5 modules completed • Level: <span style={{ color: "#00f0ff" }}>{level}</span></p>
            </div>
            <ScoreCard score={getOverallPercentage()} maxScore={100} label="Overall" />
          </div>
        </section>
      )}

      {/* Modules Grid */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Training Modules</h2>
        <p style={{ color: "#a0a0b8", fontSize: 14, marginBottom: 24 }}>Complete all modules to maximize your cybersecurity awareness score.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {modules.map((m) => {
            const Icon = m.icon;
            const done = isLoaded && completed[Object.keys(completed).find((k) => {
              const mapping = { "/phishing": "phishing", "/passwords": "passwords", "/social-engineering": "socialEngineering", "/safe-browsing": "safeBrowsing" };
              return mapping[m.href] === k;
            })];
            return (
              <Link href={m.href} key={m.href} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{ height: "100%", cursor: "pointer", position: "relative" }}>
                  {done && (
                    <div style={{ position: "absolute", top: 16, right: 16, width: 28, height: 28, borderRadius: 999, background: "rgba(0,255,136,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✓</div>
                  )}
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={24} color={m.color} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{m.title}</h3>
                  <p style={{ fontSize: 14, color: "#a0a0b8", lineHeight: 1.6 }}>{m.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, color: m.color, fontSize: 13, fontWeight: 600 }}>
                    {done ? "Review" : "Start"} Module <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="glass-card" style={{ padding: 40, textAlign: "center", marginBottom: 48, background: "linear-gradient(145deg, rgba(0,240,255,0.05), rgba(180,74,255,0.05))" }}>
        <Brain size={40} color="#ffd600" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Ready to Test Your Knowledge?</h2>
        <p style={{ color: "#a0a0b8", fontSize: 15, marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
          Take our comprehensive 20-question assessment to measure your cybersecurity awareness across all domains.
        </p>
        <Link href="/quiz" className="btn btn-primary btn-lg">
          Start Assessment <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
