import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./result.css";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = state;

  const username =
    sessionStorage.getItem("psc_username") ||
    localStorage.getItem("psc_username") ||
    "Candidate";

  const [displayScore, setDisplayScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  let actualScore = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) actualScore++;
  });

  const percentage = Math.round((actualScore / questions.length) * 100);

  // Animate score counting
  useEffect(() => {
    let current = 0;
    const increment = actualScore / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= actualScore) {
        setDisplayScore(actualScore);
        clearInterval(timer);
        // Trigger confetti for good scores
        if (percentage >= 60) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [actualScore, percentage]);

  // Get result message and color
  const getResultInfo = () => {
    if (percentage >= 80) return { message: "Outstanding! 🎉", color: "#16a34a", emoji: "🌟" };
    if (percentage >= 60) return { message: "Great Job! 👏", color: "#2563eb", emoji: "✨" };
    if (percentage >= 40) return { message: "Good Effort! 💪", color: "#f59e0b", emoji: "⚡" };
    return { message: "Keep Practicing! 📚", color: "#ef4444", emoji: "🎯" };
  };

  const resultInfo = getResultInfo();

  return (
    <div className="result-container">
      {showConfetti && <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="confetti" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            background: `hsl(${Math.random() * 360}, 70%, 60%)`
          }} />
        ))}
      </div>}

      <div className="result-card animate-in">
        {/* Trophy/Badge Icon */}
        <div className="result-icon pulse">
          {resultInfo.emoji}
        </div>

        <h2 className="result-title fade-in">Exam Result</h2>

        {/* Username with slide animation */}
        <div className="result-username slide-in">
          <span className="username-value">{username}</span>
        </div>

        {/* Animated Score Circle */}
        <div className="score-circle-wrapper">
          <svg className="score-circle" viewBox="0 0 120 120">
            <circle
              className="score-circle-bg"
              cx="60"
              cy="60"
              r="54"
            />
            <circle
              className="score-circle-progress"
              cx="60"
              cy="60"
              r="54"
              style={{
                strokeDashoffset: 339.292 - (339.292 * percentage) / 100,
                stroke: resultInfo.color
              }}
            />
          </svg>
          <div className="score-content">
            <span className="score" style={{ color: resultInfo.color }}>
              {displayScore}
            </span>
            <span className="total">/ {questions.length}</span>
            <span className="percentage">{percentage}%</span>
          </div>
        </div>

        {/* Result Message */}
        <p className="result-message bounce-in" style={{ color: resultInfo.color }}>
          {resultInfo.message}
        </p>

        {/* Stats bar */}
        <div className="stats-bar slide-up">
          <div className="stat-item">
            <span className="stat-icon">✅</span>
            <span className="stat-value">{actualScore}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">❌</span>
            <span className="stat-value">{questions.length - actualScore}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-value">{questions.length}</span>
          </div>
        </div>

        {/* Screenshot instruction */}
        <div className="result-note fade-in-delay-2">
          <span className="camera-icon">📸</span>
          <span>Screenshot & Share</span>
        </div>

        <button
          className="result-btn slide-up-delay"
          onClick={() => navigate("/review", { state })}
        >
          <span>Review Answers</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}