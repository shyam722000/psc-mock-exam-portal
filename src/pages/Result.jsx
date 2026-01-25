import { useLocation, useNavigate } from "react-router-dom";
import "./result.css";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = state;

  // ✅ Get username (session first, fallback to local)
  const username =
    sessionStorage.getItem("psc_username") ||
    localStorage.getItem("psc_username") ||
    "Candidate";

  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  return (
    <div className="result-container">
      <div className="result-card">
        <h2 className="result-title">Exam Result</h2>

        {/* Username */}
        <p className="result-username">
          Candidate: <b>{username}</b>
        </p>

        <div className="score-box">
          <span className="score">{score}</span>
          <span className="total">/ {questions.length}</span>
        </div>

        <p className="result-text">
          You have completed the examination.
        </p>

        {/* Screenshot instruction */}
        <p className="result-note">
          📸 Take a screenshot and share it with your group.
        </p>

        <button
          className="result-btn"
          onClick={() => navigate("/review", { state })}
        >
          Review Answers
        </button>
      </div>
    </div>
  );
}
