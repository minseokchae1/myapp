// src/DiaryList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId, isLoggedIn } from "./utils/storage";
import "./App.css";

export default function DiaryList() {
  const navigate = useNavigate();
  const [searchDate, setSearchDate] = useState("");
  const [results, setResults] = useState([]);
  const userId = getUserId();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");
  }, [navigate]);

  const handleSearch = () => {
    const keys = Object.keys(localStorage).filter(
      (key) => key.startsWith(`diary_${userId}_`)
    );
    const matched = keys
      .map((key) => {
        const data = JSON.parse(localStorage.getItem(key));
        return {
          date: data.date,
          title: data.content.split("\n")[0],
        };
      })
      .filter((entry) => entry.date.includes(searchDate));
    setResults(matched);
  };

  return (
    <div className="container">
      <h2>📚 일기 목록</h2>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 20 }}>
        {results.map((entry, i) => (
          <li key={i} style={{ marginBottom: 10 }}>
            <button onClick={() => navigate(`/diary/${entry.date}`)} style={{ width: "100%", textAlign: "left" }}>
              <strong>{entry.date}</strong> - {entry.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
