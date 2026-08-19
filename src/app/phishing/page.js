"use client";
import { useState, useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { phishingEmails } from "./data";
import { Mail, AlertTriangle, CheckCircle, XCircle, ShieldCheck, ShieldAlert, ArrowRight, RotateCcw, Eye, ChevronDown, ChevronUp } from "lucide-react";
import Modal from "@/components/Modal";
import ScoreCard from "@/components/ScoreCard";

export default function PhishingPage() {
  const { updateScore, scores } = useGame();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [phase, setPhase] = useState("intro"); // intro, playing, results

  const emails = useMemo(() => [...phishingEmails].sort(() => Math.random() - 0.5).slice(0, 8), []);

  const handleAnswer = (emailId, isPhishing) => {
    setAnswers((prev) => ({ ...prev, [emailId]: isPhishing }));
  };

  const calculateScore = () => {
    let correct = 0;
    emails.forEach((email) => {
      if (answers[email.id] !== undefined && answers[email.id] === email.isPhishing) correct++;
    });
    return Math.round((correct / emails.length) * 100);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    updateScore("phishing", score);
    setShowResults(true);
    setPhase("results");
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedEmail(null);
    setShowResults(false);
    setExpandedEmail(null);
    setPhase("intro");
  };

  const answeredCount = Object.keys(answers).length;

  if (phase === "intro") {
    return (
      <div className="page-container">
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(255,45,123,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Mail size={36} color="#ff2d7b" />
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Phishing <span className="text-gradient">Simulator</span></h1>
          <p style={{ color: "#a0a0b8", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            You'll see {emails.length} emails in a simulated inbox. For each email, decide if it's <strong style={{ color: "#00ff88" }}>legitimate</strong> or a <strong style={{ color: "#ff3355" }}>phishing attempt</strong>. Look for red flags like suspicious domains, urgency tactics, and unusual requests.
          </p>
          <div className="glass-card" style={{ textAlign: "left", marginBottom: 32, padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎯 What to Look For:</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Sender email domain — is it official?", "Urgency language — threatening account closure?", "Generic greetings — 'Dear Customer' vs your name", "Suspicious links — hover to check the URL", "Requests for sensitive info — passwords, OTP, bank details"].map((tip, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "#a0a0b8" }}>
                  <span style={{ color: "#00f0ff", fontWeight: 700 }}>→</span> {tip}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => setPhase("playing")} className="btn btn-primary btn-lg">
            Start Simulation <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>📧 Email Inbox</h1>
            <p style={{ color: "#a0a0b8", fontSize: 14 }}>
              {showResults ? "Review your results below" : `Classify each email • ${answeredCount}/${emails.length} answered`}
            </p>
          </div>
          {!showResults && answeredCount === emails.length && (
            <button onClick={handleSubmit} className="btn btn-primary btn-lg">
              Submit Answers <CheckCircle size={18} />
            </button>
          )}
          {showResults && (
            <button onClick={handleReset} className="btn btn-outline">
              <RotateCcw size={16} /> Try Again
            </button>
          )}
        </div>
        {!showResults && (
          <div style={{ marginTop: 16, height: 6, background: "rgba(26,26,46,1)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${(answeredCount / emails.length) * 100}%`, height: "100%", borderRadius: 999, background: "linear-gradient(135deg, #00f0ff, #b44aff)", transition: "width 0.3s ease" }} />
          </div>
        )}
      </div>

      {showResults && (
        <div className="glass-card" style={{ marginBottom: 32, padding: 32, display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 24 }}>
          <ScoreCard score={calculateScore()} maxScore={100} label="Phishing Detection" color="#ff2d7b" />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              {calculateScore() >= 80 ? "🌟 Excellent!" : calculateScore() >= 60 ? "👍 Good effort!" : "📚 Keep learning!"}
            </div>
            <p style={{ color: "#a0a0b8", fontSize: 14, maxWidth: 300 }}>
              You correctly identified {emails.filter((e) => answers[e.id] === e.isPhishing).length} out of {emails.length} emails.
              {calculateScore() < 80 && " Review the red flags below to improve."}
            </p>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {emails.map((email) => {
          const answered = answers[email.id] !== undefined;
          const isCorrect = answered && answers[email.id] === email.isPhishing;
          const isExpanded = expandedEmail === email.id;
          const resultClass = showResults ? (isCorrect ? "correct" : "incorrect") : answered ? "selected" : "";

          return (
            <div key={email.id} className={`email-card ${resultClass}`}>
              <div onClick={() => setExpandedEmail(isExpanded ? null : email.id)} style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{email.senderDisplay}</span>
                      <span className={`chip ${email.difficulty === "easy" ? "chip-green" : email.difficulty === "medium" ? "chip-orange" : "chip-red"}`} style={{ fontSize: 9 }}>
                        {email.difficulty}
                      </span>
                      {showResults && (
                        isCorrect
                          ? <CheckCircle size={16} color="#00ff88" />
                          : <XCircle size={16} color="#ff3355" />
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#6b6b80", marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>{email.sender}</div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{email.subject}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#6b6b80" }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 14, color: "#a0a0b8", whiteSpace: "pre-wrap", lineHeight: 1.7, marginBottom: 20, padding: 16, background: "rgba(0,0,0,0.2)", borderRadius: 10 }}>
                    {email.body}
                  </div>

                  {!showResults && (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={() => handleAnswer(email.id, false)}
                        className={`btn ${answers[email.id] === false ? "btn-success" : "btn-ghost"}`}
                        style={{ flex: 1 }}
                      >
                        <ShieldCheck size={16} /> Legitimate
                      </button>
                      <button
                        onClick={() => handleAnswer(email.id, true)}
                        className={`btn ${answers[email.id] === true ? "btn-danger" : "btn-ghost"}`}
                        style={{ flex: 1 }}
                      >
                        <ShieldAlert size={16} /> Phishing
                      </button>
                    </div>
                  )}

                  {showResults && email.isPhishing && email.redFlags.length > 0 && (
                    <div style={{ padding: 16, background: "rgba(255,45,123,0.05)", borderRadius: 10, border: "1px solid rgba(255,45,123,0.1)" }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#ff2d7b", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                        <AlertTriangle size={14} /> Red Flags
                      </div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {email.redFlags.map((flag, i) => (
                          <li key={i} style={{ fontSize: 13, color: "#a0a0b8", display: "flex", gap: 8 }}>
                            <span style={{ color: "#ff2d7b" }}>•</span> {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {showResults && !email.isPhishing && (
                    <div style={{ padding: 16, background: "rgba(0,255,136,0.05)", borderRadius: 10, border: "1px solid rgba(0,255,136,0.1)" }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#00ff88", display: "flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle size={14} /> This is a legitimate email
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
