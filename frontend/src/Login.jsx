// src/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, isLoggedIn } from "./utils/storage";

export default function Login() {
  const [inputId, setInputId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) navigate("/");
  }, [navigate]);

  const handleLogin = () => {
    if (!inputId.trim()) {
      alert("ID를 입력해주세요");
      return;
    }
    login(inputId);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔑 사용자 로그인</h2>
      <input
        type="text"
        value={inputId}
        placeholder="사용자 ID 입력"
        onChange={(e) => setInputId(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
