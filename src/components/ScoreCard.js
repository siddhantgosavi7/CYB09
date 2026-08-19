"use client";
import { useEffect, useState } from "react";
export default function ScoreCard({ score, maxScore, label, color = "#00f0ff" }) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(percentage / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= percentage) { setDisplayScore(percentage); clearInterval(timer); }
      else setDisplayScore(start);
    }, 30);
    return () => clearInterval(timer);
  }, [percentage]);
  const radius = 50, circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#b44aff" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle cx="60" cy="60" r={radius} fill="none" stroke={`url(#grad-${label})`} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color }}>{displayScore}%</div>
        </div>
      </div>
      {label && <div style={{ fontSize: 13, color: "#a0a0b8", fontWeight: 500 }}>{label}</div>}
    </div>
  );
}
