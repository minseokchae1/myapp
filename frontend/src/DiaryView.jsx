// src/DiaryView.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserId, getDiaryKey, isLoggedIn, logout } from "./utils/storage";
import "./App.css";

export default function DiaryView() {
  const { date } = useParams();
  const [userId, setUserId] = useState(getUserId());
  const [entry, setEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      logout();
      setUserId("");
      return;
    }
    const data = localStorage.getItem(getDiaryKey(userId, date));
    if (data) {
      const parsed = JSON.parse(data);
      setEntry(parsed);
      setEditedContent(parsed.content);
    }
  }, [date, userId]);

  const handleDelete = () => {
    if (!userId) return;
    localStorage.removeItem(getDiaryKey(userId, date));
    alert("일기가 삭제되었습니다.");
  };

  const handleSave = () => {
    if (!userId) {
      alert("로그인 후 저장할 수 있습니다.");
      return;
    }
    const updated = { ...entry, content: editedContent };
    localStorage.setItem(getDiaryKey(userId, date), JSON.stringify(updated));
    setEntry(updated);
    setIsEditing(false);
    alert("수정 완료!");
  };

  if (!userId || !entry) return <p className="container">❌ 일기를 찾을 수 없습니다.</p>;

  return (
    <div className="container">
      <h2>📝 {entry.date} 일기</h2>
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={10}
          />
          <br />
          <button onClick={handleSave}>💾 저장</button>
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: 10 }}>
            취소
          </button>
        </>
      ) : (
        <>
          <p style={{ whiteSpace: "pre-wrap" }}>{entry.content}</p>
          <button onClick={() => setIsEditing(true)}>✏️ 수정</button>
        </>
      )}
      <br /><br />
      {entry.weather && (
        <div className="weather-box">
          <p>🌤 날씨: {entry.weather.description} ({entry.weather.temperature}°C)</p>
          <img
            src={`https://openweathermap.org/img/wn/${entry.weather.icon}@2x.png`}
            alt="저장된 날씨 아이콘"
          />
        </div>
      )}
      <br />
      <button onClick={handleDelete} className="danger">🗑️ 삭제</button>
    </div>
  );
}
