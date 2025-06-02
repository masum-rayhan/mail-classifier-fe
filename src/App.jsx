import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input.trim()]);
      setInput("");
    }
  };

  const handleRemove = (x) => {
    setMessages(messages.filter((_, i) => i !== x));
  };

  const handleClassify = async (e) => {
    e.preventDefault();
    if (!messages.length) return;
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch("https://localhost:7250/api/EmailClassifier/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setResults([{ message: "Error contacting server", tags: [] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Email Classifier</h1>
      <form onSubmit={handleClassify}>
        <div>
          <textarea
            rows={3}
            style={{ width: "100%" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type an email message and press Add"
          />
        </div>
        <button type="button" onClick={handleAddMessage} style={{ marginTop: 8 }}>
          Add Message
        </button>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx} style={{ margin: "8px 0", listStyle: "none" }}>
              <span>{msg}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                style={{ marginLeft: 8 }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button type="submit" disabled={loading || !messages.length}>
          {loading ? "Classifying..." : "Classify All"}
        </button>
      </form>

      {results && (
        <div style={{ marginTop: 40 }}>
          <h2>Classification Results</h2>
          <ul>
            {results.map((res, idx) => (
              <li key={idx} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: "bold" }}>{res.message}</div>
                <div>
                  Tags:{" "}
                  {res.tags && res.tags.length
                    ? res.tags.join(", ")
                    : "No tags"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;