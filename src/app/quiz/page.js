"use client";
import { useState, useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { quizQuestions } from "./data";
import { Brain, ArrowRight, ArrowLeft, CheckCircle, Clock, RotateCcw, Award } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";
import Timer from "@/components/Timer";

export default function QuizPage() {
  const { updateScore } = useGame();
  const [phase, setPhase] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timedMode, setTimedMode] = useState(false);

  const questions = useMemo(() => [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 20), []);

  const handleAnswer = (optIndex) => {
    if (showExplanation) return;
    setAnswers((prev) => ({ ...prev, [currentQ]: optIndex }));
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentQ < questions.length - 1) {
      setCurrentQ((p) => p + 1);
    } else {
      const correct = questions.filter((q, i) => answers[i] === q.answer).length;
      const score = Math.round((correct / questions.length) * 100);
      updateScore("quiz", score);
      setPhase("results");
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setShowExplanation(false);
      setCurrentQ((p) => p - 1);
    }
  };

  const handleTimerEnd = () => {
    const correct = questions.filter((q, i) => answers[i] === q.answer).length;
    const score = Math.round((correct / questions.length) * 100);
    updateScore("quiz", score);
    setPhase("results");
  };

  const reset = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers({});
    setShowExplanation(false);
  };

  const correct = questions.filter((q, i) => answers[i] === q.answer).length;
  const categoryScores = {};
  questions.forEach((q, i) => {
    if (!categoryScores[q.category]) categoryScores[q.category] = { correct: 0, total: 0 };
    categoryScores[q.category].total++;
    if (answers[i] === q.answer) categoryScores[q.category].correct++;
  });

  if (phase === "intro") {
    return (
      <div className="page-container">
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(255,214,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Brain size={36} color="#ffd600" />
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Cybersecurity <span className="text-gradient">Assessment</span></h1>
          <p style={{ color: "#a0a0b8", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Test your cybersecurity awareness across phishing, passwords, social engineering, and safe browsing. {questions.length} questions, immediate feedback after each answer.
          </p>

          <div className="glass-card" style={{ marginBottom: 24, padding: 24, textAlign: "left" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Choose your mode:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={() => { setTimedMode(false); setPhase("playing"); }} className="scenario-choice" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Brain size={24} color="#00f0ff" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Practice Mode</div>
                  <div style={{ fontSize: 13, color: "#6b6b80" }}>No time limit — learn at your own pace</div>
                </div>
              </button>
              <button onClick={() => { setTimedMode(true); setPhase("playing"); }} className="scenario-choice" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Clock size={24} color="#ff8800" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Timed Challenge</div>
                  <div style={{ fontSize: 13, color: "#6b6b80" }}>10 minutes — race against the clock!</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const catLabels = { phishing: "Phishing", passwords: "Passwords", socialEngineering: "Social Eng.", safeBrowsing: "Safe Browsing", general: "General" };
    const catColors = { phishing: "#ff2d7b", passwords: "#b44aff", socialEngineering: "#ff8800", safeBrowsing: "#00ff88", general: "#00f0ff" };
    return (
      <div className="page-container" style={{ maxWidth: 700 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Award size={48} color="#ffd600" style={{ marginBottom: 16 }} />
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Assessment Complete!</h1>
          <p style={{ color: "#a0a0b8", fontSize: 16 }}>You scored {correct}/{questions.length}</p>
        </div>

        <div className="glass-card" style={{ padding: 32, marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          <ScoreCard score={Math.round((correct / questions.length) * 100)} maxScore={100} label="Overall Score" color="#ffd600" />
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Category Breakdown</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
          {Object.entries(categoryScores).map(([cat, data]) => (
            <div key={cat} className="glass-card no-hover" style={{ padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#6b6b80", marginBottom: 8 }}>{catLabels[cat] || cat}</div>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: catColors[cat] || "#00f0ff" }}>
                {data.correct}/{data.total}
              </div>
              <div style={{ height: 4, background: "rgba(26,26,46,1)", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: `${(data.correct / data.total) * 100}%`, height: "100%", borderRadius: 999, background: catColors[cat] || "#00f0ff" }} />
              </div>
            </div>
          ))}
        </div>

        <button onClick={reset} className="btn btn-primary btn-lg" style={{ width: "100%" }}>
          <RotateCcw size={18} /> Retake Assessment
        </button>
      </div>
    );
  }

  // Playing
  const q = questions[currentQ];
  return (
    <div className="page-container" style={{ maxWidth: 700 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <span className={`chip ${q.category === "phishing" ? "chip-pink" : q.category === "passwords" ? "chip-purple" : q.category === "socialEngineering" ? "chip-orange" : q.category === "safeBrowsing" ? "chip-green" : "chip-cyan"}`}>
            {q.category === "socialEngineering" ? "Social Engineering" : q.category === "safeBrowsing" ? "Safe Browsing" : q.category.charAt(0).toUpperCase() + q.category.slice(1)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {timedMode && <Timer seconds={600} onComplete={handleTimerEnd} />}
          <span style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: "#6b6b80" }}>
            {currentQ + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 4, background: "rgba(26,26,46,1)", borderRadius: 999, marginBottom: 32, overflow: "hidden" }}>
        <div style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, height: "100%", borderRadius: 999, background: "linear-gradient(135deg, #00f0ff, #b44aff)", transition: "width 0.3s" }} />
      </div>

      <div className="glass-card no-hover" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5, marginBottom: 28 }}>
          <span style={{ color: "#00f0ff", fontFamily: "'JetBrains Mono', monospace", marginRight: 8 }}>Q{currentQ + 1}.</span>
          {q.question}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, oi) => {
            let cls = "quiz-option";
            if (showExplanation) {
              if (oi === q.answer) cls += " correct";
              else if (answers[currentQ] === oi) cls += " incorrect";
            } else if (answers[currentQ] === oi) cls += " selected";
            return (
              <button key={oi} className={cls} onClick={() => handleAnswer(oi)}>
                <span className="quiz-option-marker">{String.fromCharCode(65 + oi)}</span>
                <span style={{ fontSize: 14 }}>{opt}</span>
              </button>
            );
          })}
        </div>
        {showExplanation && (
          <div style={{ marginTop: 20, padding: 16, background: "rgba(0,240,255,0.04)", borderRadius: 10, border: "1px solid rgba(0,240,255,0.1)", fontSize: 14, color: "#a0a0b8", lineHeight: 1.6 }}>
            💡 {q.explanation}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={prevQuestion} className="btn btn-ghost" disabled={currentQ === 0} style={{ opacity: currentQ === 0 ? 0.3 : 1 }}>
          <ArrowLeft size={16} /> Previous
        </button>
        {showExplanation && (
          <button onClick={nextQuestion} className="btn btn-primary">
            {currentQ < questions.length - 1 ? "Next" : "See Results"} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
