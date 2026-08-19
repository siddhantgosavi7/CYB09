"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const GameContext = createContext(null);

const DEFAULT_STATE = {
  username: "",
  scores: { phishing: 0, passwords: 0, socialEngineering: 0, safeBrowsing: 0, quiz: 0 },
  completed: { phishing: false, passwords: false, socialEngineering: false, safeBrowsing: false, quiz: false },
  totalScore: 0,
  level: "Beginner",
  badges: [],
  quizHistory: [],
  moduleAttempts: { phishing: 0, passwords: 0, socialEngineering: 0, safeBrowsing: 0, quiz: 0 },
};

const LEVELS = [
  { name: "Novice", min: 0 },
  { name: "Beginner", min: 100 },
  { name: "Intermediate", min: 300 },
  { name: "Advanced", min: 500 },
  { name: "Expert", min: 750 },
  { name: "Cyber Guardian", min: 1000 },
];

const BADGES = [
  { id: "phishing_master", name: "Phishing Master", desc: "Score 80%+ on phishing simulator", icon: "🎣", module: "phishing", threshold: 80 },
  { id: "password_pro", name: "Password Pro", desc: "Complete password module with 80%+", icon: "🔐", module: "passwords", threshold: 80 },
  { id: "social_shield", name: "Social Shield", desc: "Score 80%+ on social engineering", icon: "🛡️", module: "socialEngineering", threshold: 80 },
  { id: "safe_surfer", name: "Safe Surfer", desc: "Complete safe browsing with 80%+", icon: "🏄", module: "safeBrowsing", threshold: 80 },
  { id: "quiz_whiz", name: "Quiz Whiz", desc: "Score 80%+ on the quiz", icon: "🧠", module: "quiz", threshold: 80 },
  { id: "first_steps", name: "First Steps", desc: "Complete your first module", icon: "👣", module: "any", threshold: 0 },
  { id: "completionist", name: "Completionist", desc: "Complete all modules", icon: "🏆", module: "all", threshold: 0 },
  { id: "perfect_score", name: "Perfect Score", desc: "Get 100% on any module", icon: "⭐", module: "any_perfect", threshold: 100 },
];

export function GameProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cyb09_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...DEFAULT_STATE, ...parsed, scores: { ...DEFAULT_STATE.scores, ...parsed.scores }, completed: { ...DEFAULT_STATE.completed, ...parsed.completed }, moduleAttempts: { ...DEFAULT_STATE.moduleAttempts, ...parsed.moduleAttempts } });
      }
    } catch (e) { console.error("Failed to load state", e); }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try { localStorage.setItem("cyb09_state", JSON.stringify(state)); } catch (e) { console.error("Failed to save state", e); }
    }
  }, [state, isLoaded]);

  const getLevel = useCallback((total) => {
    let level = LEVELS[0].name;
    for (const l of LEVELS) { if (total >= l.min) level = l.name; }
    return level;
  }, []);

  const checkBadges = useCallback((newScores, newCompleted) => {
    const earned = [];
    BADGES.forEach((badge) => {
      if (badge.module === "any") {
        if (Object.values(newCompleted).some(Boolean)) earned.push(badge.id);
      } else if (badge.module === "all") {
        if (Object.values(newCompleted).every(Boolean)) earned.push(badge.id);
      } else if (badge.module === "any_perfect") {
        if (Object.values(newScores).some((s) => s >= 100)) earned.push(badge.id);
      } else if (newScores[badge.module] >= badge.threshold) {
        earned.push(badge.id);
      }
    });
    return [...new Set(earned)];
  }, []);

  const updateScore = useCallback((module, score) => {
    setState((prev) => {
      const newScores = { ...prev.scores, [module]: Math.max(prev.scores[module], score) };
      const newCompleted = { ...prev.completed, [module]: true };
      const newAttempts = { ...prev.moduleAttempts, [module]: prev.moduleAttempts[module] + 1 };
      const totalScore = Object.values(newScores).reduce((a, b) => a + b, 0);
      const badges = checkBadges(newScores, newCompleted);
      return { ...prev, scores: newScores, completed: newCompleted, moduleAttempts: newAttempts, totalScore, level: getLevel(totalScore), badges };
    });
  }, [checkBadges, getLevel]);

  const setUsername = useCallback((username) => {
    setState((prev) => ({ ...prev, username }));
  }, []);

  const resetProgress = useCallback(() => {
    setState((prev) => ({ ...DEFAULT_STATE, username: prev.username }));
    localStorage.removeItem("cyb09_state");
  }, []);

  const getModuleScore = useCallback((module) => state.scores[module] || 0, [state.scores]);
  const isModuleCompleted = useCallback((module) => state.completed[module] || false, [state.completed]);
  const getCompletedCount = useCallback(() => Object.values(state.completed).filter(Boolean).length, [state.completed]);
  const getOverallPercentage = useCallback(() => {
    const maxPossible = 500;
    return Math.round((state.totalScore / maxPossible) * 100);
  }, [state.totalScore]);

  const value = {
    ...state, isLoaded, updateScore, setUsername, resetProgress,
    getModuleScore, isModuleCompleted, getCompletedCount, getOverallPercentage,
    allBadges: BADGES, allLevels: LEVELS,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
