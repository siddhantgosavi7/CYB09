"use client";
import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { analyzePassword, passwordTips, passwordQuiz } from "./data";
import { KeyRound, Eye, EyeOff, Shield, Zap, CheckCircle, XCircle, ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";

export default function PasswordsPage() {
  const { updateScore } = useGame();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [tab, setTab] = useState("analyzer"); // analyzer, quiz, tips
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [crackAnimation, setCrackAnimation] = useState(false);
  const [crackedCount, setCrackedCount] = useState(0);

  useEffect(() => {
    setAnalysis(analyzePassword(password));
  }, [password]);

  useEffect(() => {
    if (password && crackAnimation) {
      const count = password.length * 3;
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setCrackedCount(i);
        if (i >= count) { clearInterval(timer); setCrackAnimation(false); }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [crackAnimation, password]);

  const handleCrackDemo = () => {
    setCrackAnimation(true);
    setCrackedCount(0);
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    passwordQuiz.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) correct++;
    });
    const score = Math.round((correct / passwordQuiz.length) * 100);
    updateScore("passwords", score);
    setQuizSubmitted(true);
  };

  const strengthColors = { none: "#6b6b80", weak: "#ff3355", fair: "#ff8800", good: "#ffd600", strong: "#00ff88", excellent: "#00f0ff" };
  const strengthLabels = { none: "Enter a password", weak: "Weak", fair: "Fair", good: "Good", strong: "Strong", excellent: "Excellent" };
  const level = analysis?.level || "none";

  const tabs = [
    { id: "analyzer", label: "Analyzer", icon: Shield },
    { id: "quiz", label: "Challenge", icon: Zap },
    { id: "tips", label: "Tips", icon: Lightbulb },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>🔐 Password <span className="text-gradient">Security Lab</span></h1>
        <p style={{ color: "#a0a0b8", fontSize: 14 }}>Test password strength, learn about attacks, and take the quiz.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 32, padding: 4, background: "rgba(255,255,255,0.03)", borderRadius: 12, width: "fit-content" }}>
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              background: tab === t.id ? "rgba(0,240,255,0.1)" : "transparent",
              color: tab === t.id ? "#00f0ff" : "#6b6b80",
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
              border: tab === t.id ? "1px solid rgba(0,240,255,0.2)" : "1px solid transparent",
            }}>
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "analyzer" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div className="glass-card no-hover" style={{ gridColumn: undefined }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Password Analyzer</h3>
            
            {/* Input */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a password to test..."
                className="input"
                style={{ paddingRight: 44, fontSize: 16, fontFamily: "'JetBrains Mono', monospace" }}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#6b6b80" }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Strength meter */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#a0a0b8" }}>Strength</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: strengthColors[level] }}>{strengthLabels[level]}</span>
              </div>
              <div className="strength-meter">
                {[1, 2, 3, 4, 5].map((i) => {
                  const levels = ["weak", "fair", "good", "strong", "excellent"];
                  const idx = levels.indexOf(level);
                  return <div key={i} className={`strength-bar ${i <= idx + 1 && level !== "none" ? `active ${level}` : ""}`} />;
                })}
              </div>
            </div>

            {/* Crack time */}
            {analysis && level !== "none" && (
              <div style={{ padding: 16, background: `${strengthColors[level]}08`, borderRadius: 10, border: `1px solid ${strengthColors[level]}20`, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 4 }}>Estimated Crack Time</div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: strengthColors[level] }}>
                  {analysis.crackTime}
                </div>
              </div>
            )}

            {/* Demo button */}
            {password && (
              <button onClick={handleCrackDemo} className="btn btn-danger w-full" style={{ marginBottom: 16 }}>
                <Zap size={16} /> Simulate Brute Force Attack
              </button>
            )}
            {crackAnimation && (
              <div style={{ padding: 16, background: "rgba(255,51,85,0.05)", borderRadius: 10, border: "1px solid rgba(255,51,85,0.1)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                <div style={{ color: "#ff3355", marginBottom: 8 }}>Attempting combinations...</div>
                <div style={{ color: "#a0a0b8" }}>{crackedCount.toLocaleString()} / {(password.length * 3).toLocaleString()} attempts</div>
                <div className="progress-bar" style={{ marginTop: 8 }}>
                  <div className="progress-bar-fill" style={{ width: `${(crackedCount / (password.length * 3)) * 100}%`, background: "linear-gradient(135deg, #ff3355, #ff8800)" }} />
                </div>
              </div>
            )}
          </div>

          <div className="glass-card no-hover">
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Security Checklist</h3>
            {analysis && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { key: "length8", label: "At least 8 characters" },
                  { key: "length12", label: "12+ characters (recommended)" },
                  { key: "uppercase", label: "Contains uppercase letters" },
                  { key: "lowercase", label: "Contains lowercase letters" },
                  { key: "numbers", label: "Contains numbers" },
                  { key: "special", label: "Contains special characters" },
                  { key: "noCommon", label: "Not a common password" },
                  { key: "noRepeating", label: "No repeating characters" },
                  { key: "noSequential", label: "No sequential patterns" },
                ].map(({ key, label }) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    {analysis.checks[key]
                      ? <CheckCircle size={16} color="#00ff88" />
                      : <XCircle size={16} color={level === "none" ? "#6b6b80" : "#ff3355"} />}
                    <span style={{ color: analysis.checks[key] ? "#f0f0f5" : "#6b6b80" }}>{label}</span>
                  </div>
                ))}
              </div>
            )}
            {analysis && analysis.feedback.length > 0 && level !== "none" && (
              <div style={{ marginTop: 20, padding: 16, background: "rgba(255,136,0,0.05)", borderRadius: 10, border: "1px solid rgba(255,136,0,0.1)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#ff8800", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertTriangle size={14} /> Suggestions
                </div>
                {analysis.feedback.map((f, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#a0a0b8", marginBottom: 4 }}>• {f}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "quiz" && (
        <div style={{ maxWidth: 700 }}>
          <div className="glass-card no-hover" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Password Security Quiz</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {passwordQuiz.map((q, qi) => (
                <div key={qi}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>
                    <span style={{ color: "#00f0ff", fontFamily: "'JetBrains Mono', monospace", marginRight: 8 }}>Q{qi + 1}.</span>
                    {q.question}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {q.options.map((opt, oi) => {
                      let cls = "quiz-option";
                      if (quizSubmitted) {
                        if (oi === q.answer) cls += " correct";
                        else if (quizAnswers[qi] === oi) cls += " incorrect";
                      } else if (quizAnswers[qi] === oi) cls += " selected";
                      return (
                        <button key={oi} className={cls} onClick={() => !quizSubmitted && setQuizAnswers((p) => ({ ...p, [qi]: oi }))}>
                          <span className="quiz-option-marker">{String.fromCharCode(65 + oi)}</span>
                          <span style={{ fontSize: 14 }}>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div style={{ marginTop: 10, padding: 12, background: "rgba(0,240,255,0.04)", borderRadius: 8, fontSize: 13, color: "#a0a0b8" }}>
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!quizSubmitted && Object.keys(quizAnswers).length === passwordQuiz.length && (
              <button onClick={handleQuizSubmit} className="btn btn-primary btn-lg" style={{ marginTop: 24, width: "100%" }}>
                Submit Answers <CheckCircle size={18} />
              </button>
            )}
            {quizSubmitted && (
              <div style={{ marginTop: 24, padding: 20, background: "rgba(0,255,136,0.05)", borderRadius: 12, border: "1px solid rgba(0,255,136,0.1)", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  Score: {passwordQuiz.filter((q, i) => quizAnswers[i] === q.answer).length}/{passwordQuiz.length}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "tips" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {passwordTips.map((tip, i) => (
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
