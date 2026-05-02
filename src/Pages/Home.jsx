import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = localStorage.getItem("user");

    if (user) {
      // already logged in
      navigate("/joblist");
    } else {
      // not logged in
      navigate("/login");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "sans-serif" }}>

      <Navbar />

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        textAlign: "center",
        padding: "2rem"
      }}>

        <span style={{
          background: "#EEEDFE",
          color: "#6C63FF",
          padding: "6px 18px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "700"
        }}>
          🚀 No Resume Needed
        </span>

        <h1 style={{ fontSize: "3.2rem", color: "white" }}>
          Get Hired on <span style={{ color: "#6C63FF" }}>FreshHireX</span>
        </h1>

        <p style={{ color: "#aaa", maxWidth: "520px" }}>
          No resume needed. Fill a simple form and get hired by top companies.
        </p>

        {/* FIXED BUTTON */}
        <button
          onClick={handleGetStarted}
          style={{
            marginTop: "2rem",
            padding: "14px 36px",
            borderRadius: "12px",
            background: "#6C63FF",
            color: "white",
            border: "none",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          Get Started Free →
        </button>

      </div>
    </div>
  );
}

export default Home;