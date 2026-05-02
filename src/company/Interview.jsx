import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Editor from "@monaco-editor/react";

function Interview() {
  const { company } = useParams();
  const navigate = useNavigate();

  const meetingRef = useRef(null);
  const zpRef = useRef(null);

  // ================= STATE =================
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");

  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 ROUNDS
  const [round, setRound] = useState(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [hrAnswers, setHrAnswers] = useState([]);

  const hrQuestions = [
    "Tell me about yourself",
    "Why should we hire you?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?"
  ];

  // ================= VIDEO =================
  useEffect(() => {
    const startMeeting = async () => {
      if (!meetingRef.current) return;

      const appID = 659154371;
      const serverSecret = "YOUR_SECRET"; // ⚠️ Replace

      const roomID = company;
      const userID = Date.now().toString();
      const userName = "User" + Math.floor(Math.random() * 1000);

      const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(token);
      zpRef.current = zp;

      zp.joinRoom({
        container: meetingRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
        showPreJoinView: true,
        turnOnCameraWhenJoining: true,
      });
    };

    startMeeting();

    return () => {
      if (zpRef.current) zpRef.current.destroy();
    };
  }, [company]);

  // ================= RUN CODE =================
  const runCode = async () => {
    setRunning(true);
    setOutput("Running...");

    try {
      const res = await fetch("http://localhost:5000/code/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, language })
      });

      const data = await res.json();
      setOutput(data.output || "No output");

    } catch (err) {
      setOutput("Error running code");
    } finally {
      setRunning(false);
    }
  };

  // ================= HR =================
  const handleHRAnswer = (value) => {
    const updated = [...hrAnswers];
    updated[currentQ] = value;
    setHrAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQ < hrQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      handleSubmit();
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (round === 1) {
      setRound(2);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          answer,
          code,
          hrAnswers,
          role: company,
          language
        })
      });

      const data = await res.json();
      navigate("/result", { state: data });

    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex"
    }}>

      {/* LEFT SIDE */}
      <div style={{
        flex: 3,
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>

        <h2>🎤 {company} Interview</h2>
        <p style={{ color: "#94a3b8" }}>
          {round === 1 ? "Coding Round" : "HR Round"}
        </p>

        {/* CODING ROUND */}
        {round === 1 && (
          <>
            <textarea
              placeholder="Explain your approach..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{
                width: "100%",
                height: "80px",
                padding: "10px",
                borderRadius: "8px",
                background: "#1e293b",
                color: "white",
                border: "1px solid #334155"
              }}
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: "150px",
                padding: "8px",
                borderRadius: "6px",
                background: "#1e293b",
                color: "white"
              }}
            >
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
            </select>

            <div style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #334155"
            }}>
              <Editor
                height="350px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={runCode} style={{ flex: 1 }}>
                {running ? "Running..." : "▶ Run Code"}
              </button>

              <button onClick={handleSubmit} style={{
                flex: 1,
                background: "#22c55e"
              }}>
                Next Round →
              </button>
            </div>

            <div style={{
              background: "#020617",
              padding: "10px",
              borderRadius: "8px"
            }}>
              <pre>{output}</pre>
            </div>
          </>
        )}

        {/* HR ROUND */}
        {round === 2 && (
          <div style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px"
          }}>
            <h3>Question {currentQ + 1} of {hrQuestions.length}</h3>

            <p>{hrQuestions[currentQ]}</p>

            <textarea
              value={hrAnswers[currentQ] || ""}
              onChange={(e) => handleHRAnswer(e.target.value)}
              style={{
                width: "100%",
                height: "120px",
                padding: "10px",
                borderRadius: "8px",
                background: "#0f172a",
                color: "white"
              }}
            />

            <button
              onClick={nextQuestion}
              style={{
                marginTop: "10px",
                width: "100%"
              }}
            >
              {currentQ < hrQuestions.length - 1
                ? "Next Question →"
                : "Submit Interview 🚀"}
            </button>
          </div>
        )}

        {loading && <p>⏳ AI analyzing...</p>}
      </div>

      {/* RIGHT SIDE (CAMERA) */}
      <div style={{
        flex: 1,
        padding: "20px",
        borderLeft: "1px solid #1e293b"
      }}>
        <div
          ref={meetingRef}
          style={{
            width: "100%",
            height: "200px",
            background: "black",
            borderRadius: "10px"
          }}
        />

        <p style={{ marginTop: "10px" }}>
          <b>Company:</b> {company}
        </p>
      </div>
    </div>
  );
}

export default Interview;