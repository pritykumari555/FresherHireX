import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <h2>No data received</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#020617",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 0 30px rgba(0,0,0,0.6)",
          color: "white",
        }}
      >
        {/* HEADER */}
        <h2
          style={{
            textAlign: "center",
            color: "#22c55e",
            marginBottom: "10px",
          }}
        >
          📊 AI Interview Report
        </h2>

        {/* SCORE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1 style={{ fontSize: "48px", margin: 0 }}>
            {state.score}/10
          </h1>

          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#1e293b",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: `${state.score * 10}%`,
                height: "100%",
                background: "#22c55e",
                borderRadius: "10px",
                transition: "0.5s",
              }}
            />
          </div>
        </div>

        {/* STRENGTHS */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#38bdf8" }}>💪 Strengths</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {state.strengths.map((s, i) => (
              <li key={i} style={{ marginBottom: "5px" }}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* WEAKNESSES */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#f87171" }}>⚠️ Weaknesses</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {state.weaknesses.map((w, i) => (
              <li key={i} style={{ marginBottom: "5px" }}>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* SUGGESTIONS */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#facc15" }}>🚀 Suggestions</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {state.suggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: "5px" }}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(90deg, #22c55e, #4ade80)",
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          🔙 Go Back
        </button>
      </div>
    </div>
  );
}

export default Result;