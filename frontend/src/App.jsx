import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [loginInput, setLoginInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem(`schedule_${userId}`);
    return saved ? JSON.parse(saved) : Array(7).fill("");
  });

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    fetch(`/api/translate`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => {
        console.error("Weather API error", err);
        alert("날씨 정보를 불러오지 못했습니다.");
      });
  }, []);

  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`schedule_${userId}`);
      setSchedule(saved ? JSON.parse(saved) : Array(7).fill(""));
    }
  }, [userId]);

  const handleChange = (i, value) => {
    if (!userId) return;
    const updated = [...schedule];
    updated[i] = value;
    setSchedule(updated);
    localStorage.setItem(`schedule_${userId}`, JSON.stringify(updated));
  };

  const handleDelete = (i) => {
    if (!userId) return;
    const updated = [...schedule];
    updated[i] = "";
    setSchedule(updated);
    localStorage.setItem(`schedule_${userId}`, JSON.stringify(updated));
  };

  const handleLogin = () => {
    if (!loginInput.trim()) return alert("ID를 입력하세요");
    localStorage.setItem("userId", loginInput.trim());
    setUserId(loginInput.trim());
    setLoginInput("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId("");
    setSchedule(Array(7).fill(""));
  };

  return (
    <div className="app">
      <h1>📅 나의 일정표</h1>
      {weather && (
        <div className="weather">
          <p>현재 온도: {weather.temperature}°C</p>
          <p>날씨 설명: {weather.description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="날씨 아이콘"
          />
        </div>
      )}

      {userId ? (
        <div className="status-bar">
          <span>🔑 {userId} 님으로 로그인됨</span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div className="login-section">
          <input
            type="text"
            placeholder="사용자 ID 입력"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}

      <div className="calendar">
        {days.map((day, i) => (
          <div key={i} className="day">
            <h3>{day}</h3>
            <textarea
              value={schedule[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder="일정을 입력하세요"
              disabled={!userId}
            />
            <button onClick={() => handleDelete(i)} disabled={!userId}>
              삭제
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/diary/write")} disabled={!userId}>
          🧩 일기장 쓰기
        </button>
        <button onClick={() => navigate("/diary/list")} disabled={!userId}>
          📚 일기장 보기
        </button>
      </div>
    </div>
  );
}
