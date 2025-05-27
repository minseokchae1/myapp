// src/DiaryWrite.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId, isLoggedIn, getDiaryKey, logout } from "./utils/storage";
import "./App.css";

export default function DiaryWrite() {
  const navigate = useNavigate();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");
  const [weather, setWeather] = useState(null);
  const [userId, setUserId] = useState(getUserId());

  useEffect(() => {
    if (!isLoggedIn()) {
      logout();
      setUserId("");
      return;
    }
    fetch("/api/translate")
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error("날씨 로딩 실패", err));
  }, []);

  const handleSave = () => {
    if (!userId) {
      alert("로그인 후 저장할 수 있습니다.");
      return;
    }
    if (!content.trim()) {
      alert("일기 내용을 입력해주세요");
      return;
    }
    const key = getDiaryKey(userId, date);
    const entry = { date, content, weather };
    localStorage.setItem(key, JSON.stringify(entry));
    alert("일기 저장 완료!");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>✍️ 일기 쓰기</h2>
      <label>날짜: </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        disabled={!userId}
      />
      <br /><br />
      <textarea
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘 있었던 일을 적어보세요"
        disabled={!userId}
      />
      <br />
      <button onClick={handleSave} disabled={!userId}>저장</button>
      <button onClick={() => navigate("/")} style={{ marginLeft: 10 }}>취소</button>
    </div>
  );
}