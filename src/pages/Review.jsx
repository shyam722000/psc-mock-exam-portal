import { useLocation, useNavigate } from "react-router-dom";
import "./review.css";
import html2pdf from "html2pdf.js/dist/html2pdf.min";


export default function Review() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questions, answers } = state;

  const handleLogout = () => {
    // clear stored username
    sessionStorage.removeItem("psc_username");
    localStorage.removeItem("psc_username");

    navigate("/"); // login page
  };

  const handleDownloadPDF = () => {
  const element = document.getElementById("review-pdf");

  const options = {
    margin: 0.5,
    filename: "PSC_Answer_Review.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
};


 return (
  <div className="review-container">

    {/* Header */}
    <div className="review-header">
      <h2 className="review-title">Answer Review</h2>

      <div className="review-actions">
        <button className="retry-btn" onClick={() => navigate("/language")}>
          Attend Again
        </button>

        <button className="pdf-btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>

        <button className="close-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>

    {/* PDF CONTENT START */}
    <div id="review-pdf">
      {questions.map((q, i) => {
        const userAnswerIndex = answers[i];
        const isAnswered = userAnswerIndex !== undefined;
        const isCorrect = userAnswerIndex === q.answer;

        return (
          <div className="review-card" key={i}>
            <div className="review-question">
              <span className="q-no">Q{i + 1}.</span>
              <span>{q.question}</span>
            </div>

            <div className="review-answers">
              <p
                className={`answer ${
                  !isAnswered
                    ? "not-answered"
                    : isCorrect
                    ? "correct"
                    : "wrong"
                }`}
              >
                <b>Your Answer:</b>{" "}
                {isAnswered ? q.options[userAnswerIndex] : "Not Answered"}
              </p>

              <p className="answer correct">
                <b>Correct Answer:</b> {q.options[q.answer]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    {/* PDF CONTENT END */}

  </div>
);

}
