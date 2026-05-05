import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../config";

function MCQ() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { company } = useParams();
  const navigate = useNavigate();

  const percent = questions.length
    ? (score / questions.length) * 100
    : 0;

  const ispass = percent >= 60;

  useEffect(() => {
    fetch(`${BASE_URL}/question/${company}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [company]);

  const handleChange = (qIndex, option) => {
    setAnswers({
      ...answers,
      [qIndex]: option,
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }

    let sc = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        sc++;
      }
    });

    setScore(sc);
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{company.toUpperCase()} Test</h2>

        {!submitted ? (
          <>
            {questions.length === 0 ? (
              <p style={styles.loading}>Loading...</p>
            ) : (
              questions.map((q, index) => (
                <div key={index} style={styles.questionBox}>
                  <p style={styles.question}>
                    {index + 1}. {q.question}
                  </p>

                  {q.options.map((opt, i) => (
                    <label key={i} style={styles.option}>
                      <input
                        type="radio"
                        name={`q${index}`}
                        onChange={() => handleChange(index, opt)}
                        style={{ marginRight: "10px" }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))
            )}

            <button onClick={handleSubmit} style={styles.button}>
              Submit Test
            </button>
          </>
        ) : (
          <div style={styles.resultBox}>
            <h3>Test Submitted ✅</h3>

            <p style={styles.score}>
              Score: {score} / {questions.length}
            </p>

            {ispass ? (
              <div style={{ marginTop: "15px", color: "#22c55e" }}>
                <h4>🎉 You are eligible for the interview!</h4>

                <button
                  style={{ ...styles.button, marginTop: "10px" }}
                  onClick={() =>
                    navigate("/candidate", {
                      state: { score, company, passed: true },
                    })
                  }
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div style={{ marginTop: "15px", color: "#ef4444" }}>
                <h4>❌ You are not eligible</h4>
                <p>You need at least 60% to pass.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    width: "500px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "20px",
  },
  loading: {
    color: "white",
    textAlign: "center",
  },
  questionBox: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#334155",
    borderRadius: "8px",
  },
  question: {
    color: "white",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  option: {
    display: "block",
    color: "#e2e8f0",
    marginBottom: "8px",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#22c55e",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  resultBox: {
    textAlign: "center",
    color: "white",
  },
  score: {
    fontSize: "20px",
    marginTop: "10px",
    color: "#22c55e",
  },
};

export default MCQ;