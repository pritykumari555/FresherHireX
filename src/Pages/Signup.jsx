import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      // ⚠️ FIX: no unused variable warning
      await res.json();

      if (res.status === 400) {
        setErrorMsg("❌ Account already exists! Please login.");
        return;
      }

      if (res.ok) {
        // save user session
        localStorage.setItem(
          "user",
          JSON.stringify({ name, email })
        );

        navigate("/joblist");
      }

    } catch (err) {
      setErrorMsg("❌ Cannot connect to server. Is backend running?");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

      <Navbar />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh"
      }}>
        <div style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          textAlign: "center"
        }}>

          <h2>Create Account ✨</h2>

          {errorMsg && (
            <p style={{ color: "red", fontWeight: "600" }}>
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", margin: "10px 0" }}
              required
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#6C63FF",
                color: "white",
                border: "none",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Create Account →
            </button>

          </form>

          <p style={{ marginTop: "15px" }}>
            Already have account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "#6C63FF", cursor: "pointer", fontWeight: "700" }}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;