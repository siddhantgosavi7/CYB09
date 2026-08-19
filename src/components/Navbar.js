"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { Shield, Mail, KeyRound, Users, Globe, Brain, LayoutDashboard, Trophy, Menu, X, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Shield, color: "#00f0ff" },
  { href: "/phishing", label: "Phishing Sim", icon: Mail, color: "#ff2d7b" },
  { href: "/passwords", label: "Password Lab", icon: KeyRound, color: "#b44aff" },
  { href: "/social-engineering", label: "Social Eng.", icon: Users, color: "#ff8800" },
  { href: "/safe-browsing", label: "Safe Browsing", icon: Globe, color: "#00ff88" },
  { href: "/quiz", label: "Assessment", icon: Brain, color: "#ffd600" },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#00f0ff" },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy, color: "#ffd600" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { totalScore, level, getCompletedCount } = useGame();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed", top: 16, left: 16, zIndex: 1001,
          display: "none", width: 44, height: 44, borderRadius: 10,
          background: "rgba(22,22,35,0.95)", border: "1px solid rgba(255,255,255,0.06)",
          color: "#f0f0f5", alignItems: "center", justifyContent: "center",
        }}
        className="mobile-nav-toggle"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav style={{
        position: "fixed", top: 0, left: 0, width: 260, height: "100vh",
        background: "rgba(12,12,20,0.95)", backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column", padding: "24px 0",
        zIndex: 1000,
        transform: isOpen ? "translateX(0)" : undefined,
        transition: "transform 0.3s ease",
      }}
      className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
      >
        {/* Logo */}
        <Link href="/" style={{ padding: "0 20px", marginBottom: 32, textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "linear-gradient(135deg, #00f0ff, #b44aff)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Shield size={22} color="#000" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#f0f0f5", letterSpacing: "-0.02em" }}>CYB09</div>
              <div style={{ fontSize: 10, color: "#6b6b80", textTransform: "uppercase", letterSpacing: "0.1em" }}>Cyber Simulator</div>
            </div>
          </div>
        </Link>

        {/* Score card */}
        <div style={{
          margin: "0 16px 24px", padding: "14px 16px",
          background: "rgba(0,240,255,0.04)", borderRadius: 12,
          border: "1px solid rgba(0,240,255,0.1)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "#6b6b80", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Score</span>
            <span style={{
              fontSize: 10, padding: "2px 8px", borderRadius: 999,
              background: "rgba(0,240,255,0.1)", color: "#00f0ff",
              border: "1px solid rgba(0,240,255,0.2)", fontWeight: 600,
            }}>{level}</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", background: "linear-gradient(135deg, #00f0ff, #b44aff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {totalScore}
          </div>
          <div style={{ fontSize: 11, color: "#6b6b80", marginTop: 4 }}>{getCompletedCount()}/5 modules completed</div>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.href} onClick={() => setIsOpen(false)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", margin: "2px 0", borderRadius: 10,
                background: isActive ? `${item.color}10` : "transparent",
                color: isActive ? item.color : "#a0a0b8",
                textDecoration: "none", fontSize: 14, fontWeight: isActive ? 600 : 400,
                transition: "all 0.2s ease",
                borderLeft: isActive ? `3px solid ${item.color}` : "3px solid transparent",
              }}>
                <Icon size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {isActive && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
              </Link>
            );
          })}
        </div>

        {/* Bottom */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "#6b6b80" }}>
          SIH 2024 • CYB09
        </div>
      </nav>

      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-nav-toggle { display: flex !important; }
          .sidebar { transform: translateX(-100%); }
          .sidebar.sidebar-open { transform: translateX(0) !important; }
        }
      `}</style>
    </>
  );
}
