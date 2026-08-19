"use client";
import { useEffect, useState } from "react";
export default function Timer({ seconds, onComplete, isRunning = true }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => { setTimeLeft(seconds); }, [seconds]);
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) { if (timeLeft <= 0 && onComplete) onComplete(); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [isRunning, timeLeft, onComplete]);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isLow = timeLeft <= 10;
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700,
      color: isLow ? "#ff3355" : "#00f0ff",
      padding: "6px 16px", borderRadius: 10,
      background: isLow ? "rgba(255,51,85,0.1)" : "rgba(0,240,255,0.06)",
      border: `1px solid ${isLow ? "rgba(255,51,85,0.3)" : "rgba(0,240,255,0.15)"}`,
      animation: isLow ? "pulse 1s infinite" : "none",
    }}>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}
