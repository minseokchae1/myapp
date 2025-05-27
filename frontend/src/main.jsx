// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import DiaryWrite from "./DiaryWrite";
import DiaryList from "./DiaryList";
import DiaryView from "./DiaryView";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/diary/write" element={<DiaryWrite />} />
        <Route path="/diary/list" element={<DiaryList />} />
        <Route path="/diary/:date" element={<DiaryView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
