import { useState } from "react";

function Admin() {
  const [company, setCompany] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/add-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        question,
        options: options.split(","), // convert to array
        answer,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add MCQ Question</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Company" onChange={(e) => setCompany(e.target.value)} /><br />

        <input placeholder="Question" onChange={(e) => setQuestion(e.target.value)} /><br />

        <input
          placeholder="Options (comma separated)"
          onChange={(e) => setOptions(e.target.value)}
        /><br />

        <input placeholder="Correct Answer" onChange={(e) => setAnswer(e.target.value)} /><br />

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default Admin;