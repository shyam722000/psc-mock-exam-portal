import { useNavigate } from "react-router-dom";
import {
  FiClock,
  FiBookOpen,
  FiList,
  FiAward,
  FiTarget,
  FiBriefcase,
  FiTrendingUp,
  FiEdit3,
  FiCheckCircle,
  FiUserCheck,
} from "react-icons/fi";
import "./language.css";

export default function Language() {
  const navigate = useNavigate();

  return (
    <div className="lang-container">
      {/* Background floating icons */}
      <FiClock className="float-icon icon-1" />
      <FiBookOpen className="float-icon icon-2" />
      <FiList className="float-icon icon-3" />
      <FiAward className="float-icon icon-4" />
      <FiTarget className="float-icon icon-5" />
      <FiBriefcase className="float-icon icon-6" />
      <FiTrendingUp className="float-icon icon-7" />
      <FiEdit3 className="float-icon icon-8" />
      <FiCheckCircle className="float-icon icon-9" />
      <FiUserCheck className="float-icon icon-10" />

      {/* Main card */}
      <div className="lang-card">
        <h2 className="lang-title">PSC Online Examination</h2>
        <p className="lang-subtitle">
          Please read the instructions carefully before starting the exam
        </p>

        <div className="instructions">
          <div className="instruction-item">
            <FiClock />
            <span>Each question has a time limit of <b>60 seconds</b>.</span>
          </div>

          <div className="instruction-item">
            <FiList />
            <span>All questions are <b>multiple choice (MCQ)</b>.</span>
          </div>

          <div className="instruction-item">
            <FiBookOpen />
            <span>You can navigate using <b>Next</b> and <b>Previous</b>.</span>
          </div>

          <div className="instruction-item">
            <FiCheckCircle />
            <span>Final score will be shown after exam completion.</span>
          </div>
        </div>

        {/* <button
          className="lang-btn"
          onClick={() => navigate("/exam", { state: { lang: "en" } })}
        >
          Start Exam in English
        </button> */}

        <button
          className="lang-btn "
          onClick={() => navigate("/exam", { state: { lang: "ml" } })}
        >
          {/* പരീക്ഷ മലയാളത്തിൽ ആരംഭിക്കുക
           */}

           Start
        </button>
      </div>

      <div className="lang-footer">
        <p>Focus • Discipline • Success</p>
      </div>
    </div>
  );
}
