import { useLocation, useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, company, passed } = location.state || {};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>Candidate Dashboard 👩‍💻</h2>

        {!company ? (
          <p style={styles.loading}>
            No data found. Please take the test first.
          </p>
        ) : (
          <>
            <div style={styles.infoBox}>
              <p><b>Company:</b> {company}</p>
              <p><b>Score:</b> {score}</p>
            </div>

            <div style={styles.statusBox}>
              {passed ? (
                <p style={styles.pass}>✅ Eligible for Interview</p>
              ) : (
                <p style={styles.fail}>❌ Not Eligible</p>
              )}
            </div>

            {passed && (
              <button
                style={styles.button}
                onClick={() => navigate(`/interview/${company}`)}
              >
                Start Interview
              </button>
            )}
          </>
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
    width: "420px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    textAlign: "center",
  },

  title: {
    color: "white",
    marginBottom: "20px",
  },

  loading: {
    color: "#e2e8f0",
  },

  infoBox: {
    backgroundColor: "#334155",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    color: "white",
  },

  statusBox: {
    marginBottom: "20px",
  },

  pass: {
    color: "#22c55e",
    fontWeight: "bold",
    fontSize: "18px",
  },

  fail: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#22c55e",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CandidateDashboard;