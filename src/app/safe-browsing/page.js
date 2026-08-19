"use client";
import { useState, useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { urlChallenges, downloadChallenges, browsingTips } from "./data";
import { Globe, ShieldCheck, ShieldAlert, CheckCircle, XCircle, ArrowRight, RotateCcw, Download, Link2, Lightbulb } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";

export default function SafeBrowsingPage() {
  const { updateScore } = useGame();
  const [tab, setTab] = useState("urls"); // urls, downloads, tips
  const [urlAnswers, setUrlAnswers] = useState({});
  const [dlAnswers, setDlAnswers] = useState({});
  const [urlSubmitted, setUrlSubmitted] = useState(false);
  const [dlSubmitted, setDlSubmitted] = useState(false);

  const shuffledUrls = useMemo(() => [...urlChallenges].sort(() => Math.random() - 0.5).slice(0, 8), []);
  const shuffledDls = useMemo(() => [...downloadChallenges].sort(() => Math.random() - 0.5), []);

  const handleUrlSubmit = () => {
    setUrlSubmitted(true);
  };

  const handleDlSubmit = () => {
    setDlSubmitted(true);
    // Calculate combined score
    let correct = 0;
    let total = 0;
    shuffledUrls.forEach((u) => { if (urlAnswers[u.id] !== undefined) { total++; if ((urlAnswers[u.id] === "malicious") === u.isMalicious) correct++; } });
    shuffledDls.forEach((d) => { if (dlAnswers[d.id] !== undefined) { total++; if ((dlAnswers[d.id] === "unsafe") === !d.isSafe) correct++; } });
    if (total > 0) updateScore("safeBrowsing", Math.round((correct / total) * 100));
  };

  const urlCorrect = shuffledUrls.filter((u) => urlAnswers[u.id] !== undefined && (urlAnswers[u.id] === "malicious") === u.isMalicious).length;
  const dlCorrect = shuffledDls.filter((d) => dlAnswers[d.id] !== undefined && (dlAnswers[d.id] === "unsafe") === !d.isSafe).length;

  const tabs = [
    { id: "urls", label: "URL Inspector", icon: Link2 },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "tips", label: "Safety Tips", icon: Lightbulb },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>🌐 Safe Browsing <span className="text-gradient">Challenge</span></h1>
        <p style={{ color: "#a0a0b8", fontSize: 14 }}>Identify malicious URLs and unsafe downloads.</p>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 32, padding: 4, background: "rgba(255,255,255,0.03)", borderRadius: 12, width: "fit-content" }}>
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              background: tab === t.id ? "rgba(0,255,136,0.1)" : "transparent",
              color: tab === t.id ? "#00ff88" : "#6b6b80",
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
              border: tab === t.id ? "1px solid rgba(0,255,136,0.2)" : "1px solid transparent",
            }}>
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "urls" && (
        <div>
          {urlSubmitted && (
            <div className="glass-card" style={{ marginBottom: 24, padding: 24, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <ScoreCard score={Math.round((urlCorrect / shuffledUrls.length) * 100)} maxScore={100} label="URL Detection" color="#00ff88" />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{urlCorrect}/{shuffledUrls.length} Correct</div>
                <p style={{ fontSize: 14, color: "#a0a0b8" }}>Now try the Downloads tab!</p>
              </div>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {shuffledUrls.map((item) => {
              const answered = urlAnswers[item.id] !== undefined;
              const isCorrect = answered && (urlAnswers[item.id] === "malicious") === item.isMalicious;
              return (
                <div key={item.id} className="glass-card no-hover" style={{
                  borderColor: urlSubmitted ? (isCorrect ? "rgba(0,255,136,0.3)" : "rgba(255,51,85,0.3)") : answered ? "rgba(0,240,255,0.2)" : undefined,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      flex: 1, padding: "10px 14px", background: "rgba(0,0,0,0.3)", borderRadius: 8,
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 13, wordBreak: "break-all",
                      color: item.isMalicious ? "#ff8800" : "#a0a0b8",
                    }}>
                      {item.url}
                    </div>
                    <span className={`chip ${item.difficulty === "easy" ? "chip-green" : item.difficulty === "medium" ? "chip-orange" : "chip-red"}`} style={{ fontSize: 9, flexShrink: 0 }}>
                      {item.difficulty}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => !urlSubmitted && setUrlAnswers((p) => ({ ...p, [item.id]: "safe" }))}
                      className={`btn ${urlAnswers[item.id] === "safe" ? "btn-success" : "btn-ghost"}`}
                      style={{ flex: 1, fontSize: 13 }}
                      disabled={urlSubmitted}
                    >
                      <ShieldCheck size={14} /> Safe
                    </button>
                    <button
                      onClick={() => !urlSubmitted && setUrlAnswers((p) => ({ ...p, [item.id]: "malicious" }))}
                      className={`btn ${urlAnswers[item.id] === "malicious" ? "btn-danger" : "btn-ghost"}`}
                      style={{ flex: 1, fontSize: 13 }}
                      disabled={urlSubmitted}
                    >
                      <ShieldAlert size={14} /> Malicious
                    </button>
                  </div>
                  {urlSubmitted && (
                    <div style={{ marginTop: 12, padding: 12, background: isCorrect ? "rgba(0,255,136,0.04)" : "rgba(255,51,85,0.04)", borderRadius: 8, fontSize: 13, color: "#a0a0b8", display: "flex", gap: 8 }}>
                      {isCorrect ? <CheckCircle size={16} color="#00ff88" style={{ flexShrink: 0, marginTop: 1 }} /> : <XCircle size={16} color="#ff3355" style={{ flexShrink: 0, marginTop: 1 }} />}
                      <span>{item.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {!urlSubmitted && Object.keys(urlAnswers).length === shuffledUrls.length && (
            <button onClick={handleUrlSubmit} className="btn btn-primary btn-lg" style={{ marginTop: 24, width: "100%" }}>
              Check Answers <CheckCircle size={18} />
            </button>
          )}
        </div>
      )}

      {tab === "downloads" && (
        <div>
          {dlSubmitted && (
            <div className="glass-card" style={{ marginBottom: 24, padding: 24, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <ScoreCard score={Math.round((dlCorrect / shuffledDls.length) * 100)} maxScore={100} label="Download Safety" color="#00ff88" />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{dlCorrect}/{shuffledDls.length} Correct</div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {shuffledDls.map((item) => {
              const answered = dlAnswers[item.id] !== undefined;
              const isCorrect = answered && (dlAnswers[item.id] === "unsafe") === !item.isSafe;
              return (
                <div key={item.id} className="glass-card no-hover" style={{
                  borderColor: dlSubmitted ? (isCorrect ? "rgba(0,255,136,0.3)" : "rgba(255,51,85,0.3)") : undefined,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,240,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Download size={20} color="#00f0ff" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, fontFamily: "'JetBrains Mono', monospace" }}>{item.filename}</div>
                      <div style={{ fontSize: 12, color: "#6b6b80" }}>Source: {item.source} • Size: {item.fileSize}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => !dlSubmitted && setDlAnswers((p) => ({ ...p, [item.id]: "safe" }))}
                      className={`btn ${dlAnswers[item.id] === "safe" ? "btn-success" : "btn-ghost"}`}
                      style={{ flex: 1, fontSize: 13 }}
                      disabled={dlSubmitted}
                    >
                      <ShieldCheck size={14} /> Safe to Download
                    </button>
                    <button
                      onClick={() => !dlSubmitted && setDlAnswers((p) => ({ ...p, [item.id]: "unsafe" }))}
                      className={`btn ${dlAnswers[item.id] === "unsafe" ? "btn-danger" : "btn-ghost"}`}
                      style={{ flex: 1, fontSize: 13 }}
                      disabled={dlSubmitted}
                    >
                      <ShieldAlert size={14} /> Unsafe
                    </button>
                  </div>
                  {dlSubmitted && (
                    <div style={{ marginTop: 12, padding: 12, background: isCorrect ? "rgba(0,255,136,0.04)" : "rgba(255,51,85,0.04)", borderRadius: 8, fontSize: 13, color: "#a0a0b8", display: "flex", gap: 8 }}>
                      {isCorrect ? <CheckCircle size={16} color="#00ff88" style={{ flexShrink: 0, marginTop: 1 }} /> : <XCircle size={16} color="#ff3355" style={{ flexShrink: 0, marginTop: 1 }} />}
                      <span>{item.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {!dlSubmitted && Object.keys(dlAnswers).length === shuffledDls.length && (
            <button onClick={handleDlSubmit} className="btn btn-primary btn-lg" style={{ marginTop: 24, width: "100%" }}>
              Submit & Get Score <CheckCircle size={18} />
            </button>
          )}
        </div>
      )}

      {tab === "tips" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {browsingTips.map((tip, i) => (
            <div key={i} className="glass-card" style={{ cursor: "default" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{tip.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{tip.title}</h3>
              <p style={{ fontSize: 14, color: "#a0a0b8", lineHeight: 1.6 }}>{tip.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
