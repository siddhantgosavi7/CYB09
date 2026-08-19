"use client";
import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { scenarios } from "./data";
import { Users, ArrowRight, RotateCcw, ChevronRight, Award } from "lucide-react";
import ScoreCard from "@/components/ScoreCard";

export default function SocialEngineeringPage() {
  const { updateScore } = useGame();
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [currentNode, setCurrentNode] = useState("start");
  const [totalEarned, setTotalEarned] = useState(0);
  const [history, setHistory] = useState([]);
  const [completedScenarios, setCompletedScenarios] = useState({});

  const startScenario = (scenario) => {
    setSelectedScenario(scenario);
    setCurrentNode("start");
    setTotalEarned(0);
    setHistory([]);
  };

  const makeChoice = (choice) => {
    setHistory((prev) => [...prev, { node: currentNode, choice: choice.text }]);
    setTotalEarned((prev) => prev + (choice.score || 0));
    setCurrentNode(choice.next);
    const nextNode = selectedScenario.nodes[choice.next];
    if (nextNode.isEnd) {
      const earned = totalEarned + (choice.score || 0) + (nextNode.score || 0);
      const pct = Math.round((earned / selectedScenario.maxScore) * 100);
      setCompletedScenarios((prev) => ({ ...prev, [selectedScenario.id]: pct }));
    }
  };

  const finishAllScenarios = () => {
    const scores = Object.values(completedScenarios);
    if (scores.length > 0) {
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      updateScore("socialEngineering", avg);
    }
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setCurrentNode("start");
    setTotalEarned(0);
    setHistory([]);
  };

  // Scenario list view
  if (!selectedScenario) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>🛡️ Social Engineering <span className="text-gradient">Scenarios</span></h1>
          <p style={{ color: "#a0a0b8", fontSize: 14 }}>Navigate interactive scenarios and learn to recognize manipulation tactics.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 32 }}>
          {scenarios.map((s) => {
            const done = completedScenarios[s.id] !== undefined;
            return (
              <div key={s.id} className="glass-card" style={{ cursor: "pointer" }} onClick={() => startScenario(s)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 40 }}>{s.icon}</span>
                  <span className={`chip ${s.difficulty === "Easy" ? "chip-green" : s.difficulty === "Medium" ? "chip-orange" : "chip-red"}`}>{s.difficulty}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#a0a0b8", lineHeight: 1.6, marginBottom: 16 }}>{s.description}</p>
                {done ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="chip chip-green">✓ Completed</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#00ff88" }}>{completedScenarios[s.id]}%</span>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#00f0ff", fontSize: 14, fontWeight: 600 }}>
                    Start Scenario <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {Object.keys(completedScenarios).length > 0 && (
          <div className="glass-card" style={{ textAlign: "center", padding: 32 }}>
            <Award size={32} color="#ffd600" style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              {Object.keys(completedScenarios).length}/{scenarios.length} Scenarios Completed
            </h3>
            <p style={{ color: "#a0a0b8", fontSize: 14, marginBottom: 20 }}>
              {Object.keys(completedScenarios).length === scenarios.length
                ? "All scenarios completed! Submit your score."
                : "Complete all scenarios to get your final score."}
            </p>
            {Object.keys(completedScenarios).length === scenarios.length && (
              <button onClick={finishAllScenarios} className="btn btn-primary btn-lg">
                Submit Score <Award size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Active scenario view
  const node = selectedScenario.nodes[currentNode];

  return (
    <div className="page-container" style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 24 }}>{selectedScenario.icon}</span>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>{selectedScenario.title}</h2>
          </div>
          <p style={{ fontSize: 13, color: "#6b6b80" }}>Step {history.length + 1}</p>
        </div>
        <button onClick={resetScenario} className="btn btn-ghost">
          <RotateCcw size={16} /> Back
        </button>
      </div>

      {/* Story */}
      <div className="glass-card no-hover" style={{ marginBottom: 24, padding: 28 }}>
        <div style={{ fontSize: 16, lineHeight: 1.8, color: "#e0e0ec", whiteSpace: "pre-wrap" }}>
          {node.text}
        </div>
      </div>

      {/* Choices */}
      {node.choices && node.choices.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 13, color: "#6b6b80", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Choose your action:</div>
          {node.choices.map((choice, i) => (
            <button key={i} className="scenario-choice" onClick={() => makeChoice(choice)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,240,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#00f0ff", flexShrink: 0 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ fontSize: 14, color: "#e0e0ec" }}>{choice.text}</span>
                <ChevronRight size={16} style={{ marginLeft: "auto", color: "#6b6b80", flexShrink: 0 }} />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* End state */}
      {node.isEnd && (
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <ScoreCard score={Math.round(((totalEarned + (node.score || 0)) / selectedScenario.maxScore) * 100)} maxScore={100} label="Scenario Score" color="#ff8800" />
          <button onClick={resetScenario} className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>
            Back to Scenarios <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
