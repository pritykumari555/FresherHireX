import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ApplyList() {
  const [name, setname] = useState("");
  const [email, setEMAIL] = useState("");
  const [skill, updateskill] = useState("");
  const [projectLink, updateProject] = useState("");
  const [github, updateGithub] = useState("");

  const navigate = useNavigate();
  const { company } = useParams();

  const handlSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/apply", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        skill,
        projectLink,
        github,
      }),
    });

    const data = await res.json();
    alert(data.message);

    navigate(`/mcq/${company}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Apply for {company?.toUpperCase()}
        </h2>

        <form onSubmit={handlSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Your Name"
            onChange={(e) => setname(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Email ID"
            onChange={(e) => setEMAIL(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Skills (React, DSA, Node...)"
            onChange={(e) => updateskill(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="GitHub Link"
            onChange={(e) => updateGithub(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Project Link"
            onChange={(e) => updateProject(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="What problem did your project solve?"
          />

          <button type="submit" style={styles.button}>
            Submit & Start Test 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  card: {
    width: "400px",
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0f172a",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    minHeight: "80px",
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ApplyList;