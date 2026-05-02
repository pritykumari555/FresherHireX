import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 404) {
        setErrorMsg("❌ No account found! Please signup first.");
      } 
      else if (res.status === 401) {
        setErrorMsg("❌ Wrong password!");
      } 
      else {
        // ✅ SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(data.user || { email })
        );

        // ✅ GO TO JOBLIST
        navigate("/joblist");
      }

    } catch (err) {
      setErrorMsg("❌ Server not running!");
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

          <h2>Login</h2>

          {errorMsg && (
            <p style={{ color: "red", fontWeight: "600" }}>
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleSubmit}>
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
              Login →
            </button>
          </form>

          <p style={{ marginTop: "15px" }}>
            New user?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ color: "#6C63FF", cursor: "pointer", fontWeight: "700" }}
            >
              Create account
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;