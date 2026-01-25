import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import en from "../data/englishQuestions.json";
import ml from "../data/malayalamQuestions.json";
import "./exam.css";

export default function Exam() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const questions = state.lang === "ml" ? ml : en;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [time, setTime] = useState(questions.length * 60); // 60 sec per question

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submitExam = () => {
    navigate("/result", { state: { questions, answers } });
  };

  const formatTime = () => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getStatusClass = (i) => {
    if (marked[i] && answers[i] !== undefined) return "answered-marked";
    if (marked[i]) return "marked";
    if (answers[i] !== undefined) return "answered";
    return "not-answered";
  };

  return (
    <div className="exam-wrapper">
      {/* Top Header */}
      <div className="exam-header">
        <div>
          <h3>Ancient Indian History MCQ</h3>
          <span>
            Question {current + 1}/{questions.length}
          </span>
        </div>
        <div className="timer">⏱ {formatTime()}</div>
      </div>

      {/* Main Layout */}
      <div className="exam-body">
        {/* Question Panel */}
        <div className="question-panel">
          <p className="question-text">
            {current + 1}. {questions[current].question}
          </p>

          {questions[current].image && (
            <img
              src={questions[current].image}
              alt="question"
              className="question-image"
            />
          )}

         <div className="options">
  {questions[current].options.map((op, i) => (
    <label key={i} className="option">
      <input
        type="radio"
        name={`q-${current}`}
        checked={answers[current] === i}
        onChange={() =>
          setAnswers({ ...answers, [current]: i })
        }
      />
      <span className="option-text">{op}</span>
    </label>
  ))}
</div>


          {/* Actions */}
          <div className="actions">
            <button
              className="review"
              onClick={() =>
                setMarked({ ...marked, [current]: true })
              }
            >
              Mark for Review
            </button>

            <button
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
            >
              Previous
            </button>

            {current < questions.length - 1 ? (
              <button
                className="next"
                onClick={() => setCurrent(current + 1)}
              >
                Next
              </button>
            ) : (
              <button className="submit" onClick={submitExam}>
                Submit
              </button>
            )}
          </div>
        </div>

        {/* Question Palette */}
        <div className="palette">
          <h4>Question No. Sheet</h4>
          <div className="palette-grid">
            {questions.map((_, i) => (
              <button
                key={i}
                className={`palette-btn ${getStatusClass(i)}`}
                onClick={() => setCurrent(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="legend">
            <div><span className="box answered"></span> Answered</div>
            <div><span className="box not-answered"></span> Not Answered</div>
            <div><span className="box marked"></span> Marked</div>
            <div>
              <span className="box answered-marked"></span> Answered & Marked
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
